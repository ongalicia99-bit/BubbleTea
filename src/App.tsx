import React, { useState } from 'react';
import { INITIAL_BMC_BLOCKS, INITIAL_FINANCIALS } from './data/initialBmcData';
import { BmcBlock, BmcBlockId, BmcItem, BusinessFinancials } from './types';
import { Navbar } from './components/Navbar';
import { BmcCanvasGrid } from './components/BmcCanvasGrid';
import { FinancialSimulator } from './components/FinancialSimulator';
import { PartnersAndActivities } from './components/PartnersAndActivities';
import { MenuCostingTool } from './components/MenuCostingTool';
import { AiStrategyAdvisor } from './components/AiStrategyAdvisor';
import { ExportModal } from './components/ExportModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('canvas');
  const [bmcBlocks, setBmcBlocks] = useState<BmcBlock[]>(INITIAL_BMC_BLOCKS);
  const [financials, setFinancials] = useState<BusinessFinancials>(INITIAL_FINANCIALS);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  // Handle adding an item to a block
  const handleAddItem = (blockId: BmcBlockId, item: Omit<BmcItem, 'id'>) => {
    const newItem: BmcItem = {
      ...item,
      id: `item-${Date.now()}`,
    };
    setBmcBlocks(
      bmcBlocks.map((b) =>
        b.id === blockId ? { ...b, items: [...b.items, newItem] } : b
      )
    );
  };

  // Handle updating an existing item
  const handleUpdateItem = (blockId: BmcBlockId, updatedItem: BmcItem) => {
    setBmcBlocks(
      bmcBlocks.map((b) =>
        b.id === blockId
          ? {
              ...b,
              items: b.items.map((i) => (i.id === updatedItem.id ? updatedItem : i)),
            }
          : b
      )
    );
  };

  // Handle deleting an item
  const handleDeleteItem = (blockId: BmcBlockId, itemId: string) => {
    setBmcBlocks(
      bmcBlocks.map((b) =>
        b.id === blockId
          ? { ...b, items: b.items.filter((i) => i.id !== itemId) }
          : b
      )
    );
  };

  // Reset to original baseline data
  const handleResetData = () => {
    if (window.confirm('Reset Business Model Canvas and Financial Parameters to original baseline?')) {
      setBmcBlocks(INITIAL_BMC_BLOCKS);
      setFinancials(INITIAL_FINANCIALS);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-amber-500 selection:text-slate-950 flex flex-col">
      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        financials={financials}
        onOpenExport={() => setIsExportOpen(true)}
        onResetData={handleResetData}
      />

      {/* Main Body View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'canvas' && (
          <BmcCanvasGrid
            blocks={bmcBlocks}
            onAddItem={handleAddItem}
            onUpdateItem={handleUpdateItem}
            onDeleteItem={handleDeleteItem}
          />
        )}

        {activeTab === 'financials' && (
          <FinancialSimulator
            financials={financials}
            onUpdateFinancials={setFinancials}
          />
        )}

        {activeTab === 'partners' && <PartnersAndActivities />}

        {activeTab === 'unitCosting' && <MenuCostingTool />}

        {activeTab === 'aiAdvisor' && (
          <AiStrategyAdvisor bmcBlocks={bmcBlocks} financials={financials} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Bubble Tea Business Model Canvas & Financial Simulator • Huay, Eric, Deng Lu</span>
          <span className="font-mono text-[10px] text-amber-500/80">Source: their_bmc_model.csv</span>
        </div>
      </footer>

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        bmcBlocks={bmcBlocks}
        financials={financials}
      />
    </div>
  );
}
