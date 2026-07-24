import React, { useState } from 'react';
import { BmcBlock, BusinessFinancials } from '../types';
import { FileText, Copy, Check, Download, X } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  bmcBlocks: BmcBlock[];
  financials: BusinessFinancials;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  bmcBlocks,
  financials,
}) => {
  const [copied, setCopied] = useState(false);
  const [exportFormat, setExportFormat] = useState<'markdown' | 'json'>('markdown');

  if (!isOpen) return null;

  const generateMarkdown = () => {
    let md = `# Business Model Canvas: Bubble Tea Enterprise\n`;
    md += `_Generated: ${new Date().toISOString().split('T')[0]}_\n\n`;

    bmcBlocks.forEach((block) => {
      md += `## ${block.title}\n`;
      block.items.forEach((item) => {
        md += `- **${item.text}**${item.category ? ` _(${item.category})_` : ''}${item.notes ? `: ${item.notes}` : ''}\n`;
      });
      md += `\n`;
    });

    md += `## Financial Parameters & Unit Economics\n`;
    md += `- **Target Monthly Sales Volume**: ${financials.monthlyTargetCups.toLocaleString()} cups\n`;
    md += `- **Retail Selling Price per Cup**: $${financials.sellingPricePerCup.toFixed(2)}\n`;
    md += `- **Product Material Cost (COGS) per Cup**: $${financials.costPerCup.toFixed(2)} (50% Gross Margin)\n`;
    md += `- **Monthly Fixed Operating Overhead**: $${financials.monthlyFixedBudget.toLocaleString()}\n`;
    
    const grossRev = financials.monthlyTargetCups * financials.sellingPricePerCup;
    const cogs = financials.monthlyTargetCups * financials.costPerCup;
    const netProfit = grossRev - cogs - financials.monthlyFixedBudget;
    md += `- **Projected Monthly Net Profit**: $${netProfit.toLocaleString()}\n`;

    return md;
  };

  const generateJson = () => {
    return JSON.stringify({ bmcBlocks, financials }, null, 2);
  };

  const exportText = exportFormat === 'markdown' ? generateMarkdown() : generateJson();

  const handleCopy = () => {
    navigator.clipboard.writeText(exportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([exportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = exportFormat === 'markdown' ? 'bubble_tea_bmc_model.md' : 'bubble_tea_bmc_model.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl p-5 shadow-2xl space-y-4">
        
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-400" />
            <h3 className="font-bold text-slate-100 text-sm">Export Business Model Canvas</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-xs">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setExportFormat('markdown')}
              className={`px-3 py-1 rounded-md text-xs font-semibold ${
                exportFormat === 'markdown'
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              Markdown (.md)
            </button>
            <button
              onClick={() => setExportFormat('json')}
              className={`px-3 py-1 rounded-md text-xs font-semibold ${
                exportFormat === 'json'
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              JSON (.json)
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download File</span>
            </button>
          </div>
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 max-h-80 overflow-y-auto">
          <pre className="text-xs font-mono text-slate-300 whitespace-pre-wrap">{exportText}</pre>
        </div>

      </div>
    </div>
  );
};
