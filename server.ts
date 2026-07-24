import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // AI Strategy Advisor Endpoint using Gemini
  app.post('/api/ai/advise', async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        res.status(500).json({ error: 'GEMINI_API_KEY is missing in environment.' });
        return;
      }

      const { prompt, bmcData, financials } = req.body;

      const ai = new GoogleGenAI({ apiKey });

      const systemInstruction = `You are an expert Bubble Tea Business Advisor & Franchise Strategist reviewing the Business Model Canvas and Financial Parameters for a bubble tea brand managed by partners Huay, Eric, and Deng Lu.

Current Business Model Snapshot:
- Target Volume: ${financials?.monthlyTargetCups || 30000} cups/month
- Selling Price: $${financials?.sellingPricePerCup || 5.00}/cup
- Product Cost (COGS): $${financials?.costPerCup || 2.50}/cup (50% gross margin)
- Monthly Fixed Costs: $${financials?.monthlyFixedBudget || 35000} (covering marketing, manpower, ingredients base, packaging)
- Key Partners: Huay (Operations & Sourcing), Eric (Finance & Growth), Deng Lu (Brand, Apps & Marketing)
- Key Activities: Free Samples, Stamp Reward Cards, Tea Workshops, Seasonal Flavors, Brand Collaborations
- Value Propositions: Affordable prices ($5 avg), variation of choices, quality consistency, customisation, delivery accessibility
- Customer Segments: Working professionals, Students

Provide clear, actionable, high-value business advice, financial sensitivity insights, marketing strategy ideas, or operational tips. Be professional, concise, and structured with bullet points. Format output nicely with clean markdown.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `${prompt}\n\n[Context: User is analyzing the current Bubble Tea Business Model Canvas]`,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({ text: response.text });
    } catch (err: any) {
      console.error('Gemini API Error:', err);
      res.status(500).json({ error: err?.message || 'Failed to generate strategy advice.' });
    }
  });

  // Vite development middleware vs Static Production
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
