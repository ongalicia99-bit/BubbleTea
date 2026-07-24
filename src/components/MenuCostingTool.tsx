import React, { useState } from 'react';
import { SAMPLE_DRINKS, SAMPLE_INGREDIENTS } from '../data/initialBmcData';
import { CustomDrink, RecipeIngredient } from '../types';
import { Milk, Plus, Trash2, DollarSign, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

export const MenuCostingTool: React.FC = () => {
  const [drinks, setDrinks] = useState<CustomDrink[]>(SAMPLE_DRINKS);
  const [ingredients] = useState<RecipeIngredient[]>(SAMPLE_INGREDIENTS);

  // New drink form state
  const [newDrinkName, setNewDrinkName] = useState('');
  const [newDrinkCategory, setNewDrinkCategory] = useState('Milk Tea');
  const [newDrinkPrice, setNewDrinkPrice] = useState(5.00);
  const [selectedIngredientIds, setSelectedIngredientIds] = useState<string[]>([
    'ing-1', 'ing-3', 'ing-5', 'ing-9'
  ]);

  const calculateDrinkCogs = (drink: CustomDrink): number => {
    return drink.ingredients.reduce((acc, item) => {
      const ing = ingredients.find((i) => i.id === item.ingredientId);
      return acc + (ing ? ing.costPerUnit * item.amount : 0);
    }, 0);
  };

  const handleAddDrink = () => {
    if (!newDrinkName.trim()) return;
    const newDrink: CustomDrink = {
      id: `drink-${Date.now()}`,
      name: newDrinkName.trim(),
      category: newDrinkCategory,
      sellingPrice: newDrinkPrice,
      ingredients: selectedIngredientIds.map((id) => ({ ingredientId: id, amount: 1 })),
    };
    setDrinks([...drinks, newDrink]);
    setNewDrinkName('');
  };

  const handleDeleteDrink = (id: string) => {
    setDrinks(drinks.filter((d) => d.id !== id));
  };

  return (
    <div className="space-y-6">
      
      {/* Intro Banner */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
        <div>
          <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
            <Milk className="w-4 h-4 text-amber-400" />
            Bubble Tea Recipe Unit Costing Calculator
          </h3>
          <p className="text-xs text-slate-400">
            Design signature drinks, select raw ingredients (tea base, dairy, toppings, cups), and verify that total COGS remains around the target $2.50 per cup threshold.
          </p>
        </div>

        <div className="bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-lg text-xs font-mono text-amber-300">
          Target COGS ≤ $2.50 / Cup
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Drink Builder Form */}
        <div className="lg:col-span-1 bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
          <h4 className="font-bold text-slate-100 text-sm pb-2 border-b border-slate-800 flex items-center gap-2">
            <Plus className="w-4 h-4 text-amber-400" />
            Create Recipe
          </h4>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Drink Name</label>
              <input
                type="text"
                value={newDrinkName}
                onChange={(e) => setNewDrinkName(e.target.value)}
                placeholder="e.g. Roasted Oolong Oat Milk Boba"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Category</label>
              <select
                value={newDrinkCategory}
                onChange={(e) => setNewDrinkCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-amber-500"
              >
                <option value="Milk Tea">Milk Tea</option>
                <option value="Specialty Tea">Specialty Tea</option>
                <option value="Seasonal Flavour">Seasonal Flavour</option>
                <option value="Fruit Tea">Fruit Tea</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Retail Selling Price ($)</label>
              <input
                type="number"
                step="0.50"
                value={newDrinkPrice}
                onChange={(e) => setNewDrinkPrice(parseFloat(e.target.value) || 5.00)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1.5">Select Ingredients & Packaging</label>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {ingredients.map((ing) => {
                  const isSelected = selectedIngredientIds.includes(ing.id);
                  return (
                    <label
                      key={ing.id}
                      className={`flex items-center justify-between p-2 rounded-lg border text-xs cursor-pointer transition ${
                        isSelected
                          ? 'bg-amber-500/10 border-amber-500/40 text-amber-200'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {
                            if (isSelected) {
                              setSelectedIngredientIds(selectedIngredientIds.filter((id) => id !== ing.id));
                            } else {
                              setSelectedIngredientIds([...selectedIngredientIds, ing.id]);
                            }
                          }}
                          className="accent-amber-500"
                        />
                        <span>{ing.name}</span>
                      </div>
                      <span className="font-mono text-[11px] text-amber-400">${ing.costPerUnit.toFixed(2)}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <button
              onClick={handleAddDrink}
              disabled={!newDrinkName.trim()}
              className="w-full py-2 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-bold text-xs transition"
            >
              Add Drink Recipe
            </button>
          </div>
        </div>

        {/* Menu Cards Display */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="font-bold text-slate-100 text-sm uppercase tracking-wide text-xs">
            Active Menu Items & Unit Profit Margin Breakdown
          </h4>

          <div className="space-y-3">
            {drinks.map((drink) => {
              const cogs = calculateDrinkCogs(drink);
              const margin = drink.sellingPrice - cogs;
              const marginPct = (margin / drink.sellingPrice) * 100;
              const isTargetMet = cogs <= 2.50;

              return (
                <div
                  key={drink.id}
                  className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 space-y-3 transition shadow-xs"
                >
                  <div className="flex items-start justify-between gap-3 pb-2 border-b border-slate-800">
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="font-bold text-slate-100 text-sm">{drink.name}</h5>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                          {drink.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Retail Price: <strong className="text-emerald-400">${drink.sellingPrice.toFixed(2)}</strong>
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block">Recipe COGS</span>
                        <span className={`font-bold text-sm ${isTargetMet ? 'text-emerald-400' : 'text-rose-400'}`}>
                          ${cogs.toFixed(2)}
                        </span>
                      </div>

                      <button
                        onClick={() => handleDeleteDrink(drink.id)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500 hover:text-white text-slate-400 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Recipe Ingredients list */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Ingredients:</span>
                    {drink.ingredients.map((item) => {
                      const ing = ingredients.find((i) => i.id === item.ingredientId);
                      if (!ing) return null;
                      return (
                        <span
                          key={ing.id}
                          className="text-[10px] bg-slate-950 border border-slate-800 text-slate-300 px-2 py-0.5 rounded-md"
                        >
                          {ing.name} <strong className="text-amber-400">(${ing.costPerUnit.toFixed(2)})</strong>
                        </span>
                      );
                    })}
                  </div>

                  {/* Profit Bar */}
                  <div className="flex items-center justify-between pt-1 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-300 font-medium">
                      {isTargetMet ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                      )}
                      <span>Margin / Cup: <strong className="text-amber-300">${margin.toFixed(2)}</strong> ({marginPct.toFixed(1)}%)</span>
                    </div>

                    <span className="text-[10px] font-mono text-slate-500">
                      {isTargetMet ? 'Within $2.50 Target COGS' : 'Exceeds $2.50 COGS Baseline'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
