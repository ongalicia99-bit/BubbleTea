import React from 'react';
import { BusinessFinancials } from '../types';
import { 
  DollarSign, TrendingUp, PieChart as PieChartIcon, BarChart3, 
  HelpCircle, RefreshCw, AlertTriangle, CheckCircle, Scale, ShieldCheck
} from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, 
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend
} from 'recharts';

interface FinancialSimulatorProps {
  financials: BusinessFinancials;
  onUpdateFinancials: (newFinancials: BusinessFinancials) => void;
}

export const FinancialSimulator: React.FC<FinancialSimulatorProps> = ({
  financials,
  onUpdateFinancials,
}) => {
  const handleChange = (key: keyof BusinessFinancials, value: number) => {
    onUpdateFinancials({
      ...financials,
      [key]: value,
    });
  };

  // Calculations
  const grossRevenue = financials.monthlyTargetCups * financials.sellingPricePerCup;
  const totalCogs = financials.monthlyTargetCups * financials.costPerCup;
  const grossProfit = grossRevenue - totalCogs;
  const grossMargin = grossRevenue > 0 ? (grossProfit / grossRevenue) * 100 : 0;

  const netProfit = grossProfit - financials.monthlyFixedBudget;
  const netMargin = grossRevenue > 0 ? (netProfit / grossRevenue) * 100 : 0;

  // Unit profit margin
  const marginPerCup = financials.sellingPricePerCup - financials.costPerCup;
  
  // Break-even cups = Fixed Costs / Margin Per Cup
  const breakEvenCups = marginPerCup > 0 ? Math.ceil(financials.monthlyFixedBudget / marginPerCup) : 0;
  const breakEvenRevenue = breakEvenCups * financials.sellingPricePerCup;
  const breakEvenDays = financials.monthlyTargetCups > 0 ? Math.min(30, Number(((breakEvenCups / (financials.monthlyTargetCups / 30))).toFixed(1))) : 0;

  // Generate Break-Even Chart Data (Points from 0 cups to 60k cups)
  const breakEvenChartData = [];
  const maxChartVolume = Math.max(60000, financials.monthlyTargetCups * 1.5);
  const step = Math.round(maxChartVolume / 10);

  for (let vol = 0; vol <= maxChartVolume; vol += step) {
    const rev = vol * financials.sellingPricePerCup;
    const variableCost = vol * financials.costPerCup;
    const totalCost = financials.monthlyFixedBudget + variableCost;
    const profit = rev - totalCost;

    breakEvenChartData.push({
      volume: `${(vol / 1000).toFixed(0)}k cups`,
      volNumber: vol,
      Revenue: rev,
      TotalCost: totalCost,
      FixedCost: financials.monthlyFixedBudget,
      Profit: profit,
    });
  }

  // Cost Allocation Donut Chart Data ($35k distribution)
  const costAllocationData = [
    { name: 'Manpower / Staffing (40%)', value: (financials.monthlyFixedBudget * financials.manpowerAllocationPercent) / 100, color: '#6366f1' },
    { name: 'Ingredients Base (25%)', value: (financials.monthlyFixedBudget * financials.ingredientsAllocationPercent) / 100, color: '#10b981' },
    { name: 'Marketing & Ads (20%)', value: (financials.monthlyFixedBudget * financials.marketingAllocationPercent) / 100, color: '#f59e0b' },
    { name: 'Packaging & Cups (15%)', value: (financials.monthlyFixedBudget * financials.packagingAllocationPercent) / 100, color: '#ec4899' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Intro Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 border border-slate-800 p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Scale className="w-4 h-4" />
            </span>
            <h2 className="text-base font-bold text-white">Bubble Tea Unit Economics & Profitability Simulator</h2>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl">
            Model based on $35,000/month budget, 30,000 target cups, $5.00 average price, and $2.50 product cost (50% gross margin) as specified in the Business Model Canvas.
          </p>
        </div>

        <button
          onClick={() => {
            onUpdateFinancials({
              sellingPricePerCup: 5.00,
              costPerCup: 2.50,
              monthlyTargetCups: 30000,
              monthlyFixedBudget: 35000,
              marketingAllocationPercent: 20,
              manpowerAllocationPercent: 40,
              ingredientsAllocationPercent: 25,
              packagingAllocationPercent: 15,
              studentRatioPercent: 50,
              studentDiscountPercent: 10,
            });
          }}
          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition flex items-center gap-1.5 shrink-0"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Reset Defaults
        </button>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {/* Gross Revenue */}
        <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-xl space-y-1">
          <span className="text-[11px] text-slate-400 font-medium">Monthly Revenue</span>
          <div className="text-lg font-bold text-white">${grossRevenue.toLocaleString()}</div>
          <div className="text-[10px] text-emerald-400 font-mono">
            {financials.monthlyTargetCups.toLocaleString()} × ${financials.sellingPricePerCup.toFixed(2)}
          </div>
        </div>

        {/* Total Product COGS */}
        <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-xl space-y-1">
          <span className="text-[11px] text-slate-400 font-medium">Monthly COGS</span>
          <div className="text-lg font-bold text-rose-400">${totalCogs.toLocaleString()}</div>
          <div className="text-[10px] text-slate-400 font-mono">
            ${financials.costPerCup.toFixed(2)} / cup (50%)
          </div>
        </div>

        {/* Gross Profit */}
        <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-xl space-y-1">
          <span className="text-[11px] text-slate-400 font-medium">Gross Profit</span>
          <div className="text-lg font-bold text-amber-300">${grossProfit.toLocaleString()}</div>
          <div className="text-[10px] text-amber-400 font-mono">
            {grossMargin.toFixed(1)}% Gross Margin
          </div>
        </div>

        {/* Monthly Fixed Costs */}
        <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-xl space-y-1">
          <span className="text-[11px] text-slate-400 font-medium">Fixed Overhead</span>
          <div className="text-lg font-bold text-slate-300">${financials.monthlyFixedBudget.toLocaleString()}</div>
          <div className="text-[10px] text-slate-400 font-mono">
            Marketing, Staff, Rent
          </div>
        </div>

        {/* Net Operating Profit */}
        <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-xl space-y-1">
          <span className="text-[11px] text-slate-400 font-medium">Net Operating Profit</span>
          <div className={`text-lg font-bold ${netProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            ${netProfit.toLocaleString()}
          </div>
          <div className={`text-[10px] font-mono ${netProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {netMargin.toFixed(1)}% Net Margin
          </div>
        </div>

        {/* Break-Even Volume */}
        <div className="bg-slate-900/90 border border-amber-500/30 p-3.5 rounded-xl space-y-1 bg-amber-500/5">
          <span className="text-[11px] text-amber-300 font-medium">Break-Even Volume</span>
          <div className="text-lg font-bold text-amber-400">{breakEvenCups.toLocaleString()} cups</div>
          <div className="text-[10px] text-amber-300/80 font-mono">
            ${breakEvenRevenue.toLocaleString()} rev (~{breakEvenDays} days)
          </div>
        </div>
      </div>

      {/* Main Grid: Sliders & Scenario Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Sliders Panel */}
        <div className="lg:col-span-1 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-5">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-amber-400" />
              Scenario Parameters
            </h3>
            <span className="text-[10px] text-slate-400">Live Updating</span>
          </div>

          {/* Selling Price Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">Selling Price per Cup</span>
              <span className="font-bold text-emerald-400">${financials.sellingPricePerCup.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="2.00"
              max="12.00"
              step="0.25"
              value={financials.sellingPricePerCup}
              onChange={(e) => handleChange('sellingPricePerCup', parseFloat(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>$2.00 (Budget)</span>
              <span>$5.00 (Baseline)</span>
              <span>$12.00 (Premium)</span>
            </div>
          </div>

          {/* Cost per Cup Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">Product Cost (COGS) per Cup</span>
              <span className="font-bold text-rose-400">${financials.costPerCup.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="1.00"
              max="6.00"
              step="0.10"
              value={financials.costPerCup}
              onChange={(e) => handleChange('costPerCup', parseFloat(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>$1.00</span>
              <span>$2.50 (50% Margin)</span>
              <span>$6.00</span>
            </div>
          </div>

          {/* Monthly Target Cups Volume */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">Target Monthly Cup Volume</span>
              <span className="font-bold text-amber-400">{financials.monthlyTargetCups.toLocaleString()} cups</span>
            </div>
            <input
              type="range"
              min="5000"
              max="75000"
              step="1000"
              value={financials.monthlyTargetCups}
              onChange={(e) => handleChange('monthlyTargetCups', parseInt(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>5k</span>
              <span>30k (Baseline Target)</span>
              <span>75k</span>
            </div>
          </div>

          {/* Monthly Fixed Budget Overhead */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">Fixed Monthly Overhead ($)</span>
              <span className="font-bold text-slate-200">${financials.monthlyFixedBudget.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="10000"
              max="75000"
              step="1000"
              value={financials.monthlyFixedBudget}
              onChange={(e) => handleChange('monthlyFixedBudget', parseInt(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>$10,000</span>
              <span>$35,000 (Baseline)</span>
              <span>$75,000</span>
            </div>
          </div>

          {/* Feasibility Summary Box */}
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2 text-xs">
            <div className="font-semibold text-slate-200 flex items-center justify-between">
              <span>Model Feasibility Status:</span>
              {netProfit >= 15000 ? (
                <span className="text-emerald-400 flex items-center gap-1 font-bold">
                  <CheckCircle className="w-3.5 h-3.5" /> High Profit
                </span>
              ) : netProfit >= 0 ? (
                <span className="text-amber-400 flex items-center gap-1 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" /> Profitable
                </span>
              ) : (
                <span className="text-rose-400 flex items-center gap-1 font-bold">
                  <AlertTriangle className="w-3.5 h-3.5" /> Deficit
                </span>
              )}
            </div>

            <p className="text-[11px] text-slate-400 leading-snug">
              At <strong className="text-slate-200">${financials.sellingPricePerCup.toFixed(2)}</strong> retail price with <strong className="text-slate-200">${financials.costPerCup.toFixed(2)}</strong> ingredient cost, each cup yields <strong className="text-amber-400">${marginPerCup.toFixed(2)}</strong> contribution margin. You need <strong className="text-slate-200">{breakEvenCups.toLocaleString()} cups</strong> ({Math.round((breakEvenCups/30))} cups/day) to cover fixed costs.
            </p>
          </div>

        </div>

        {/* Visual Charts Panel */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Chart 1: Break-Even Volume Analysis */}
          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-100 text-xs tracking-wide uppercase">
                  Break-Even Curve (Revenue vs Total Cost)
                </h4>
                <p className="text-[10px] text-slate-400">
                  Intersection point indicates exact volume required to cover fixed costs
                </p>
              </div>
              <div className="text-xs font-mono px-2.5 py-1 bg-amber-500/10 text-amber-300 border border-amber-500/20 rounded-md">
                BEP: {breakEvenCups.toLocaleString()} Cups
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={breakEvenChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="volume" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} tickFormatter={(v) => `$${v / 1000}k`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                    formatter={(value: any) => [`$${Number(value).toLocaleString()}`, '']}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Line type="monotone" dataKey="Revenue" stroke="#10b981" strokeWidth={2.5} dot={false} />
                  <Line type="monotone" dataKey="TotalCost" stroke="#f43f5e" strokeWidth={2.5} dot={false} />
                  <Line type="monotone" dataKey="FixedCost" stroke="#64748b" strokeWidth={1.5} strokeDasharray="5 5" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Cost Structure Distribution ($35,000 monthly breakdown) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-3">
              <h4 className="font-bold text-slate-100 text-xs tracking-wide uppercase">
                Monthly Overhead Allocation ($35,000)
              </h4>

              <div className="h-48 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={costAllocationData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={70}
                      paddingAngle={3}
                    >
                      {costAllocationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }}
                      formatter={(val: any) => [`$${Number(val).toLocaleString()}`, 'Amount']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px]">
                {costAllocationData.map((c) => (
                  <div key={c.name} className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                    <span className="text-slate-300 truncate">{c.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Target Financial Summary Box */}
            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-3 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-slate-100 text-xs tracking-wide uppercase mb-2">
                  Unit Economics Summary
                </h4>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">Target Monthly Cups</span>
                    <span className="font-bold text-slate-100">{financials.monthlyTargetCups.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">Gross Sales Revenue</span>
                    <span className="font-bold text-emerald-400">${grossRevenue.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">Direct Material Cost (COGS)</span>
                    <span className="font-bold text-rose-400">${totalCogs.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">Fixed Operating Overhead</span>
                    <span className="font-bold text-slate-300">${financials.monthlyFixedBudget.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between py-1 pt-2 font-bold text-sm">
                    <span className="text-slate-200">Net Business Profit</span>
                    <span className={netProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                      ${netProfit.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-300 leading-snug">
                💡 <strong>Target Benchmark:</strong> At 30,000 cups sold at $5.00 ($150,000 gross revenue) with $2.50 product cost ($75,000 COGS) and $35,000 fixed overhead, the business earns <strong className="text-white font-bold">$40,000 net profit per month</strong> (26.7% net margin).
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
