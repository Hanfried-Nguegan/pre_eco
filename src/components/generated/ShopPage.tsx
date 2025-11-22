"use client";

import React, { useState, useEffect } from 'react';
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
  onNavigateToScan?: () => void;
  onNavigateToCart?: () => void;
  onNavigateToProfile?: () => void;
  cartItems?: Array<{
    id: string;
    name: string;
    price: number;
    points: number;
    image: string;
    quantity: number;
  }>;
  onUpdateCart?: (items: Array<{
    id: string;
    name: string;
    price: number;
    points: number;
    image: string;
    quantity: number;
  }>) => void;
}
export const ShopPage = ({
  onNavigateToHome,
  onNavigateToMap,
  onNavigateToScan,
  onNavigateToCart,
  onNavigateToProfile,
  cartItems = [],
  onUpdateCart
}: ShopPageProps = {}) => {
  const [activeTab, setActiveTab] = useState('shop');
  const [selectedCategory, setSelectedCategory] = useState<Category>('BACKPACKS');
  const [cart, setCart] = useState<Record<string, number>>({});
  const [rewardPoints] = useState(2160);

  // Sync cart with cartItems prop on mount
  useEffect(() => {
    if (cartItems.length > 0) {
      const cartMap: Record<string, number> = {};
      cartItems.forEach(item => {
        cartMap[item.id] = item.quantity;
      });
      setCart(cartMap);
    }
  }, []);

  // Update parent cart when local cart changes
  useEffect(() => {
    if (onUpdateCart) {
      const items = Object.entries(cart).map(([productId, quantity]) => {
        const product = products.find(p => p.id === productId);
        if (!product) return null;
        return {
          id: product.id,
          name: product.name,
          price: product.price,
          points: product.points,
          image: product.image,
          quantity
        };
      }).filter((item): item is NonNullable<typeof item> => item !== null);
      onUpdateCart(items);
    }
  }, [cart, onUpdateCart]);
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
  return <div className="relative w-full h-full min-h-screen bg-zinc-50 flex flex-col font-sans overflow-hidden">
      {/* Header */}
      <header className="bg-white px-6 py-6 shadow-sm relative z-20">
        <div className="flex items-center justify-between">
          <button onClick={onNavigateToHome} className="p-2.5 rounded-full bg-zinc-100 hover:bg-zinc-200 transition-all cursor-pointer">
            <ChevronLeft size={24} className="text-zinc-800" />
          </button>
          
          <h1 className="text-2xl font-semibold text-zinc-800">Recycle Shop</h1>
          
          <button onClick={onNavigateToCart} className="relative p-2.5 rounded-full bg-zinc-100 hover:bg-zinc-200 transition-all cursor-pointer">
            <ShoppingCart size={24} className="text-zinc-800" />
            <AnimatePresence>
              {cartItemCount > 0 && <motion.div initial={{
              scale: 0
            }} animate={{
              scale: 1
            }} exit={{
              scale: 0
            }} className="absolute -top-1 -right-1 w-5 h-5 bg-[#DDF247] rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-[#2A1805]">{cartItemCount}</span>
                </motion.div>}
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-32">
        {/* Reward Points Card */}
        <div className="px-6 pt-6 pb-4">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-[2.5rem] p-6 relative overflow-hidden min-h-[140px]">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full">
                <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="20" cy="20" r="2" fill="white" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#dots)" />
              </svg>
            </div>

            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-white/90 text-sm font-medium mb-2">Available reward points</p>
                <p className="text-5xl font-bold text-white">{rewardPoints.toLocaleString()}</p>
              </div>
              
              {/* Cute Flower Illustration */}
              <div className="w-24 h-24">
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
                  {/* Petals - white */}
                  <ellipse cx="35" cy="35" rx="8" ry="16" fill="white" transform="rotate(-30 50 50)" />
                  <ellipse cx="40" cy="25" rx="8" ry="16" fill="white" transform="rotate(-10 50 50)" />
                  <ellipse cx="50" cy="20" rx="8" ry="16" fill="white" transform="rotate(10 50 50)" />
                  <ellipse cx="60" cy="25" rx="8" ry="16" fill="white" transform="rotate(30 50 50)" />
                  <ellipse cx="65" cy="35" rx="8" ry="16" fill="white" transform="rotate(50 50 50)" />
                  <ellipse cx="65" cy="50" rx="8" ry="16" fill="white" transform="rotate(70 50 50)" />
                  <ellipse cx="60" cy="60" rx="8" ry="16" fill="white" transform="rotate(90 50 50)" />
                  <ellipse cx="50" cy="65" rx="8" ry="16" fill="white" transform="rotate(110 50 50)" />
                  <ellipse cx="40" cy="60" rx="8" ry="16" fill="white" transform="rotate(130 50 50)" />
                  <ellipse cx="35" cy="50" rx="8" ry="16" fill="white" transform="rotate(150 50 50)" />
                  
                  {/* Center - yellow */}
                  <circle cx="50" cy="43" r="14" fill="#FFD700" />
                  
                  {/* Face */}
                  <circle cx="45" cy="41" r="2" fill="#2A1805" />
                  <circle cx="55" cy="41" r="2" fill="#2A1805" />
                  <path d="M 46 47 Q 50 50 54 47" stroke="#2A1805" strokeWidth="2" fill="none" strokeLinecap="round" />
                  
                  {/* Stem */}
                  <path d="M 50 57 Q 45 75 40 85" stroke="#005C4B" strokeWidth="8" strokeLinecap="round" fill="none" />
                  <path d="M 50 57 Q 55 75 60 85" stroke="#005C4B" strokeWidth="8" strokeLinecap="round" fill="none" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Category Filter */}
        <div className="px-6 pb-4">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
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
            }}>
                  {category}
                </motion.button>;
          })}
          </div>
        </div>

        {/* Product Grid */}
        <div className="px-6 pb-6">
          <AnimatePresence mode="wait">
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
          }} className="grid grid-cols-2 gap-4">
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
              }}>
                    {/* Product Image */}
                    <div className="relative aspect-square bg-zinc-100 overflow-hidden">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      
                      {/* Badge */}
                      {hasInCart && <motion.div initial={{
                    scale: 0
                  }} animate={{
                    scale: 1
                  }} className="absolute top-2 right-2 w-7 h-7 bg-[#DDF247] rounded-full flex items-center justify-center shadow-md">
                          <span className="text-xs font-bold text-[#2A1805]">{quantity}</span>
                        </motion.div>}
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-zinc-800 mb-2 line-clamp-2 min-h-[2.5rem]">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg font-bold text-[#2A1805]">${product.price}</span>
                        <span className="text-xs text-zinc-500">or</span>
                        <span className="text-sm font-semibold text-[#005C4B]">{product.points}pts</span>
                      </div>

                      {/* Add to Cart / Quantity Controls */}
                      <AnimatePresence mode="wait">
                        {!hasInCart ? <motion.button key="add-button" initial={{
                      opacity: 0
                    }} animate={{
                      opacity: 1
                    }} exit={{
                      opacity: 0
                    }} onClick={() => addToCart(product.id)} className="w-full py-2.5 bg-[#005C4B] text-white rounded-xl font-semibold text-sm hover:bg-[#004a3d] transition-colors flex items-center justify-center gap-2" whileTap={{
                      scale: 0.95
                    }}>
                            <Plus size={16} />
                            Add to Cart
                          </motion.button> : <motion.div key="quantity-controls" initial={{
                      opacity: 0
                    }} animate={{
                      opacity: 1
                    }} exit={{
                      opacity: 0
                    }} className="flex items-center gap-2">
                            <motion.button onClick={() => removeFromCart(product.id)} className="flex-1 py-2.5 bg-zinc-100 text-zinc-700 rounded-xl font-semibold hover:bg-zinc-200 transition-colors flex items-center justify-center" whileTap={{
                        scale: 0.95
                      }}>
                              <Minus size={16} />
                            </motion.button>
                            
                            <div className="w-12 h-10 bg-[#DDF247] rounded-xl flex items-center justify-center">
                              <span className="text-lg font-bold text-[#2A1805]">{quantity}</span>
                            </div>
                            
                            <motion.button onClick={() => addToCart(product.id)} className="flex-1 py-2.5 bg-[#005C4B] text-white rounded-xl font-semibold hover:bg-[#004a3d] transition-colors flex items-center justify-center" whileTap={{
                        scale: 0.95
                      }}>
                              <Plus size={16} />
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
        }} className="text-center py-16">
              <div className="w-24 h-24 bg-zinc-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Package className="text-zinc-400" size={48} />
              </div>
              <p className="text-zinc-500 font-medium">No products in this category</p>
            </motion.div>}
        </div>
      </div>

      {/* Floating Bottom Navbar Container */}
      <div className="absolute bottom-8 left-0 right-0 px-6 z-50 flex justify-center pointer-events-none">
        <nav className="bg-white p-2.5 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center gap-2 pointer-events-auto max-w-md w-full justify-between">
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
            if (item.id === 'scan' && onNavigateToScan) {
              onNavigateToScan();
            }
            if (item.id === 'profile' && onNavigateToProfile) {
              onNavigateToProfile();
            }
          }} className={cn("relative flex items-center justify-center rounded-[2rem] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer -webkit-tap-highlight-color-transparent outline-none", isActive ? "flex-grow px-6 py-3 bg-[#2A1805]" : "w-12 h-12 hover:bg-zinc-100")} layout transition={{
            type: "spring",
            stiffness: 500,
            damping: 35
          }}>
                {/* Active State Content */}
                <AnimatePresence mode="wait">
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
              }}>
                      <item.icon size={20} className="text-white shrink-0" strokeWidth={2.5} />
                      <motion.span className="text-white font-semibold text-sm tracking-wide" initial={{
                  opacity: 0,
                  x: -10
                }} animate={{
                  opacity: 1,
                  x: 0
                }} transition={{
                  delay: 0.15
                }}>
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
            }}>
                    <item.icon size={24} className="text-zinc-400" strokeWidth={2} />
                  </motion.div>}
              </motion.button>;
        })}
        </nav>
      </div>
    </div>;
};
export default ShopPage;