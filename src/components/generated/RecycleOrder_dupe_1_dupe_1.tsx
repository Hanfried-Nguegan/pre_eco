"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronDown, ChevronUp, Plus, Minus, Recycle, Droplets, Award, Package, Wine, FileText, Zap } from 'lucide-react';
import { cn } from '../../lib/utils';
export interface RecycleOrderItem {
  id: string;
  name: string;
  type: string;
  description: string;
  category: string;
  weightPerUnit: number; // grams per unit
  pointsPerUnit: number;
  co2SavedPerUnit: number; // grams per unit
  quantity: number;
}
export interface RecycleOrderProps {
  onBack?: () => void;
  onContinue?: (items: RecycleOrderItem[], totalWeight: number, totalPoints: number) => void;
  initialItems?: RecycleOrderItem[];
}

// Mock initial data - in production this would come from scanned items
const mockInitialItems: RecycleOrderItem[] = [{
  id: '1',
  name: 'HDPE Container',
  type: 'HDPE',
  description: 'High-density polyethylene bottles',
  category: 'PLASTIC',
  weightPerUnit: 50,
  pointsPerUnit: 15,
  co2SavedPerUnit: 45,
  quantity: 2
}, {
  id: '2',
  name: 'PET Bottle',
  type: 'PET',
  description: 'Polyethylene terephthalate bottles',
  category: 'PLASTIC',
  weightPerUnit: 30,
  pointsPerUnit: 12,
  co2SavedPerUnit: 38,
  quantity: 3
}, {
  id: '3',
  name: 'PVC Container',
  type: 'PVC',
  description: 'Polyvinyl chloride containers',
  category: 'PLASTIC',
  weightPerUnit: 40,
  pointsPerUnit: 10,
  co2SavedPerUnit: 35,
  quantity: 1
}, {
  id: '4',
  name: 'Cardboard Box',
  type: 'Cardboard',
  description: 'Corrugated cardboard packaging',
  category: 'PAPER',
  weightPerUnit: 200,
  pointsPerUnit: 20,
  co2SavedPerUnit: 80,
  quantity: 2
}, {
  id: '5',
  name: 'Newspaper',
  type: 'Newsprint',
  description: 'Recycled paper products',
  category: 'PAPER',
  weightPerUnit: 150,
  pointsPerUnit: 15,
  co2SavedPerUnit: 60,
  quantity: 1
}, {
  id: '6',
  name: 'Glass Bottle',
  type: 'Clear Glass',
  description: 'Transparent glass containers',
  category: 'GLASS',
  weightPerUnit: 300,
  pointsPerUnit: 25,
  co2SavedPerUnit: 100,
  quantity: 2
}, {
  id: '7',
  name: 'Aluminum Can',
  type: 'Aluminum',
  description: 'Beverage aluminum cans',
  category: 'METAL',
  weightPerUnit: 15,
  pointsPerUnit: 20,
  co2SavedPerUnit: 62,
  quantity: 5
}];
const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'PLASTIC':
      return Recycle;
    case 'PAPER':
      return FileText;
    case 'GLASS':
      return Wine;
    case 'METAL':
      return Package;
    default:
      return Package;
  }
};
const getCategoryColor = (category: string) => {
  switch (category) {
    case 'PLASTIC':
      return {
        bg: 'bg-purple-50',
        icon: 'bg-purple-500',
        text: 'text-purple-700',
        border: 'border-purple-200'
      };
    case 'PAPER':
      return {
        bg: 'bg-orange-50',
        icon: 'bg-orange-500',
        text: 'text-orange-700',
        border: 'border-orange-200'
      };
    case 'GLASS':
      return {
        bg: 'bg-green-50',
        icon: 'bg-green-500',
        text: 'text-green-700',
        border: 'border-green-200'
      };
    case 'METAL':
      return {
        bg: 'bg-blue-50',
        icon: 'bg-blue-500',
        text: 'text-blue-700',
        border: 'border-blue-200'
      };
    default:
      return {
        bg: 'bg-zinc-50',
        icon: 'bg-zinc-500',
        text: 'text-zinc-700',
        border: 'border-zinc-200'
      };
  }
};
export const RecycleOrder = ({
  onBack,
  onContinue,
  initialItems = mockInitialItems
}: RecycleOrderProps) => {
  const [items, setItems] = useState<RecycleOrderItem[]>(initialItems);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['PLASTIC']));

  // Group items by category
  const groupedItems = useMemo(() => {
    const groups: {
      [key: string]: RecycleOrderItem[];
    } = {};
    items.forEach(item => {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category].push(item);
    });
    return groups;
  }, [items]);

  // Calculate totals per category
  const categoryTotals = useMemo(() => {
    const totals: {
      [key: string]: {
        weight: number;
        points: number;
      };
    } = {};
    Object.keys(groupedItems).forEach(category => {
      const categoryItems = groupedItems[category];
      totals[category] = {
        weight: categoryItems.reduce((sum, item) => sum + item.weightPerUnit * item.quantity, 0),
        points: categoryItems.reduce((sum, item) => sum + item.pointsPerUnit * item.quantity, 0)
      };
    });
    return totals;
  }, [groupedItems]);

  // Calculate grand totals
  const grandTotals = useMemo(() => {
    return items.reduce((acc, item) => ({
      weight: acc.weight + item.weightPerUnit * item.quantity,
      points: acc.points + item.pointsPerUnit * item.quantity,
      co2Saved: acc.co2Saved + item.co2SavedPerUnit * item.quantity
    }), {
      weight: 0,
      points: 0,
      co2Saved: 0
    });
  }, [items]);
  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };
  const updateQuantity = (itemId: string, delta: number) => {
    setItems(prevItems => prevItems.map(item => item.id === itemId ? {
      ...item,
      quantity: Math.max(0, item.quantity + delta)
    } : item).filter(item => item.quantity > 0));
  };
  const handleContinue = () => {
    if (items.length === 0) return;
    onContinue?.(items, grandTotals.weight, grandTotals.points);
  };
  const formatWeight = (grams: number) => {
    if (grams >= 1000) {
      return `${(grams / 1000).toFixed(1)}kg`;
    }
    return `${grams}g`;
  };
  return <div className="relative w-full h-full min-h-screen bg-zinc-50 flex flex-col font-sans overflow-hidden" data-magicpath-id="0" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">
      {/* Header */}
      <header className="bg-white px-6 py-6 shadow-sm relative z-20" data-magicpath-id="1" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">
        <div className="flex items-center gap-4" data-magicpath-id="2" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">
          <button onClick={onBack} className="p-2.5 rounded-full bg-zinc-100 hover:bg-zinc-200 transition-all cursor-pointer" data-magicpath-id="3" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">
            <ArrowLeft size={24} className="text-zinc-800" data-magicpath-id="4" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx" />
          </button>
          <div className="flex-1" data-magicpath-id="5" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">
            <h1 className="text-2xl font-semibold text-zinc-800" data-magicpath-id="6" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">Recycle Order</h1>
            <p className="text-sm text-zinc-500 mt-0.5" data-magicpath-id="7" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">
              Review and confirm your items
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-48 px-6 pt-6" data-magicpath-id="8" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">
        <div className="space-y-4" data-magicpath-id="9" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">
          {Object.keys(groupedItems).map((category, categoryIndex) => {
          const categoryItems = groupedItems[category];
          const isExpanded = expandedCategories.has(category);
          const colors = getCategoryColor(category);
          const CategoryIcon = getCategoryIcon(category);
          const categoryTotal = categoryTotals[category];
          return <motion.div key={category} initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: categoryIndex * 0.1
          }} className="bg-white rounded-[2rem] shadow-sm overflow-hidden" data-magicpath-id="10" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">
                {/* Category Header */}
                <motion.button onClick={() => toggleCategory(category)} className={cn("w-full px-6 py-5 flex items-center gap-4 cursor-pointer transition-colors", isExpanded ? colors.bg : "hover:bg-zinc-50")} whileTap={{
              scale: 0.98
            }} data-magicpath-id="11" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">
                  {/* Category Icon */}
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shrink-0", colors.icon)} data-magicpath-id="12" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">
                    <CategoryIcon size={28} className="text-white" strokeWidth={2} data-magicpath-id="13" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx" />
                  </div>

                  {/* Category Info */}
                  <div className="flex-1 text-left" data-magicpath-id="14" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">
                    <h3 className="text-lg font-bold text-zinc-800" data-magicpath-id="15" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">
                      {category}
                    </h3>
                    <div className="flex items-center gap-4 mt-1" data-magicpath-id="16" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">
                      <span className="text-sm text-zinc-600" data-magicpath-id="17" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">
                        {formatWeight(categoryTotal.weight)}
                      </span>
                      <span className="text-sm font-semibold text-[#005C4B]" data-magicpath-id="18" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">
                        +{categoryTotal.points} pts
                      </span>
                    </div>
                  </div>

                  {/* Expand Icon */}
                  <motion.div animate={{
                rotate: isExpanded ? 180 : 0
              }} transition={{
                duration: 0.3
              }} data-magicpath-id="19" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">
                    <ChevronDown size={24} className="text-zinc-400" data-magicpath-id="20" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx" />
                  </motion.div>
                </motion.button>

                {/* Category Items */}
                <AnimatePresence data-magicpath-id="21" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">
                  {isExpanded && <motion.div initial={{
                height: 0,
                opacity: 0
              }} animate={{
                height: "auto",
                opacity: 1
              }} exit={{
                height: 0,
                opacity: 0
              }} transition={{
                duration: 0.3,
                ease: "easeInOut"
              }} className="overflow-hidden" data-magicpath-id="22" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">
                      <div className={cn("px-4 pb-4 border-t", colors.border)} data-magicpath-id="23" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">
                        <div className="space-y-3 pt-4" data-magicpath-id="24" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">
                          {categoryItems.map((item, itemIndex) => <motion.div key={item.id} initial={{
                      opacity: 0,
                      x: -20
                    }} animate={{
                      opacity: 1,
                      x: 0
                    }} exit={{
                      opacity: 0,
                      x: -20
                    }} transition={{
                      delay: itemIndex * 0.05
                    }} className="bg-zinc-50 rounded-[1.5rem] p-4" data-magicpath-id="25" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">
                              {/* Item Info */}
                              <div className="flex items-start justify-between mb-3" data-magicpath-id="26" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">
                                <div className="flex-1 pr-4" data-magicpath-id="27" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">
                                  <h4 className="font-semibold text-zinc-800 mb-1" data-magicpath-id="28" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">
                                    {item.name}
                                  </h4>
                                  <p className="text-xs text-zinc-500 mb-2" data-magicpath-id="29" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">
                                    {item.description}
                                  </p>
                                  <div className="flex items-center gap-3 text-xs" data-magicpath-id="30" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">
                                    <span className="text-zinc-600" data-magicpath-id="31" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">
                                      {formatWeight(item.weightPerUnit * item.quantity)}
                                    </span>
                                    <span className="font-semibold text-[#005C4B]" data-magicpath-id="32" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">
                                      +{item.pointsPerUnit * item.quantity} pts
                                    </span>
                                  </div>
                                </div>

                                {/* Quantity Controls */}
                                <div className="flex items-center gap-2 shrink-0" data-magicpath-id="33" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">
                                  <motion.button onClick={() => updateQuantity(item.id, -1)} className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:shadow-md transition-shadow cursor-pointer" whileTap={{
                            scale: 0.9
                          }} data-magicpath-id="34" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">
                                    <Minus size={16} className="text-zinc-600" strokeWidth={2.5} data-magicpath-id="35" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx" />
                                  </motion.button>

                                  <motion.span key={item.quantity} initial={{
                            scale: 1.2
                          }} animate={{
                            scale: 1
                          }} className="w-10 text-center font-bold text-zinc-800 text-lg" data-magicpath-id="36" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">
                                    {item.quantity}
                                  </motion.span>

                                  <motion.button onClick={() => updateQuantity(item.id, 1)} className="w-10 h-10 rounded-full bg-[#DDF247] flex items-center justify-center shadow-sm hover:shadow-md transition-shadow cursor-pointer" whileTap={{
                            scale: 0.9
                          }} data-magicpath-id="37" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">
                                    <Plus size={16} className="text-[#2A1805]" strokeWidth={2.5} data-magicpath-id="38" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx" />
                                  </motion.button>
                                </div>
                              </div>
                            </motion.div>)}
                        </div>
                      </div>
                    </motion.div>}
                </AnimatePresence>
              </motion.div>;
        })}
        </div>

        {/* Empty State */}
        {items.length === 0 && <motion.div initial={{
        opacity: 0,
        scale: 0.9
      }} animate={{
        opacity: 1,
        scale: 1
      }} className="flex flex-col items-center justify-center py-20" data-magicpath-id="39" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">
            <div className="w-24 h-24 bg-zinc-200 rounded-full flex items-center justify-center mb-6" data-magicpath-id="40" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">
              <Package size={48} className="text-zinc-400" data-magicpath-id="41" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx" />
            </div>
            <h3 className="text-xl font-semibold text-zinc-800 mb-2" data-magicpath-id="42" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">
              No items in order
            </h3>
            <p className="text-zinc-500 text-center px-8" data-magicpath-id="43" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">
              Scan some items to add them to your recycle order
            </p>
          </motion.div>}
      </div>

      {/* Bottom Summary & Continue Button */}
      {items.length > 0 && <motion.div initial={{
      y: 100,
      opacity: 0
    }} animate={{
      y: 0,
      opacity: 1
    }} transition={{
      delay: 0.3,
      type: "spring",
      stiffness: 300,
      damping: 30
    }} className="absolute bottom-0 left-0 right-0 bg-white border-t border-zinc-100 z-30" data-magicpath-id="44" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">
          {/* Summary Stats */}
          <div className="px-6 pt-6 pb-4" data-magicpath-id="45" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">
            <div className="bg-gradient-to-r from-[#005C4B] to-[#DDF247] rounded-[2rem] p-6" data-magicpath-id="46" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">
              <div className="flex items-center justify-between mb-4" data-magicpath-id="47" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">
                <h3 className="text-white font-bold text-lg" data-magicpath-id="48" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">Total Summary</h3>
                <div className="flex items-center gap-2" data-magicpath-id="49" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center" data-magicpath-id="50" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">
                    <Recycle size={20} className="text-white" data-magicpath-id="51" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4" data-magicpath-id="52" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">
                {/* Total Weight */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4" data-magicpath-id="53" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">
                  <div className="flex items-center gap-2 mb-2" data-magicpath-id="54" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">
                    <Package size={16} className="text-white/80" data-magicpath-id="55" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx" />
                    <span className="text-xs font-medium text-white/80 uppercase tracking-wide" data-magicpath-id="56" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">
                      Weight
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-white" data-magicpath-id="57" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">
                    {formatWeight(grandTotals.weight)}
                  </p>
                </div>

                {/* Total Points */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4" data-magicpath-id="58" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">
                  <div className="flex items-center gap-2 mb-2" data-magicpath-id="59" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">
                    <Award size={16} className="text-white/80" data-magicpath-id="60" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx" />
                    <span className="text-xs font-medium text-white/80 uppercase tracking-wide" data-magicpath-id="61" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">
                      Points
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-white" data-magicpath-id="62" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">
                    {grandTotals.points}
                  </p>
                </div>

                {/* CO2 Saved */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4" data-magicpath-id="63" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">
                  <div className="flex items-center gap-2 mb-2" data-magicpath-id="64" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">
                    <Droplets size={16} className="text-white/80" data-magicpath-id="65" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx" />
                    <span className="text-xs font-medium text-white/80 uppercase tracking-wide" data-magicpath-id="66" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">
                      CO2
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-white" data-magicpath-id="67" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">
                    {formatWeight(grandTotals.co2Saved)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <div className="px-6 pb-6" data-magicpath-id="68" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">
            <motion.button onClick={handleContinue} disabled={items.length === 0} className={cn("w-full py-5 rounded-[2rem] font-bold text-lg transition-all shadow-lg cursor-pointer", items.length > 0 ? "bg-[#2A1805] text-white hover:shadow-xl" : "bg-zinc-300 text-zinc-500 cursor-not-allowed")} whileTap={items.length > 0 ? {
          scale: 0.98
        } : {}} data-magicpath-id="69" data-magicpath-path="RecycleOrder_dupe_1_dupe_1.tsx">
              Continue to Checkout
            </motion.button>
          </div>
        </motion.div>}
    </div>;
};
export default RecycleOrder;