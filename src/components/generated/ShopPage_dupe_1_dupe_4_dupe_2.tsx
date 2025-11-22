"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, MapPin, ScanLine, ShoppingBag, User, ChevronLeft, ShoppingCart, Minus, Plus, Package } from 'lucide-react';
import { cn } from '../../lib/utils';
type NavItem = {
  id: string;
  label: string;
  icon: React.ElementType;
};
type Category = 'BACKPACKS' | 'SNEAKERS' | 'TOYS' | 'CLOTHING' | 'ACCESSORIES';
type Product = {
  id: string;
  name: string;
  price: number;
  points: number;
  category: Category;
  image: string;
};
const navItems: NavItem[] = [{
  id: 'home',
  label: 'HOME',
  icon: Home
}, {
  id: 'map',
  label: 'MAP',
  icon: MapPin
}, {
  id: 'scan',
  label: 'SCAN',
  icon: ScanLine
}, {
  id: 'shop',
  label: 'SHOP',
  icon: ShoppingBag
}, {
  id: 'profile',
  label: 'PROFILE',
  icon: User
}];
const categories: Category[] = ['BACKPACKS', 'SNEAKERS', 'TOYS', 'CLOTHING', 'ACCESSORIES'];
const products: Product[] = [{
  id: '1',
  name: 'Eco Backpack',
  price: 45,
  points: 2250,
  category: 'BACKPACKS',
  image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400'
}, {
  id: '2',
  name: 'Canvas Daypack',
  price: 38,
  points: 1900,
  category: 'BACKPACKS',
  image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=400'
}, {
  id: '3',
  name: 'Green Sneakers',
  price: 65,
  points: 3250,
  category: 'SNEAKERS',
  image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400'
}, {
  id: '4',
  name: 'Sport Runners',
  price: 72,
  points: 3600,
  category: 'SNEAKERS',
  image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400'
}, {
  id: '5',
  name: 'Wooden Toy Set',
  price: 28,
  points: 1400,
  category: 'TOYS',
  image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400'
}, {
  id: '6',
  name: 'Puzzle Collection',
  price: 22,
  points: 1100,
  category: 'TOYS',
  image: 'https://images.unsplash.com/photo-1587450871443-5f8c165d51c8?w=400'
}, {
  id: '7',
  name: 'Organic T-Shirt',
  price: 32,
  points: 1600,
  category: 'CLOTHING',
  image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400'
}, {
  id: '8',
  name: 'Recycled Hoodie',
  price: 48,
  points: 2400,
  category: 'CLOTHING',
  image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400'
}, {
  id: '9',
  name: 'Bamboo Sunglasses',
  price: 35,
  points: 1750,
  category: 'ACCESSORIES',
  image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400'
}, {
  id: '10',
  name: 'Cork Wallet',
  price: 26,
  points: 1300,
  category: 'ACCESSORIES',
  image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400'
}];
export interface ShopPageProps {
  onNavigateToHome?: () => void;
  onNavigateToMap?: () => void;
}
export const ShopPage = ({
  onNavigateToHome,
  onNavigateToMap
}: ShopPageProps = {}) => {
  const [activeTab, setActiveTab] = useState('shop');
  const [selectedCategory, setSelectedCategory] = useState<Category>('BACKPACKS');
  const [cart, setCart] = useState<Record<string, number>>({});
  const [rewardPoints] = useState(2160);
  const filteredProducts = products.filter(product => product.category === selectedCategory);
  const cartItemCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const addToCart = (productId: string) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };
  const removeFromCart = (productId: string) => {
    setCart(prev => {
      const newCart = {
        ...prev
      };
      if (newCart[productId] > 1) {
        newCart[productId]--;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };
  const getCartQuantity = (productId: string) => cart[productId] || 0;
  return <div className="relative w-full h-full min-h-screen bg-zinc-50 flex flex-col font-sans overflow-hidden" data-magicpath-id="0" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx">
      {/* Header */}
      <header className="bg-white px-6 py-6 shadow-sm relative z-20" data-magicpath-id="1" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx">
        <div className="flex items-center justify-between" data-magicpath-id="2" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx">
          <button onClick={onNavigateToHome} className="p-2.5 rounded-full bg-zinc-100 hover:bg-zinc-200 transition-all cursor-pointer" data-magicpath-id="3" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx">
            <ChevronLeft size={24} className="text-zinc-800" data-magicpath-id="4" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx" />
          </button>
          
          <h1 className="text-2xl font-semibold text-zinc-800" data-magicpath-id="5" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx">Recycle Shop</h1>
          
          <button className="relative p-2.5 rounded-full bg-zinc-100 hover:bg-zinc-200 transition-all cursor-pointer" data-magicpath-id="6" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx">
            <ShoppingCart size={24} className="text-zinc-800" data-magicpath-id="7" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx" />
            <AnimatePresence data-magicpath-id="8" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx">
              {cartItemCount > 0 && <motion.div initial={{
              scale: 0
            }} animate={{
              scale: 1
            }} exit={{
              scale: 0
            }} className="absolute -top-1 -right-1 w-5 h-5 bg-[#DDF247] rounded-full flex items-center justify-center" data-magicpath-id="9" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx">
                  <span className="text-xs font-bold text-[#2A1805]" data-magicpath-id="10" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx">{cartItemCount}</span>
                </motion.div>}
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-32" data-magicpath-id="11" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx">
        {/* Reward Points Card */}
        <div className="px-6 pt-6 pb-4" data-magicpath-id="12" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-[2.5rem] p-6 relative overflow-hidden min-h-[140px]" data-magicpath-id="13" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10" data-magicpath-id="14" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx">
              <svg className="w-full h-full" data-magicpath-id="15" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx">
                <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse" data-magicpath-id="16" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx">
                  <circle cx="20" cy="20" r="2" fill="white" data-magicpath-id="17" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#dots)" data-magicpath-id="18" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx" />
              </svg>
            </div>

            <div className="relative z-10 flex items-center justify-between" data-magicpath-id="19" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx">
              <div data-magicpath-id="20" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx">
                <p className="text-white/90 text-sm font-medium mb-2" data-magicpath-id="21" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx">Available reward points</p>
                <p className="text-5xl font-bold text-white" data-magicpath-id="22" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx">{rewardPoints.toLocaleString()}</p>
              </div>
              
              {/* Cute Flower Illustration */}
              <div className="w-24 h-24" data-magicpath-id="23" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx">
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg" data-magicpath-id="24" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx">
                  {/* Petals - white */}
                  <ellipse cx="35" cy="35" rx="8" ry="16" fill="white" transform="rotate(-30 50 50)" data-magicpath-id="25" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx" />
                  <ellipse cx="40" cy="25" rx="8" ry="16" fill="white" transform="rotate(-10 50 50)" data-magicpath-id="26" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx" />
                  <ellipse cx="50" cy="20" rx="8" ry="16" fill="white" transform="rotate(10 50 50)" data-magicpath-id="27" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx" />
                  <ellipse cx="60" cy="25" rx="8" ry="16" fill="white" transform="rotate(30 50 50)" data-magicpath-id="28" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx" />
                  <ellipse cx="65" cy="35" rx="8" ry="16" fill="white" transform="rotate(50 50 50)" data-magicpath-id="29" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx" />
                  <ellipse cx="65" cy="50" rx="8" ry="16" fill="white" transform="rotate(70 50 50)" data-magicpath-id="30" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx" />
                  <ellipse cx="60" cy="60" rx="8" ry="16" fill="white" transform="rotate(90 50 50)" data-magicpath-id="31" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx" />
                  <ellipse cx="50" cy="65" rx="8" ry="16" fill="white" transform="rotate(110 50 50)" data-magicpath-id="32" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx" />
                  <ellipse cx="40" cy="60" rx="8" ry="16" fill="white" transform="rotate(130 50 50)" data-magicpath-id="33" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx" />
                  <ellipse cx="35" cy="50" rx="8" ry="16" fill="white" transform="rotate(150 50 50)" data-magicpath-id="34" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx" />
                  
                  {/* Center - yellow */}
                  <circle cx="50" cy="43" r="14" fill="#FFD700" data-magicpath-id="35" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx" />
                  
                  {/* Face */}
                  <circle cx="45" cy="41" r="2" fill="#2A1805" data-magicpath-id="36" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx" />
                  <circle cx="55" cy="41" r="2" fill="#2A1805" data-magicpath-id="37" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx" />
                  <path d="M 46 47 Q 50 50 54 47" stroke="#2A1805" strokeWidth="2" fill="none" strokeLinecap="round" data-magicpath-id="38" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx" />
                  
                  {/* Stem */}
                  <path d="M 50 57 Q 45 75 40 85" stroke="#005C4B" strokeWidth="8" strokeLinecap="round" fill="none" data-magicpath-id="39" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx" />
                  <path d="M 50 57 Q 55 75 60 85" stroke="#005C4B" strokeWidth="8" strokeLinecap="round" fill="none" data-magicpath-id="40" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Category Filter */}
        <div className="px-6 pb-4" data-magicpath-id="41" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2" data-magicpath-id="42" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx">
            {categories.map((category, index) => {
            const isActive = selectedCategory === category;
            return <motion.button key={category} onClick={() => setSelectedCategory(category)} initial={{
              opacity: 0,
              x: -20
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              delay: index * 0.05
            }} className={cn("px-5 py-3 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 shadow-md", isActive ? "bg-[#2A1805] text-white scale-105" : "bg-white text-zinc-700 hover:bg-zinc-50")} whileTap={{
              scale: 0.95
            }} data-magicpath-id="43" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx">
                  {category}
                </motion.button>;
          })}
          </div>
        </div>

        {/* Product Grid */}
        <div className="px-6 pb-6" data-magicpath-id="44" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx">
          <AnimatePresence mode="wait" data-magicpath-id="45" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx">
            <motion.div key={selectedCategory} initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} exit={{
            opacity: 0,
            y: -20
          }} transition={{
            duration: 0.3
          }} className="grid grid-cols-2 gap-4" data-magicpath-id="46" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx">
              {filteredProducts.map((product, index) => {
              const quantity = getCartQuantity(product.id);
              const hasInCart = quantity > 0;
              return <motion.div key={product.id} initial={{
                opacity: 0,
                scale: 0.9
              }} animate={{
                opacity: 1,
                scale: 1
              }} transition={{
                delay: index * 0.1
              }} className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-lg transition-all group cursor-pointer" whileHover={{
                scale: 1.03
              }} whileTap={{
                scale: 0.98
              }} data-magicpath-id="47" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx">
                    {/* Product Image */}
                    <div className="relative aspect-square bg-zinc-100 overflow-hidden" data-magicpath-id="48" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" data-magicpath-id="49" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx" />
                      
                      {/* Badge */}
                      {hasInCart && <motion.div initial={{
                    scale: 0
                  }} animate={{
                    scale: 1
                  }} className="absolute top-2 right-2 w-7 h-7 bg-[#DDF247] rounded-full flex items-center justify-center shadow-md" data-magicpath-id="50" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx">
                          <span className="text-xs font-bold text-[#2A1805]" data-magicpath-id="51" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx">{quantity}</span>
                        </motion.div>}
                    </div>

                    {/* Product Info */}
                    <div className="p-4" data-magicpath-id="52" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx">
                      <h3 className="text-sm font-semibold text-zinc-800 mb-2 line-clamp-2 min-h-[2.5rem]" data-magicpath-id="53" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center gap-2 mb-3" data-magicpath-id="54" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx">
                        <span className="text-lg font-bold text-[#2A1805]" data-magicpath-id="55" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx">${product.price}</span>
                        <span className="text-xs text-zinc-500" data-magicpath-id="56" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx">or</span>
                        <span className="text-sm font-semibold text-[#005C4B]" data-magicpath-id="57" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx">{product.points}pts</span>
                      </div>

                      {/* Add to Cart / Quantity Controls */}
                      <AnimatePresence mode="wait" data-magicpath-id="58" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx">
                        {!hasInCart ? <motion.button key="add-button" initial={{
                      opacity: 0
                    }} animate={{
                      opacity: 1
                    }} exit={{
                      opacity: 0
                    }} onClick={() => addToCart(product.id)} className="w-full py-2.5 bg-[#005C4B] text-white rounded-xl font-semibold text-sm hover:bg-[#004a3d] transition-colors flex items-center justify-center gap-2" whileTap={{
                      scale: 0.95
                    }} data-magicpath-id="59" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx">
                            <Plus size={16} data-magicpath-id="60" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx" />
                            Add to Cart
                          </motion.button> : <motion.div key="quantity-controls" initial={{
                      opacity: 0
                    }} animate={{
                      opacity: 1
                    }} exit={{
                      opacity: 0
                    }} className="flex items-center gap-2" data-magicpath-id="61" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx">
                            <motion.button onClick={() => removeFromCart(product.id)} className="flex-1 py-2.5 bg-zinc-100 text-zinc-700 rounded-xl font-semibold hover:bg-zinc-200 transition-colors flex items-center justify-center" whileTap={{
                        scale: 0.95
                      }} data-magicpath-id="62" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx">
                              <Minus size={16} data-magicpath-id="63" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx" />
                            </motion.button>
                            
                            <div className="w-12 h-10 bg-[#DDF247] rounded-xl flex items-center justify-center" data-magicpath-id="64" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx">
                              <span className="text-lg font-bold text-[#2A1805]" data-magicpath-id="65" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx">{quantity}</span>
                            </div>
                            
                            <motion.button onClick={() => addToCart(product.id)} className="flex-1 py-2.5 bg-[#005C4B] text-white rounded-xl font-semibold hover:bg-[#004a3d] transition-colors flex items-center justify-center" whileTap={{
                        scale: 0.95
                      }} data-magicpath-id="66" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx">
                              <Plus size={16} data-magicpath-id="67" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx" />
                            </motion.button>
                          </motion.div>}
                      </AnimatePresence>
                    </div>
                  </motion.div>;
            })}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {filteredProducts.length === 0 && <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} className="text-center py-16" data-magicpath-id="68" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx">
              <div className="w-24 h-24 bg-zinc-100 rounded-full mx-auto mb-4 flex items-center justify-center" data-magicpath-id="69" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx">
                <Package className="text-zinc-400" size={48} data-magicpath-id="70" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx" />
              </div>
              <p className="text-zinc-500 font-medium" data-magicpath-id="71" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx">No products in this category</p>
            </motion.div>}
        </div>
      </div>

      {/* Floating Bottom Navbar Container */}
      <div className="absolute bottom-8 left-0 right-0 px-6 z-50 flex justify-center pointer-events-none" data-magicpath-id="72" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx">
        <nav className="bg-white p-2.5 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center gap-2 pointer-events-auto max-w-md w-full justify-between" data-magicpath-id="73" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx">
          {navItems.map(item => {
          const isActive = activeTab === item.id;
          return <motion.button key={item.id} onClick={() => {
            setActiveTab(item.id);
            if (item.id === 'home' && onNavigateToHome) {
              onNavigateToHome();
            }
            if (item.id === 'map' && onNavigateToMap) {
              onNavigateToMap();
            }
          }} className={cn("relative flex items-center justify-center rounded-[2rem] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer -webkit-tap-highlight-color-transparent outline-none", isActive ? "flex-grow px-6 py-3 bg-[#2A1805]" : "w-12 h-12 hover:bg-zinc-100")} layout transition={{
            type: "spring",
            stiffness: 500,
            damping: 35
          }} data-magicpath-id="74" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx">
                {/* Active State Content */}
                <AnimatePresence mode="wait" data-magicpath-id="75" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx">
                  {isActive && <motion.div className="flex items-center gap-3 overflow-hidden whitespace-nowrap" initial={{
                opacity: 0,
                width: 0
              }} animate={{
                opacity: 1,
                width: "auto"
              }} exit={{
                opacity: 0,
                width: 0
              }} transition={{
                duration: 0.3,
                delay: 0.1
              }} data-magicpath-id="76" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx">
                      <item.icon size={20} className="text-white shrink-0" strokeWidth={2.5} data-magicpath-id="77" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx" />
                      <motion.span className="text-white font-semibold text-sm tracking-wide" initial={{
                  opacity: 0,
                  x: -10
                }} animate={{
                  opacity: 1,
                  x: 0
                }} transition={{
                  delay: 0.15
                }} data-magicpath-id="78" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx">
                        {item.label}
                      </motion.span>
                    </motion.div>}
                </AnimatePresence>

                {/* Inactive State Icon */}
                {!isActive && <motion.div layoutId={`icon-${item.id}`} initial={{
              opacity: 0,
              scale: 0.5
            }} animate={{
              opacity: 1,
              scale: 1
            }} exit={{
              opacity: 0,
              scale: 0
            }} transition={{
              duration: 0.2
            }} data-magicpath-id="79" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx">
                    <item.icon size={24} className="text-zinc-400" strokeWidth={2} data-magicpath-id="80" data-magicpath-path="ShopPage_dupe_1_dupe_4_dupe_2.tsx" />
                  </motion.div>}
              </motion.button>;
        })}
        </nav>
      </div>
    </div>;
};
export default ShopPage;