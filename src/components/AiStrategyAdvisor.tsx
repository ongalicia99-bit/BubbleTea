import React, { useState } from 'react';
import { BmcBlock, BusinessFinancials } from '../types';
import { Sparkles, Send, Bot, RefreshCw, Lightbulb, MessageSquare, AlertCircle } from 'lucide-react';

interface AiStrategyAdvisorProps {
  bmcBlocks: BmcBlock[];
  financials: BusinessFinancials;
}

export const AiStrategyAdvisor: React.FC<AiStrategyAdvisorProps> = ({
  bmcBlocks,
  financials,
}) => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const presetQuestions = [
    'How can Huay, Eric, and Deng Lu increase gross margin from 50% to 60%?',
    'What are the top 3 growth strategies for targeting students on a budget?',
    'Evaluate risk if ingredient prices rise by 15% next quarter.',
    'Propose a seasonal flavor campaign and stamp card loyalty promotion.'
  ];

  const handleAsk = async (questionToAsk?: string) => {
    const query = questionToAsk || prompt;
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch('/api/ai/advise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: query,
          bmcData: bmcBlocks,
          financials,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate response.');
      }

      setResponse(data.text);
      if (!questionToAsk) setPrompt('');
    } catch (err: any) {
      setError(err?.message || 'An error occurred while connecting to AI Advisor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 border border-slate-800 p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Sparkles className="w-4 h-4" />
            </span>
            <h2 className="text-base font-bold text-white">AI Strategy Advisor & Franchise Consultant</h2>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl">
            Powered by server-side Gemini AI. Analyzes your real-time Business Model Canvas and financial parameters to deliver custom strategic recommendations.
          </p>
        </div>
      </div>

      {/* Preset Questions Chips */}
      <div className="space-y-2">
        <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
          <Lightbulb className="w-3.5 h-3.5 text-amber-400" /> Strategic Prompt Suggestions:
        </span>
        <div className="flex items-center gap-2 flex-wrap">
          {presetQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleAsk(q)}
              disabled={loading}
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-amber-300 text-xs border border-slate-800 hover:border-amber-500/40 transition text-left"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input Box */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-3">
        <div className="relative">
          <textarea
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask Gemini AI anything about optimizing Huay, Eric, and Deng Lu's Bubble Tea Business Model Canvas..."
            className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-xl p-3 text-xs focus:outline-none focus:border-amber-500 transition resize-none"
          />
          <button
            onClick={() => handleAsk()}
            disabled={loading || !prompt.trim()}
            className="absolute right-3 bottom-3 px-4 py-2 bg-amber-500 hover:bg-amber-400 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-bold text-xs rounded-lg transition flex items-center gap-1.5"
          >
            {loading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Get Strategic Insight</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-xl text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Response Display Box */}
      {response && (
        <div className="bg-slate-900/90 border border-amber-500/30 p-5 rounded-2xl space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
            <Bot className="w-4 h-4 text-amber-400" />
            <h4 className="font-bold text-slate-100 text-sm">Gemini AI Business Recommendations</h4>
          </div>

          <div className="prose prose-invert prose-xs max-w-none text-slate-300 leading-relaxed space-y-2 whitespace-pre-line">
            {response}
          </div>
        </div>
      )}

    </div>
  );
};
