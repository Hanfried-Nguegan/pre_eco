import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, MapPin, ScanLine, ShoppingBag, User } from 'lucide-react';
import { cn } from '../../lib/utils';
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
export const BottomNavbar = () => {
  const [activeTab, setActiveTab] = useState('home');

  // @return
  return <div className="relative w-full h-full min-h-[600px] bg-zinc-50 flex flex-col font-sans overflow-hidden" data-magicpath-id="0" data-magicpath-path="BottomNavbar.tsx">
      {/* Mock Content Background to Simulate the App Context */}
      <div className="flex-1 p-6 overflow-y-auto pb-32 space-y-6" data-magicpath-id="1" data-magicpath-path="BottomNavbar.tsx">
        <header className="flex justify-between items-center pt-4" data-magicpath-id="2" data-magicpath-path="BottomNavbar.tsx">
          <h1 className="text-xl font-medium text-zinc-800" data-magicpath-id="3" data-magicpath-path="BottomNavbar.tsx">Hello Djaniny</h1>
          <button className="p-3 bg-white rounded-full shadow-sm hover:bg-zinc-50 transition-colors cursor-pointer" data-magicpath-id="4" data-magicpath-path="BottomNavbar.tsx">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-800" data-magicpath-id="5" data-magicpath-path="BottomNavbar.tsx">
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" data-magicpath-id="6" data-magicpath-path="BottomNavbar.tsx" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" data-magicpath-id="7" data-magicpath-path="BottomNavbar.tsx" />
            </svg>
          </button>
        </header>

        {/* Stats Card */}
        <div className="bg-[#DDF247] rounded-[2.5rem] p-8 relative overflow-hidden min-h-[200px]" data-magicpath-id="8" data-magicpath-path="BottomNavbar.tsx">
          <div className="relative z-10" data-magicpath-id="9" data-magicpath-path="BottomNavbar.tsx">
            <div className="text-5xl font-semibold text-[#2A1805] mb-2" data-magicpath-id="10" data-magicpath-path="BottomNavbar.tsx">230g</div>
            <div className="text-[#2A1805]/80 font-medium" data-magicpath-id="11" data-magicpath-path="BottomNavbar.tsx">saved CO2</div>
          </div>
          
          {/* Decorative Flower/Sun element */}
          <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-48 h-48 pointer-events-none" data-magicpath-id="12" data-magicpath-path="BottomNavbar.tsx">
             <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl" data-magicpath-id="13" data-magicpath-path="BottomNavbar.tsx">
               <path fill="#FFFFFF" d="M100 10c10 0 15 20 20 25s20-10 25-5 5 25 10 30 25 0 28 10-10 20-5 25 25 10 25 20-20 15-20 25 10 20 0 25-20 5-25 10-5 25-10 28-20-10-25-5-15 20-25 20-15-20-25-20 5-25-10-30-25 0-28-10 10-20 5-25-25-10-25-20 20-15 20-25-10-20 0-25 20-5 25-10 5-25 10-28 20 10 25 5Z" data-magicpath-id="14" data-magicpath-path="BottomNavbar.tsx" />
               <circle cx="100" cy="100" r="25" fill="#FFD700" data-magicpath-id="15" data-magicpath-path="BottomNavbar.tsx" />
               <path d="M90 95a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm20 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" fill="#2A1805" data-magicpath-id="16" data-magicpath-path="BottomNavbar.tsx" />
               <path d="M95 105q5 5 10 0" stroke="#2A1805" strokeWidth="2" fill="none" data-magicpath-id="17" data-magicpath-path="BottomNavbar.tsx" />
               <path d="M100 125 C 100 125, 80 160, 60 150" stroke="#005C4B" strokeWidth="15" strokeLinecap="round" fill="none" data-magicpath-id="18" data-magicpath-path="BottomNavbar.tsx" />
               <path d="M100 125 C 100 125, 120 160, 140 150" stroke="#005C4B" strokeWidth="15" strokeLinecap="round" fill="none" data-magicpath-id="19" data-magicpath-path="BottomNavbar.tsx" />
             </svg>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-2 gap-4" data-magicpath-id="20" data-magicpath-path="BottomNavbar.tsx">
          {/* Courier Card */}
          <div className="bg-[#E0E0FF] rounded-[2.5rem] p-6 aspect-[4/5] flex flex-col justify-between relative overflow-hidden group cursor-pointer transition-transform hover:scale-[1.02]" data-magicpath-id="21" data-magicpath-path="BottomNavbar.tsx">
             <div className="relative z-10" data-magicpath-id="22" data-magicpath-path="BottomNavbar.tsx">
                <h3 className="text-lg font-semibold text-[#1a1a3a] leading-tight" data-magicpath-id="23" data-magicpath-path="BottomNavbar.tsx">Order a courier<br data-magicpath-id="24" data-magicpath-path="BottomNavbar.tsx" />to your home</h3>
             </div>
             <div className="absolute bottom-4 right-4 w-24 h-24 opacity-80" data-magicpath-id="25" data-magicpath-path="BottomNavbar.tsx">
                {/* Abstract scooter illustration placeholder */}
                <div className="w-full h-full bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 absolute animate-pulse" data-magicpath-id="26" data-magicpath-path="BottomNavbar.tsx"></div>
                <ScanLine className="w-full h-full text-[#1a1a3a] relative z-10 opacity-20" data-magicpath-id="27" data-magicpath-path="BottomNavbar.tsx" />
             </div>
          </div>

          <div className="flex flex-col gap-4" data-magicpath-id="28" data-magicpath-path="BottomNavbar.tsx">
            {/* Points Card */}
            <div className="bg-[#DDF247] rounded-[2.5rem] p-6 flex items-center justify-center relative" data-magicpath-id="29" data-magicpath-path="BottomNavbar.tsx">
               <div className="text-center" data-magicpath-id="30" data-magicpath-path="BottomNavbar.tsx">
                  <span className="text-2xl font-bold text-[#2A1805]" data-magicpath-id="31" data-magicpath-path="BottomNavbar.tsx">216</span>
                  <span className="text-sm font-medium text-[#2A1805] ml-1" data-magicpath-id="32" data-magicpath-path="BottomNavbar.tsx">points</span>
               </div>
               {/* Connector visual trick */}
               <div className="absolute -top-4 right-8 w-8 h-8 bg-[#DDF247] rounded-full" data-magicpath-id="33" data-magicpath-path="BottomNavbar.tsx" /> 
            </div>

            {/* Sorting Guide Card */}
            <div className="bg-[#005C4B] rounded-[2.5rem] p-6 flex-1 flex flex-col justify-end relative overflow-hidden group cursor-pointer transition-transform hover:scale-[1.02]" data-magicpath-id="34" data-magicpath-path="BottomNavbar.tsx">
               <div className="absolute top-4 right-4 opacity-10" data-magicpath-id="35" data-magicpath-path="BottomNavbar.tsx">
                  <div className="w-16 h-16 bg-white rotate-45 transform" data-magicpath-id="36" data-magicpath-path="BottomNavbar.tsx"></div>
               </div>
               <h3 className="text-white font-medium leading-tight mt-8" data-magicpath-id="37" data-magicpath-path="BottomNavbar.tsx">Sorting<br data-magicpath-id="38" data-magicpath-path="BottomNavbar.tsx" />guide</h3>
            </div>
          </div>
        </div>

        {/* Activities Section Header */}
        <div className="pt-4" data-magicpath-id="39" data-magicpath-path="BottomNavbar.tsx">
           <h2 className="text-sm font-bold text-zinc-500 tracking-wider uppercase mb-4" data-magicpath-id="40" data-magicpath-path="BottomNavbar.tsx">Activities</h2>
           <div className="flex overflow-x-auto gap-4 pb-4 -mx-6 px-6 scrollbar-hide" data-magicpath-id="41" data-magicpath-path="BottomNavbar.tsx">
              {[1, 2].map(i => <div key={i} className="min-w-[280px] h-48 bg-white rounded-[2rem] overflow-hidden relative shadow-sm" data-magicpath-id="42" data-magicpath-path="BottomNavbar.tsx">
                   <div className="absolute inset-0 bg-zinc-200 animate-pulse" data-magicpath-id="43" data-magicpath-path="BottomNavbar.tsx" />
                   <img src={`https://picsum.photos/seed/${i + 50}/400/300`} alt="Activity" className="w-full h-full object-cover opacity-90" data-magicpath-id="44" data-magicpath-path="BottomNavbar.tsx" />
                   <div className="absolute top-6 left-0 bg-white py-2 px-6 rounded-r-full shadow-sm" data-magicpath-id="45" data-magicpath-path="BottomNavbar.tsx">
                      <span className="font-medium text-zinc-800" data-magicpath-id="46" data-magicpath-path="BottomNavbar.tsx">Become a volunteer</span>
                   </div>
                </div>)}
           </div>
        </div>
      </div>

      {/* Floating Bottom Navbar Container */}
      <div className="absolute bottom-8 left-0 right-0 px-6 z-50 flex justify-center pointer-events-none" data-magicpath-id="47" data-magicpath-path="BottomNavbar.tsx">
        <nav className="bg-white p-2.5 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center gap-2 pointer-events-auto max-w-md w-full justify-between" data-magicpath-id="48" data-magicpath-path="BottomNavbar.tsx">
          {navItems.map(item => {
          const isActive = activeTab === item.id;
          return <motion.button key={item.id} onClick={() => setActiveTab(item.id)} className={cn("relative flex items-center justify-center rounded-[2rem] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer -webkit-tap-highlight-color-transparent outline-none", isActive ? "flex-grow px-6 py-3 bg-[#2A1805]" : "w-12 h-12 hover:bg-zinc-100")} layout transition={{
            type: "spring",
            stiffness: 500,
            damping: 35
          }} data-magicpath-id="49" data-magicpath-path="BottomNavbar.tsx">
                {/* Active State Content */}
                <AnimatePresence mode="wait" data-magicpath-id="50" data-magicpath-path="BottomNavbar.tsx">
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
              }} data-magicpath-id="51" data-magicpath-path="BottomNavbar.tsx">
                      <item.icon size={20} className="text-white shrink-0" strokeWidth={2.5} data-magicpath-id="52" data-magicpath-path="BottomNavbar.tsx" />
                      <motion.span className="text-white font-semibold text-sm tracking-wide" initial={{
                  opacity: 0,
                  x: -10
                }} animate={{
                  opacity: 1,
                  x: 0
                }} transition={{
                  delay: 0.15
                }} data-magicpath-id="53" data-magicpath-path="BottomNavbar.tsx">
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
            }} data-magicpath-id="54" data-magicpath-path="BottomNavbar.tsx">
                    <item.icon size={24} className="text-zinc-400" strokeWidth={2} data-magicpath-id="55" data-magicpath-path="BottomNavbar.tsx" />
                  </motion.div>}
              </motion.button>;
        })}
        </nav>
      </div>
    </div>;
};