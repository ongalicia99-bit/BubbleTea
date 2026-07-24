import React, { useState } from 'react';
import { PARTNER_PROFILES } from '../data/initialBmcData';
import { 
  Users, Activity, Ticket, Award, Calendar, Gift, CheckSquare, 
  ArrowRight, Sparkles, TrendingUp, Percent, Coffee
} from 'lucide-react';

export const PartnersAndActivities: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'partners' | 'rewards' | 'workshops' | 'sampling'>('partners');

  // Stamp Rewards Calculator State
  const [stampRequirement, setStampRequirement] = useState(9); // Buy 9, get 1 free
  const [avgCupPrice, setAvgCupPrice] = useState(5.00);
  const [activeLoyaltyMembers, setActiveLoyaltyMembers] = useState(2500);
  const [cupsPerMemberMonth, setCupsPerMemberMonth] = useState(4);

  // Loyalty calculations
  const totalMemberCupsBought = activeLoyaltyMembers * cupsPerMemberMonth;
  const freeCupsEarned = Math.floor(totalMemberCupsBought / stampRequirement);
  const effectiveLoyaltyDiscountPct = ((1 / (stampRequirement + 1)) * 100).toFixed(1);
  const grossLoyaltySales = totalMemberCupsBought * avgCupPrice;
  const netLoyaltySalesAfterFreeCups = grossLoyaltySales - (freeCupsEarned * avgCupPrice);

  // Workshop Planner State
  const [ticketPrice, setTicketPrice] = useState(35);
  const [attendees, setAttendees] = useState(25);
  const [materialCostPerAttendee, setMaterialCostPerAttendee] = useState(10);
  const [workshopsPerMonth, setWorkshopsPerMonth] = useState(2);

  const monthlyWorkshopRevenue = ticketPrice * attendees * workshopsPerMonth;
  const monthlyWorkshopCost = materialCostPerAttendee * attendees * workshopsPerMonth;
  const netWorkshopProfit = monthlyWorkshopRevenue - monthlyWorkshopCost;

  // Sampling ROI State
  const [sampleCupsDistributed, setSampleCupsDistributed] = useState(1500);
  const [sampleCostPerCup, setSampleCostPerCup] = useState(1.20);
  const [conversionRatePct, setConversionRatePct] = useState(25); // 25% buy a full drink

  const totalSamplingCost = sampleCupsDistributed * sampleCostPerCup;
  const convertedCustomers = Math.round(sampleCupsDistributed * (conversionRatePct / 100));
  const newMonthlyRevenueFromSampling = convertedCustomers * (4 * 5.00); // assume 4 cups/mo repeat
  const samplingRoiPct = totalSamplingCost > 0 ? (((newMonthlyRevenueFromSampling - totalSamplingCost) / totalSamplingCost) * 100).toFixed(0) : '0';

  return (
    <div className="space-y-6">
      
      {/* Sub-navigation Header */}
      <div className="bg-slate-900 border border-slate-800 p-2 rounded-xl flex items-center gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveSubTab('partners')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
            activeSubTab === 'partners'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Partners & Leadership (Huay, Eric, Deng Lu)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('rewards')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
            activeSubTab === 'rewards'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Stamp Reward Card Studio</span>
        </button>

        <button
          onClick={() => setActiveSubTab('workshops')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
            activeSubTab === 'workshops'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Ticket className="w-4 h-4" />
          <span>Tea Workshops Planner</span>
        </button>

        <button
          onClick={() => setActiveSubTab('sampling')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
            activeSubTab === 'sampling'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Gift className="w-4 h-4" />
          <span>Free Sampling ROI Engine</span>
        </button>
      </div>

      {/* Subtab 1: Key Partners Matrix */}
      {activeSubTab === 'partners' && (
        <div className="space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
            <h3 className="font-bold text-slate-100 text-sm mb-1 flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-400" />
              Founding Partners Execution Roles
            </h3>
            <p className="text-xs text-slate-400">
              Clear division of key activities between Huay, Eric, and Deng Lu as defined in the key partners section of the canvas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PARTNER_PROFILES.map((partner) => (
              <div key={partner.name} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 flex flex-col justify-between hover:border-slate-700 transition">
                <div>
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                    <div className={`w-10 h-10 rounded-xl ${partner.avatarBg} text-white font-bold flex items-center justify-center text-base shadow-sm`}>
                      {partner.name[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-100 text-base">{partner.name}</h4>
                      <p className="text-xs text-amber-400 font-medium">{partner.role}</p>
                    </div>
                  </div>

                  {/* Responsibilities */}
                  <div className="mt-4 space-y-2">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Core Responsibilities
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {partner.responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-amber-400 mt-0.5">•</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* KPIs */}
                  <div className="mt-4 space-y-2">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Target KPIs
                    </span>
                    <div className="space-y-1">
                      {partner.kpis.map((kpi, idx) => (
                        <div key={idx} className="bg-slate-950 p-2 rounded-lg border border-slate-800 text-xs font-mono text-emerald-400 flex items-center gap-2">
                          <CheckSquare className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>{kpi}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Status: Active</span>
                  <span className="text-amber-400 font-bold">100% Assigned</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subtab 2: Stamp Reward Card Studio */}
      {activeSubTab === 'rewards' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2 pb-2 border-b border-slate-800">
              <Award className="w-4 h-4 text-amber-400" />
              Stamp Card Mechanics
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Stamps required for 1 Free Cup
                </label>
                <input
                  type="number"
                  min="5"
                  max="15"
                  value={stampRequirement}
                  onChange={(e) => setStampRequirement(parseInt(e.target.value) || 9)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-amber-500"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Buy {stampRequirement} cups → Get 1 free (Total {stampRequirement + 1} cups cycle)
                </span>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Active App Loyalty Members
                </label>
                <input
                  type="number"
                  step="100"
                  value={activeLoyaltyMembers}
                  onChange={(e) => setActiveLoyaltyMembers(parseInt(e.target.value) || 1000)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Avg Monthly Cups / Member
                </label>
                <input
                  type="number"
                  step="1"
                  value={cupsPerMemberMonth}
                  onChange={(e) => setCupsPerMemberMonth(parseInt(e.target.value) || 4)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-slate-100 text-sm mb-3">
                Loyalty Reward Impact & Customer Retention
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400">Total Monthly Cups</span>
                  <div className="text-base font-bold text-amber-400">{totalMemberCupsBought.toLocaleString()}</div>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400">Free Cups Rewarded</span>
                  <div className="text-base font-bold text-rose-400">{freeCupsEarned.toLocaleString()}</div>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400">Effective Discount</span>
                  <div className="text-base font-bold text-emerald-400">{effectiveLoyaltyDiscountPct}%</div>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400">Net Loyalty Revenue</span>
                  <div className="text-base font-bold text-white">${netLoyaltySalesAfterFreeCups.toLocaleString()}</div>
                </div>
              </div>

              {/* Digital Stamp Card Visual */}
              <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-amber-300">
                  <span>Digital App Stamp Card Preview</span>
                  <span className="text-[10px] bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-500/30 text-amber-300">
                    Buy {stampRequirement} + Get 1 Free
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {Array.from({ length: stampRequirement }).map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-9 h-9 rounded-full border flex items-center justify-center font-bold text-xs ${
                        idx < 5
                          ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-xs'
                          : 'bg-slate-900 text-slate-500 border-slate-800'
                      }`}
                    >
                      {idx + 1}
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center font-bold text-xs animate-pulse">
                    <Gift className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-[11px] text-slate-400">
                  Deng Lu’s digital app stamp feature increases customer purchase frequency from 2.1 cups/month to 4.0 cups/month, generating an extra 4,750 cups/mo.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 3: Tea Appreciation Workshop Planner */}
      {activeSubTab === 'workshops' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2 pb-2 border-b border-slate-800">
              <Ticket className="w-4 h-4 text-amber-400" />
              Workshop Settings
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Ticket Price ($/person)</label>
                <input
                  type="number"
                  value={ticketPrice}
                  onChange={(e) => setTicketPrice(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Attendees per Workshop</label>
                <input
                  type="number"
                  value={attendees}
                  onChange={(e) => setAttendees(parseInt(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Workshops per Month</label>
                <input
                  type="number"
                  value={workshopsPerMonth}
                  onChange={(e) => setWorkshopsPerMonth(parseInt(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-slate-100 text-sm mb-3">
                Tea Appreciation Workshop Revenue & Brand Equity
              </h3>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400">Monthly Workshop Rev</span>
                  <div className="text-lg font-bold text-emerald-400">${monthlyWorkshopRevenue.toLocaleString()}</div>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400">Tea Leaf Costs</span>
                  <div className="text-lg font-bold text-rose-400">${monthlyWorkshopCost.toLocaleString()}</div>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400">Net Workshop Gain</span>
                  <div className="text-lg font-bold text-amber-300">${netWorkshopProfit.toLocaleString()}</div>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <span className="font-bold text-slate-200">Workshop Strategic Objectives:</span>
                <ul className="space-y-1 text-slate-400">
                  <li>• Educates customers on single-origin premium tea leaves (Jasmine Green, Oolong, Dahongpao).</li>
                  <li>• Converts casual buyers into high-value brand ambassadors.</li>
                  <li>• Generates high-margin workshop ticket sales while building social media buzz.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 4: Free Sampling Campaign Engine */}
      {activeSubTab === 'sampling' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2 pb-2 border-b border-slate-800">
              <Gift className="w-4 h-4 text-amber-400" />
              Pop-Up Sampling Inputs
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Sample Cups Distributed/mo</label>
                <input
                  type="number"
                  step="100"
                  value={sampleCupsDistributed}
                  onChange={(e) => setSampleCupsDistributed(parseInt(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Cost per Sample Cup ($)</label>
                <input
                  type="number"
                  step="0.10"
                  value={sampleCostPerCup}
                  onChange={(e) => setSampleCostPerCup(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Conversion Rate to Full Customer (%)</label>
                <input
                  type="number"
                  min="5"
                  max="100"
                  value={conversionRatePct}
                  onChange={(e) => setConversionRatePct(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-slate-100 text-sm mb-3">
                Free Sample Campaign Conversion & ROI Analysis
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400">Total Campaign Cost</span>
                  <div className="text-base font-bold text-rose-400">${totalSamplingCost.toLocaleString()}</div>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400">New Customers</span>
                  <div className="text-base font-bold text-amber-400">{convertedCustomers.toLocaleString()}</div>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400">New Repeat Rev/mo</span>
                  <div className="text-base font-bold text-emerald-400">${newMonthlyRevenueFromSampling.toLocaleString()}</div>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400">Campaign ROI</span>
                  <div className="text-base font-bold text-amber-300">+{samplingRoiPct}%</div>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-emerald-500/30 text-xs text-emerald-300">
                ✅ <strong>Free Sample Strategy:</strong> Huay & Deng Lu distribute {sampleCupsDistributed} mini-sample cups near campuses and offices. At a {conversionRatePct}% conversion rate, this creates {convertedCustomers} new loyal customers generating ${newMonthlyRevenueFromSampling.toLocaleString()} in recurring monthly revenue.
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
