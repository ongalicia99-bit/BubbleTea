import React from 'react';
import { Coffee, LayoutGrid, Calculator, Users, Milk, Sparkles, Download, RotateCcw, TrendingUp } from 'lucide-react';
import { BusinessFinancials } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  financials: BusinessFinancials;
  onOpenExport: () => void;
  onResetData: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  financials,
  onOpenExport,
  onResetData,
}) => {
  // Quick financial math
  const grossRevenue = financials.monthlyTargetCups * financials.sellingPricePerCup;
  const cogs = financials.monthlyTargetCups * financials.costPerCup;
  const grossProfit = grossRevenue - cogs;
  const netProfit = grossProfit - financials.monthlyFixedBudget;
  const netMargin = grossRevenue > 0 ? ((netProfit / grossRevenue) * 100).toFixed(1) : '0';

  const navItems = [
    { id: 'canvas', label: 'BMC Canvas Grid', icon: LayoutGrid },
    { id: 'financials', label: 'Financial Simulator', icon: Calculator },
    { id: 'partners', label: 'Partners & Activities', icon: Users },
    { id: 'unitCosting', label: 'Drink Unit Costing', icon: Milk },
    { id: 'aiAdvisor', label: 'AI Strategy Advisor', icon: Sparkles },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur border-b border-slate-800 text-slate-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand & Source Badge */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-sm">
              <Coffee className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-lg tracking-tight text-white">
                  Bubble Tea <span className="text-amber-400 font-extrabold">BMC Studio</span>
                </h1>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  Model 2026
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Huay • Eric • Deng Lu Enterprise Strategy
              </p>
            </div>
          </div>

          {/* Quick Metrics Header Pill (Desktop) */}
          <div className="hidden lg:flex items-center gap-4 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800/80 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Vol:</span>
              <span className="font-semibold text-amber-300">{financials.monthlyTargetCups.toLocaleString()} cups/mo</span>
            </div>
            <div className="w-px h-3.5 bg-slate-800" />
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Price:</span>
              <span className="font-semibold text-emerald-400">${financials.sellingPricePerCup.toFixed(2)}</span>
            </div>
            <div className="w-px h-3.5 bg-slate-800" />
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Cost/Cup:</span>
              <span className="font-semibold text-rose-400">${financials.costPerCup.toFixed(2)}</span>
            </div>
            <div className="w-px h-3.5 bg-slate-800" />
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-slate-400">Net Profit:</span>
              <span className={`font-bold ${netProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                ${netProfit.toLocaleString()} ({netMargin}%)
              </span>
            </div>
          </div>

          {/* Actions: Reset & Export */}
          <div className="flex items-center gap-2">
            <button
              onClick={onResetData}
              title="Reset data to original BMC model"
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 transition flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Baseline</span>
            </button>
            
            <button
              onClick={onOpenExport}
              className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs shadow-sm transition flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export BMC</span>
            </button>
          </div>

        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto no-scrollbar border-t border-slate-800/60 py-2 gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                  isActive
                    ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.id === 'aiAdvisor' && (
                  <span className="bg-amber-500 text-slate-950 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                    AI
                  </span>
                )}
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
};
