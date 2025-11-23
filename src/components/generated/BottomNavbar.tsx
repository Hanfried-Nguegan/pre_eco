import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, MapPin, ScanLine, ShoppingBag, User, ShoppingCart } from 'lucide-react';
import { cn } from '../../lib/utils';
import Image from "next/image";

type NavItem = {
  id: string;
  label: string;
  icon: React.ElementType;
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

// @component: BottomNavbar
export const BottomNavbar = ({
  onNavigateToSchedule,
  onNavigateToMap,
  onNavigateToScan,
  onNavigateToDonations,
  onNavigateToShop,
  onNavigateToListing,
  onNavigateToCart,
  onNavigateToProfile
}: {
  onNavigateToSchedule?: () => void;
  onNavigateToMap?: () => void;
  onNavigateToScan?: () => void;
  onNavigateToDonations?: () => void;
  onNavigateToShop?: () => void;
  onNavigateToListing?: () => void;
  onNavigateToCart?: () => void;
  onNavigateToProfile?: () => void;
}) => {
  const [activeTab, setActiveTab] = useState('home');

  return <div className="relative w-full h-full min-h-[600px] bg-zinc-50 flex flex-col font-sans overflow-hidden">
      <div className="flex-1 p-6 overflow-y-auto pb-32 space-y-6">
        <header className="flex justify-between items-center pt-4">
          <h1 className="text-xl font-medium text-zinc-800">Hello Markus</h1>
          <div className="flex items-center gap-2">
            <button onClick={onNavigateToCart} className="p-3 bg-white rounded-full shadow-sm hover:bg-zinc-50 transition-colors cursor-pointer">
              <ShoppingCart size={20} className="text-zinc-800" />
            </button>
            <button className="p-3 bg-white rounded-full shadow-sm hover:bg-zinc-50 transition-colors cursor-pointer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-800">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
              </svg>
            </button>
          </div>
        </header>

        <div className="bg-[#DDF247] rounded-[2.5rem] p-8 relative overflow-hidden shadow-2xl border min-h-[200px]">
          <div className="relative z-10">
            <div className="text-5xl font-semibold text-[#2A1805] mb-2">230g</div>
            <div className="text-[#2A1805]/80 font-medium">saved CO2</div>
          </div>
          
          <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-48 h-48 pointer-events-none">
            <img src = "/images/hugit.png" alt='CO2 Mascot' width={192} height={192} className="w-full h-full object-contain" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div onClick={onNavigateToSchedule} className="bg-[#E0E0FF] rounded-[2.5rem] p-6 aspect-[4/5] flex flex-col shadow-2xl justify-between relative overflow-hidden group cursor-pointer transition-transform hover:scale-[1.02]">
             <div className="relative z-10">
                <h3 className="text-lg font-semibold text-[#1a1a3a] leading-tight">Order a courier<br />to your home</h3>
             </div>
             <div className="absolute bottom-0 right-0 w-45 h-45">
                <img src = "/images/flower illustration.png" alt='Courier Illustration' width={180} height={180} className="w-full h-full object-contain pointer-events-none" />
             </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-[#DDF247] rounded-[2.5rem] shadow-2xl p-6 flex items-center justify-center relative">
               <div className="text-center">
                  <span className="text-2xl font-bold text-[#2A1805]">216</span>
                  <span className="text-sm font-medium text-[#2A1805] ml-1">points</span>
               </div>
               <div className="absolute -top-4 right-8 w-8 h-8 bg-[#DDF247] rounded-full" /> 
            </div>

            <div className="bg-[#005C4B] rounded-[2.5rem] p-6 flex-1 flex flex-col shadow-2xl justify-end relative overflow-hidden group cursor-pointer transition-transform hover:scale-[1.02]">
               <div className="absolute top-4 right-4 opacity-10">
                  <div className="w-16 h-16 bg-white rotate-45 transform"></div>
               </div>
               <h3 className="text-white font-medium leading-tight mt-8">Sorting<br />guide</h3>
            </div>
          </div>
        </div>

        <div className="pt-4">
           <h2 className="text-sm font-bold text-zinc-500 tracking-wider uppercase mb-4">Activities</h2>
           <div className="flex overflow-x-auto gap-4 pb-4 -mx-6 px-6 scrollbar-hide">
              {[1, 2].map(i => <div key={i} onClick={i === 1 ? onNavigateToDonations : i === 2 ? onNavigateToListing : undefined} className={cn("min-w-[280px] h-48 bg-white rounded-[2rem] overflow-hidden relative shadow-sm", (i === 1 || i === 2) && "cursor-pointer transition-transform hover:scale-[1.02]")}>
                   <div className="absolute inset-0 bg-zinc-200 animate-pulse" />
                   <img src={`https://picsum.photos/seed/${i + 50}/400/300`} alt="Activity" className="w-full h-full object-cover opacity-90" />
                   <div className="absolute top-6 left-0 bg-white py-2 px-6 rounded-r-full shadow-sm">
                      <span className="font-medium text-zinc-800">{i === 1 ? "Become a volunteer" : "Bring your own"}</span>
                   </div>
                </div>)}
           </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 px-6 z-50 flex justify-center pointer-events-none">
        <nav className="bg-white p-2.5 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center gap-2 pointer-events-auto max-w-md w-full justify-between">
          {navItems.map(item => {
          const isActive = activeTab === item.id;
          return <motion.button key={item.id} onClick={() => {
            setActiveTab(item.id);
            if (item.id === 'map' && onNavigateToMap) {
              onNavigateToMap();
            }
            if (item.id === 'scan' && onNavigateToScan) {
              onNavigateToScan();
            }
            if (item.id === 'shop' && onNavigateToShop) {
              onNavigateToShop();
            }
            if (item.id === 'profile' && onNavigateToProfile) {
              onNavigateToProfile();
            }
          }} className={cn("relative flex items-center justify-center rounded-[2rem] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer -webkit-tap-highlight-color-transparent outline-none", isActive ? "flex-grow px-6 py-3 bg-[#2A1805]" : "w-12 h-12 hover:bg-zinc-100")} layout transition={{
            type: "spring",
            stiffness: 500,
            damping: 35
          }}>
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