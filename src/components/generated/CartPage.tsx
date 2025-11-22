"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Minus, Plus, Trash2, Tag, ShoppingBag, Sparkles, ArrowRight, Package } from 'lucide-react';
import { cn } from '../../lib/utils';
export interface CartItem {
  id: string;
  name: string;
  price: number;
  points: number;
  image: string;
  quantity: number;
}
export interface CartPageProps {
  cartItems?: CartItem[];
  onCheckout?: (items: CartItem[], total: number, totalPoints: number) => void;
  onBack?: () => void;
  onContinueShopping?: () => void;
  onUpdateCart?: (items: CartItem[]) => void;
}
export const CartPage = ({
  cartItems = [],
  onCheckout,
  onBack,
  onContinueShopping,
  onUpdateCart
}: CartPageProps) => {
  const [items, setItems] = useState<CartItem[]>(cartItems);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{
    code: string;
    discount: number;
  } | null>(null);
  const [showPromoInput, setShowPromoInput] = useState(false);

  // Sync items with parent when they change
  useEffect(() => {
    if (onUpdateCart) {
      onUpdateCart(items);
    }
  }, [items, onUpdateCart]);

  // Calculate totals
  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);
  const totalPoints = useMemo(() => {
    return items.reduce((sum, item) => sum + item.points * item.quantity, 0);
  }, [items]);
  const discount = appliedPromo ? subtotal * appliedPromo.discount : 0;
  const total = subtotal - discount;
  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(itemId);
    } else {
      setItems(prev => prev.map(item => item.id === itemId ? {
        ...item,
        quantity: newQuantity
      } : item));
    }
  };
  const removeItem = (itemId: string) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
  };
  const applyPromoCode = () => {
    // Mock promo code validation
    const validPromos: Record<string, number> = {
      'ECO10': 0.10,
      'GREEN15': 0.15,
      'RECYCLE20': 0.20
    };
    const upperCode = promoCode.toUpperCase();
    if (validPromos[upperCode]) {
      setAppliedPromo({
        code: upperCode,
        discount: validPromos[upperCode]
      });
      setShowPromoInput(false);
      setPromoCode('');
    }
  };
  const handleCheckout = () => {
    if (items.length > 0 && onCheckout) {
      onCheckout(items, total, totalPoints);
    }
  };
  const isEmpty = items.length === 0;
  return <div className="relative w-full h-full min-h-screen bg-zinc-50 flex flex-col font-sans overflow-hidden">
      {/* Header */}
      <header className="bg-white px-6 py-6 shadow-sm relative z-20">
        <div className="flex items-center justify-between">
          <button onClick={onBack || onContinueShopping} className="p-2.5 rounded-full bg-zinc-100 hover:bg-zinc-200 transition-all cursor-pointer">
            <ChevronLeft size={24} className="text-zinc-800" />
          </button>
          
          <h1 className="text-2xl font-semibold text-zinc-800">Shopping Cart</h1>
          
          <div className="p-2.5 rounded-full bg-[#DDF247]">
            <ShoppingBag size={24} className="text-[#2A1805]" />
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-32">
        {isEmpty ?
      // Empty State
      <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} className="flex flex-col items-center justify-center h-full px-6 py-16">
            <motion.div initial={{
          scale: 0
        }} animate={{
          scale: 1
        }} transition={{
          delay: 0.2,
          type: "spring",
          stiffness: 200
        }} className="w-40 h-40 bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-full flex items-center justify-center mb-6 relative">
              {/* Cute sad flower illustration */}
              <svg viewBox="0 0 100 100" className="w-24 h-24">
                {/* Petals - white */}
                <ellipse cx="35" cy="35" rx="6" ry="12" fill="white" transform="rotate(-30 50 50)" />
                <ellipse cx="40" cy="28" rx="6" ry="12" fill="white" transform="rotate(-10 50 50)" />
                <ellipse cx="50" cy="25" rx="6" ry="12" fill="white" transform="rotate(10 50 50)" />
                <ellipse cx="60" cy="28" rx="6" ry="12" fill="white" transform="rotate(30 50 50)" />
                <ellipse cx="65" cy="35" rx="6" ry="12" fill="white" transform="rotate(50 50 50)" />
                <ellipse cx="65" cy="50" rx="6" ry="12" fill="white" transform="rotate(70 50 50)" />
                <ellipse cx="60" cy="60" rx="6" ry="12" fill="white" transform="rotate(90 50 50)" />
                <ellipse cx="50" cy="65" rx="6" ry="12" fill="white" transform="rotate(110 50 50)" />
                <ellipse cx="40" cy="60" rx="6" ry="12" fill="white" transform="rotate(130 50 50)" />
                <ellipse cx="35" cy="50" rx="6" ry="12" fill="white" transform="rotate(150 50 50)" />
                
                {/* Center - yellow */}
                <circle cx="50" cy="43" r="12" fill="#FFD700" />
                
                {/* Sad face */}
                <circle cx="46" cy="41" r="1.5" fill="#2A1805" />
                <circle cx="54" cy="41" r="1.5" fill="#2A1805" />
                <path d="M 46 48 Q 50 46 54 48" stroke="#2A1805" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                
                {/* Stem */}
                <path d="M 50 55 L 50 80" stroke="#005C4B" strokeWidth="6" strokeLinecap="round" />
              </svg>
            </motion.div>

            <h2 className="text-2xl font-bold text-zinc-800 mb-2">Your cart is empty</h2>
            <p className="text-zinc-500 text-center mb-8 max-w-xs">
              Start shopping and add eco-friendly products to earn reward points!
            </p>

            <motion.button onClick={onContinueShopping} whileTap={{
          scale: 0.95
        }} className="px-8 py-4 bg-[#005C4B] text-white rounded-2xl font-semibold text-base hover:bg-[#004a3d] transition-colors flex items-center gap-3 shadow-lg">
              <ShoppingBag size={20} />
              Start Shopping
            </motion.button>
          </motion.div> :
      // Cart Items
      <div className="px-6 py-6 space-y-4">
            {/* Cart Items List */}
            <AnimatePresence mode="popLayout">
              {items.map((item, index) => <motion.div key={item.id} initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }} exit={{
            opacity: 0,
            x: 20,
            height: 0
          }} transition={{
            delay: index * 0.05
          }} layout className="bg-white rounded-[2rem] p-4 shadow-sm flex gap-4 relative overflow-hidden">
                  {/* Product Image */}
                  <div className="w-24 h-24 rounded-2xl overflow-hidden bg-zinc-100 flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <h3 className="font-semibold text-zinc-800 text-base mb-1 line-clamp-2">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg font-bold text-[#2A1805]">${item.price}</span>
                        <span className="text-xs text-zinc-400">×</span>
                        <span className="text-sm font-semibold text-[#005C4B]">{item.points}pts</span>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <motion.button onClick={() => updateQuantity(item.id, item.quantity - 1)} whileTap={{
                  scale: 0.9
                }} className="w-8 h-8 rounded-lg bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center transition-colors">
                        <Minus size={16} className="text-zinc-700" />
                      </motion.button>

                      <div className="w-10 h-8 bg-[#DDF247] rounded-lg flex items-center justify-center">
                        <span className="font-bold text-[#2A1805]">{item.quantity}</span>
                      </div>

                      <motion.button onClick={() => updateQuantity(item.id, item.quantity + 1)} whileTap={{
                  scale: 0.9
                }} className="w-8 h-8 rounded-lg bg-[#005C4B] hover:bg-[#004a3d] flex items-center justify-center transition-colors">
                        <Plus size={16} className="text-white" />
                      </motion.button>

                      <motion.button onClick={() => removeItem(item.id)} whileTap={{
                  scale: 0.9
                }} className="ml-auto w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors">
                        <Trash2 size={16} className="text-red-500" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Subtotal for this item */}
                  <div className="absolute top-4 right-4">
                    <span className="text-sm font-bold text-zinc-600">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </motion.div>)}
            </AnimatePresence>

            {/* Promo Code Section */}
            <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.3
        }} className="bg-white rounded-[2rem] p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Tag size={20} className="text-[#005C4B]" />
                  <h3 className="font-semibold text-zinc-800">Promo Code</h3>
                </div>
                
                {!showPromoInput && !appliedPromo && <button onClick={() => setShowPromoInput(true)} className="text-sm font-semibold text-[#005C4B] hover:text-[#004a3d]">
                    Add Code
                  </button>}
              </div>

              <AnimatePresence mode="wait">
                {appliedPromo ? <motion.div key="applied" initial={{
              opacity: 0,
              scale: 0.95
            }} animate={{
              opacity: 1,
              scale: 1
            }} exit={{
              opacity: 0,
              scale: 0.95
            }} className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Sparkles size={20} className="text-green-600" />
                      </div>
                      <div>
                        <p className="font-bold text-green-700">{appliedPromo.code}</p>
                        <p className="text-sm text-green-600">
                          {(appliedPromo.discount * 100).toFixed(0)}% discount applied
                        </p>
                      </div>
                    </div>
                    <button onClick={() => setAppliedPromo(null)} className="text-xs text-red-500 hover:text-red-600 font-medium">
                      Remove
                    </button>
                  </motion.div> : showPromoInput ? <motion.div key="input" initial={{
              opacity: 0,
              height: 0
            }} animate={{
              opacity: 1,
              height: "auto"
            }} exit={{
              opacity: 0,
              height: 0
            }} className="flex gap-2">
                    <input type="text" value={promoCode} onChange={e => setPromoCode(e.target.value)} placeholder="Enter code" className="flex-1 px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#005C4B] focus:border-transparent" onKeyPress={e => e.key === 'Enter' && applyPromoCode()} />
                    <button onClick={applyPromoCode} className="px-6 py-3 bg-[#005C4B] text-white rounded-xl font-semibold text-sm hover:bg-[#004a3d] transition-colors">
                      Apply
                    </button>
                  </motion.div> : <motion.p key="placeholder" initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} exit={{
              opacity: 0
            }} className="text-sm text-zinc-400">
                    Try: ECO10, GREEN15, RECYCLE20
                  </motion.p>}
              </AnimatePresence>
            </motion.div>

            {/* Order Summary */}
            <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.4
        }} className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-[2.5rem] p-6 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full">
                  <pattern id="dots-cart" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <circle cx="20" cy="20" r="2" fill="white" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#dots-cart)" />
                </svg>
              </div>

              <div className="relative z-10 space-y-3">
                <h3 className="text-white font-semibold text-lg mb-4">Order Summary</h3>

                <div className="flex justify-between items-center">
                  <span className="text-white/90 text-sm">Subtotal</span>
                  <span className="text-white font-semibold">${subtotal.toFixed(2)}</span>
                </div>

                {appliedPromo && <div className="flex justify-between items-center">
                    <span className="text-white/90 text-sm">Discount ({appliedPromo.code})</span>
                    <span className="text-[#DDF247] font-semibold">-${discount.toFixed(2)}</span>
                  </div>}

                <div className="border-t border-white/20 pt-3 mt-3">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-white font-semibold text-lg">Total</span>
                    <span className="text-white font-bold text-2xl">${total.toFixed(2)}</span>
                  </div>

                  <div className="flex items-center justify-center gap-2 bg-white/20 rounded-xl px-4 py-3 backdrop-blur-sm">
                    <Sparkles size={18} className="text-[#DDF247]" />
                    <span className="text-white font-semibold">
                      You'll earn {totalPoints.toLocaleString()} points
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Continue Shopping Link */}
            <motion.button initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 0.5
        }} onClick={onContinueShopping} className="w-full py-4 text-center text-[#005C4B] font-semibold hover:text-[#004a3d] transition-colors flex items-center justify-center gap-2">
              <ShoppingBag size={18} />
              Continue Shopping
            </motion.button>
          </div>}
      </div>

      {/* Checkout Button - Fixed at bottom */}
      {!isEmpty && <motion.div initial={{
      y: 100,
      opacity: 0
    }} animate={{
      y: 0,
      opacity: 1
    }} transition={{
      delay: 0.6,
      type: "spring",
      stiffness: 200
    }} className="absolute bottom-8 left-0 right-0 px-6 z-50">
          <motion.button onClick={handleCheckout} whileTap={{
        scale: 0.98
      }} whileHover={{
        scale: 1.02
      }} className="w-full bg-[#2A1805] text-white py-5 rounded-[2rem] font-bold text-lg shadow-[0_8px_30px_rgb(42,24,5,0.3)] hover:shadow-[0_12px_40px_rgb(42,24,5,0.4)] transition-all flex items-center justify-center gap-3 relative overflow-hidden group">
            {/* Animated background effect */}
            <motion.div className="absolute inset-0 bg-gradient-to-r from-[#DDF247]/20 to-transparent" initial={{
          x: '-100%'
        }} whileHover={{
          x: '100%'
        }} transition={{
          duration: 0.6
        }} />
            
            <span className="relative z-10 flex items-center gap-3">
              Continue to Checkout
              <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>
        </motion.div>}
    </div>;
};
export default CartPage;