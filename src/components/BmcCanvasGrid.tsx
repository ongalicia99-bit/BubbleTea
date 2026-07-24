import React, { useState } from 'react';
import { 
  Users, Activity, Layers, Sparkles, HeartHandshake, Share2, Target, DollarSign, TrendingUp,
  Plus, Edit2, Trash2, Search, Filter, AlertCircle, CheckCircle2, ChevronRight, Tag
} from 'lucide-react';
import { BmcBlock, BmcBlockId, BmcItem } from '../types';

interface BmcCanvasGridProps {
  blocks: BmcBlock[];
  onAddItem: (blockId: BmcBlockId, item: Omit<BmcItem, 'id'>) => void;
  onUpdateItem: (blockId: BmcBlockId, item: BmcItem) => void;
  onDeleteItem: (blockId: BmcBlockId, itemId: string) => void;
}

export const BmcCanvasGrid: React.FC<BmcCanvasGridProps> = ({
  blocks,
  onAddItem,
  onUpdateItem,
  onDeleteItem,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [editingItem, setEditingItem] = useState<{ blockId: BmcBlockId; item: BmcItem } | null>(null);
  const [addingToBlock, setAddingToBlock] = useState<BmcBlockId | null>(null);

  // Form states for add/edit modal
  const [formText, setFormText] = useState('');
  const [formCategory, setFormCategory] = useState('');
  const [formNotes, setFormNotes] = useState('');
  const [formPriority, setFormPriority] = useState<'high' | 'medium' | 'low'>('high');

  const getBlock = (id: BmcBlockId): BmcBlock => {
    return blocks.find((b) => b.id === id) || {
      id,
      title: id,
      description: '',
      iconName: 'Sparkles',
      items: [],
    };
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users': return Users;
      case 'Activity': return Activity;
      case 'Layers': return Layers;
      case 'Sparkles': return Sparkles;
      case 'HeartHandshake': return HeartHandshake;
      case 'Share2': return Share2;
      case 'Target': return Target;
      case 'DollarSign': return DollarSign;
      case 'TrendingUp': return TrendingUp;
      default: return Sparkles;
    }
  };

  const handleOpenAdd = (blockId: BmcBlockId) => {
    setAddingToBlock(blockId);
    setFormText('');
    setFormCategory('');
    setFormNotes('');
    setFormPriority('high');
  };

  const handleOpenEdit = (blockId: BmcBlockId, item: BmcItem) => {
    setEditingItem({ blockId, item });
    setFormText(item.text);
    setFormCategory(item.category || '');
    setFormNotes(item.notes || '');
    setFormPriority(item.priority || 'high');
  };

  const handleSaveAdd = () => {
    if (!addingToBlock || !formText.trim()) return;
    onAddItem(addingToBlock, {
      text: formText.trim(),
      category: formCategory.trim() || undefined,
      notes: formNotes.trim() || undefined,
      priority: formPriority,
    });
    setAddingToBlock(null);
  };

  const handleSaveEdit = () => {
    if (!editingItem || !formText.trim()) return;
    onUpdateItem(editingItem.blockId, {
      ...editingItem.item,
      text: formText.trim(),
      category: formCategory.trim() || undefined,
      notes: formNotes.trim() || undefined,
      priority: formPriority,
    });
    setEditingItem(null);
  };

  // Helper render block component
  const renderBlockCard = (blockId: BmcBlockId, customHeight: string = 'h-full') => {
    const block = getBlock(blockId);
    const Icon = getIcon(block.iconName);

    const filteredItems = block.items.filter((item) => {
      const matchesSearch = item.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.notes && item.notes.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCat = selectedCategory === 'all' || item.priority === selectedCategory;
      return matchesSearch && matchesCat;
    });

    return (
      <div className={`bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between hover:border-slate-700 transition shadow-sm ${customHeight}`}>
        <div>
          {/* Header */}
          <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold text-xs text-slate-100 tracking-wide uppercase">
                  {block.title}
                </h3>
                <p className="text-[10px] text-slate-400 line-clamp-1">{block.description}</p>
              </div>
            </div>
            <button
              onClick={() => handleOpenAdd(blockId)}
              className="p-1 rounded-md bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-400 text-xs transition"
              title={`Add item to ${block.title}`}
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Items list */}
          <div className="space-y-2 overflow-y-auto max-h-[320px] pr-1 scrollbar-thin">
            {filteredItems.length === 0 ? (
              <div className="py-4 text-center text-slate-500 text-xs italic bg-slate-950/40 rounded-lg border border-dashed border-slate-800/60">
                No items listed
              </div>
            ) : (
              filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="group relative bg-slate-950/80 hover:bg-slate-950 border border-slate-800/80 hover:border-amber-500/40 rounded-lg p-2.5 transition shadow-xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-medium text-xs text-slate-100">{item.text}</span>
                        {item.category && (
                          <span className="text-[9px] font-semibold px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                            {item.category}
                          </span>
                        )}
                        {item.priority && (
                          <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                            item.priority === 'high'
                              ? 'bg-rose-500/10 text-rose-300 border border-rose-500/20'
                              : item.priority === 'medium'
                              ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                              : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                          }`}>
                            {item.priority}
                          </span>
                        )}
                      </div>
                      {item.notes && (
                        <p className="text-[11px] text-slate-400 leading-snug">{item.notes}</p>
                      )}
                    </div>

                    {/* Item Actions */}
                    <div className="opacity-0 group-hover:opacity-100 transition flex items-center gap-1 bg-slate-900/90 p-1 rounded-md border border-slate-700">
                      <button
                        onClick={() => handleOpenEdit(blockId, item)}
                        className="p-1 hover:text-amber-400 text-slate-400 transition"
                        title="Edit"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => onDeleteItem(blockId, item.id)}
                        className="p-1 hover:text-rose-400 text-slate-400 transition"
                        title="Delete"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer info badge */}
        <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400">
          <span>{block.items.length} elements</span>
          <span className="text-amber-400/80 font-mono">BMC Canvas 2026</span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Search & Filter Header */}
      <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search BMC elements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:border-amber-500 transition"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          <span className="text-xs text-slate-400 whitespace-nowrap flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Priority:
          </span>
          {['all', 'high', 'medium', 'low'].map((pri) => (
            <button
              key={pri}
              onClick={() => setSelectedCategory(pri)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium capitalize transition ${
                selectedCategory === pri
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {pri}
            </button>
          ))}
        </div>
      </div>

      {/* Osterwalder 9-Block Grid View */}
      <div className="space-y-3">
        {/* Top 5 Column Osterwalder Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Col 1: Key Partners */}
          <div className="lg:col-span-1 min-h-[420px]">
            {renderBlockCard('keyPartners', 'h-full')}
          </div>

          {/* Col 2: Key Activities (Top) & Key Resources (Bottom) */}
          <div className="lg:col-span-1 flex flex-col gap-3 min-h-[420px]">
            <div className="flex-1">{renderBlockCard('keyActivities', 'h-full')}</div>
            <div className="flex-1">{renderBlockCard('keyResources', 'h-full')}</div>
          </div>

          {/* Col 3: Value Propositions */}
          <div className="lg:col-span-1 min-h-[420px]">
            {renderBlockCard('valuePropositions', 'h-full')}
          </div>

          {/* Col 4: Customer Relationships (Top) & Channels (Bottom) */}
          <div className="lg:col-span-1 flex flex-col gap-3 min-h-[420px]">
            <div className="flex-1">{renderBlockCard('customerRelationships', 'h-full')}</div>
            <div className="flex-1">{renderBlockCard('channels', 'h-full')}</div>
          </div>

          {/* Col 5: Customer Segments */}
          <div className="lg:col-span-1 min-h-[420px]">
            {renderBlockCard('customerSegments', 'h-full')}
          </div>
        </div>

        {/* Bottom Section: Cost Structure & Revenue Streams */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>{renderBlockCard('costStructure', 'min-h-[180px]')}</div>
          <div>{renderBlockCard('revenueStreams', 'min-h-[180px]')}</div>
        </div>
      </div>

      {/* Modal for Add / Edit Item */}
      {(addingToBlock || editingItem) && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                <Tag className="w-4 h-4 text-amber-400" />
                {addingToBlock ? `Add Element to ${getBlock(addingToBlock).title}` : 'Edit BMC Element'}
              </h3>
              <button
                onClick={() => {
                  setAddingToBlock(null);
                  setEditingItem(null);
                }}
                className="text-slate-400 hover:text-white text-xs font-semibold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Title / Statement *</label>
                <input
                  type="text"
                  value={formText}
                  onChange={(e) => setFormText(e.target.value)}
                  placeholder="e.g., Tea Appreciation Workshop"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Category / Tag</label>
                <input
                  type="text"
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  placeholder="e.g., Brand Building or Customer Retention"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Priority</label>
                <select
                  value={formPriority}
                  onChange={(e) => setFormPriority(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100 focus:outline-none focus:border-amber-500"
                >
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Notes & Details</label>
                <textarea
                  rows={3}
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="Add operational notes or business targets..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                onClick={() => {
                  setAddingToBlock(null);
                  setEditingItem(null);
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
              >
                Cancel
              </button>
              <button
                onClick={addingToBlock ? handleSaveAdd : handleSaveEdit}
                className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
