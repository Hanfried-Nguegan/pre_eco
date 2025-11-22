"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, MapPin, ScanLine, ShoppingBag, User, Heart, TrendingUp, Users, Leaf, Calendar, Filter, ChevronDown, Package, Award, ChevronLeft } from 'lucide-react';
import { cn } from '../../lib/utils';
import { CharityDetailModal } from './CharityDetailModal';
type NavItem = {
  id: string;
  label: string;
  icon: React.ElementType;
};
type CharityCategory = 'All' | 'Education' | 'Healthcare' | 'Environment' | 'Food Security' | 'Disaster Relief' | 'Animal Welfare';
type Charity = {
  id: string;
  name: string;
  description: string;
  category: CharityCategory;
  logo: string;
  rating: number;
  itemsReceived: number;
  beneficiaries: number;
  trustScore: number;
  location: string;
};
type DonationHistory = {
  id: string;
  date: string;
  items: string[];
  charityName: string;
  impactPoints: number;
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
const charityCategories: CharityCategory[] = ['All', 'Education', 'Healthcare', 'Environment', 'Food Security', 'Disaster Relief', 'Animal Welfare'];

// Mock data
const mockCharities: Charity[] = [{
  id: '1',
  name: 'Green Earth Foundation',
  description: 'Protecting our planet through sustainable recycling and environmental education programs.',
  category: 'Environment',
  logo: '🌍',
  rating: 4.8,
  itemsReceived: 12500,
  beneficiaries: 3400,
  trustScore: 95,
  location: 'New York, NY'
}, {
  id: '2',
  name: 'Hope for Children',
  description: 'Providing educational materials and resources to underprivileged children worldwide.',
  category: 'Education',
  logo: '📚',
  rating: 4.9,
  itemsReceived: 8900,
  beneficiaries: 5600,
  trustScore: 98,
  location: 'Boston, MA'
}, {
  id: '3',
  name: 'Medical Aid International',
  description: 'Delivering essential healthcare supplies to communities in need.',
  category: 'Healthcare',
  logo: '🏥',
  rating: 4.7,
  itemsReceived: 15600,
  beneficiaries: 8900,
  trustScore: 92,
  location: 'Chicago, IL'
}, {
  id: '4',
  name: 'Feed the Future',
  description: 'Fighting hunger through food distribution and sustainable agriculture programs.',
  category: 'Food Security',
  logo: '🍎',
  rating: 4.6,
  itemsReceived: 23400,
  beneficiaries: 12300,
  trustScore: 90,
  location: 'San Francisco, CA'
}, {
  id: '5',
  name: 'Disaster Relief Network',
  description: 'Rapid response team providing emergency supplies during natural disasters.',
  category: 'Disaster Relief',
  logo: '🚨',
  rating: 4.9,
  itemsReceived: 18700,
  beneficiaries: 15600,
  trustScore: 97,
  location: 'Miami, FL'
}, {
  id: '6',
  name: 'Animal Sanctuary Alliance',
  description: 'Rescuing and caring for abandoned animals while promoting adoption.',
  category: 'Animal Welfare',
  logo: '🐾',
  rating: 4.8,
  itemsReceived: 6700,
  beneficiaries: 2300,
  trustScore: 94,
  location: 'Portland, OR'
}];
const mockDonationHistory: DonationHistory[] = [{
  id: '1',
  date: '2024-01-15',
  items: ['Plastic bottles', 'Paper boxes', 'Glass jars'],
  charityName: 'Green Earth Foundation',
  impactPoints: 45
}, {
  id: '2',
  date: '2024-01-10',
  items: ['Books', 'School supplies'],
  charityName: 'Hope for Children',
  impactPoints: 60
}, {
  id: '3',
  date: '2024-01-05',
  items: ['Clothing', 'Shoes'],
  charityName: 'Animal Sanctuary Alliance',
  impactPoints: 38
}, {
  id: '4',
  date: '2023-12-28',
  items: ['Plastic containers', 'Metal cans'],
  charityName: 'Green Earth Foundation',
  impactPoints: 52
}];
export const DonationsPage = ({
  onNavigateToHome
}: {
  onNavigateToHome?: () => void;
} = {}) => {
  const [activeTab, setActiveTab] = useState('shop');
  const [activeCategory, setActiveCategory] = useState<CharityCategory>('All');
  const [selectedCharity, setSelectedCharity] = useState<Charity | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const filteredCharities = activeCategory === 'All' ? mockCharities : mockCharities.filter(c => c.category === activeCategory);

  // Calculate total impact stats
  const totalItemsDonated = mockDonationHistory.reduce((sum, donation) => sum + donation.items.length, 0);
  const totalImpactPoints = mockDonationHistory.reduce((sum, donation) => sum + donation.impactPoints, 0);
  const totalWeightKg = Math.floor(totalItemsDonated * 2.3); // Mock calculation
  const livesImpacted = Math.floor(totalImpactPoints * 1.2);
  const handleCharityClick = (charity: Charity) => {
    setSelectedCharity(charity);
    setIsDetailModalOpen(true);
  };
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  return <div className="relative w-full h-full min-h-screen bg-zinc-50 flex flex-col font-sans overflow-hidden">
      {/* Header */}
      <header className="bg-white px-6 py-6 shadow-sm relative z-20">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={onNavigateToHome} className={cn("p-2.5 rounded-full transition-all", "bg-zinc-100 hover:bg-zinc-200 cursor-pointer")}>
            <ChevronLeft size={24} className="text-zinc-800" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-zinc-800">Donations & Charities</h1>
            <p className="text-sm text-zinc-500 mt-0.5">Make a difference with your recycling</p>
          </div>
        </div>

        {/* Toggle between Impact Stats and History */}
        <div className="flex gap-2">
          <button onClick={() => setShowHistory(false)} className={cn("flex-1 py-3 px-4 rounded-[1.5rem] font-semibold text-sm transition-all", !showHistory ? "bg-[#2A1805] text-white" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200")}>
            Impact Dashboard
          </button>
          <button onClick={() => setShowHistory(true)} className={cn("flex-1 py-3 px-4 rounded-[1.5rem] font-semibold text-sm transition-all", showHistory ? "bg-[#2A1805] text-white" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200")}>
            Donation History
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-32 px-6">
        <AnimatePresence mode="wait">
          {/* Impact Dashboard */}
          {!showHistory && <motion.div key="dashboard" initial={{
          opacity: 0,
          x: -20
        }} animate={{
          opacity: 1,
          x: 0
        }} exit={{
          opacity: 0,
          x: 20
        }} transition={{
          duration: 0.3
        }} className="pt-6 space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.1
            }} className="bg-gradient-to-br from-[#DDF247] to-[#B8E635] rounded-[2rem] p-6 relative overflow-hidden">
                  <div className="relative z-10">
                    <Package size={28} className="text-[#2A1805] mb-3" />
                    <p className="text-sm font-medium text-[#2A1805]/70 mb-1">Items Donated</p>
                    <p className="text-3xl font-bold text-[#2A1805]">{totalItemsDonated}</p>
                  </div>
                  <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/20 rounded-full" />
                </motion.div>

                <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.2
            }} className="bg-gradient-to-br from-[#005C4B] to-[#004a3d] rounded-[2rem] p-6 relative overflow-hidden">
                  <div className="relative z-10">
                    <TrendingUp size={28} className="text-[#DDF247] mb-3" />
                    <p className="text-sm font-medium text-white/70 mb-1">Total Weight</p>
                    <p className="text-3xl font-bold text-white">{totalWeightKg}kg</p>
                  </div>
                  <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full" />
                </motion.div>

                <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.3
            }} className="bg-gradient-to-br from-purple-400 to-purple-500 rounded-[2rem] p-6 relative overflow-hidden">
                  <div className="relative z-10">
                    <Users size={28} className="text-white mb-3" />
                    <p className="text-sm font-medium text-white/80 mb-1">Lives Impacted</p>
                    <p className="text-3xl font-bold text-white">{livesImpacted}</p>
                  </div>
                  <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full" />
                </motion.div>

                <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.4
            }} className="bg-gradient-to-br from-green-400 to-green-500 rounded-[2rem] p-6 relative overflow-hidden">
                  <div className="relative z-10">
                    <Leaf size={28} className="text-white mb-3" />
                    <p className="text-sm font-medium text-white/80 mb-1">CO₂ Saved</p>
                    <p className="text-3xl font-bold text-white">{Math.floor(totalWeightKg * 0.42)}g</p>
                  </div>
                  <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full" />
                </motion.div>
              </div>

              {/* Impact Points Card */}
              <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.5
          }} className="bg-white rounded-[2rem] p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-zinc-800">Your Impact Points</h3>
                    <p className="text-sm text-zinc-500">Keep donating to earn more!</p>
                  </div>
                  <div className="flex items-center gap-2 bg-[#DDF247] px-4 py-2 rounded-full">
                    <Award size={20} className="text-[#2A1805]" />
                    <span className="text-2xl font-bold text-[#2A1805]">{totalImpactPoints}</span>
                  </div>
                </div>
                <div className="h-3 bg-zinc-100 rounded-full overflow-hidden">
                  <motion.div className="h-full bg-gradient-to-r from-[#DDF247] to-[#005C4B]" initial={{
                width: 0
              }} animate={{
                width: `${totalImpactPoints % 100}%`
              }} transition={{
                duration: 1,
                delay: 0.6
              }} />
                </div>
                <p className="text-xs text-zinc-500 mt-2">
                  {100 - totalImpactPoints % 100} points until next reward
                </p>
              </motion.div>
            </motion.div>}

          {/* Donation History */}
          {showHistory && <motion.div key="history" initial={{
          opacity: 0,
          x: 20
        }} animate={{
          opacity: 1,
          x: 0
        }} exit={{
          opacity: 0,
          x: -20
        }} transition={{
          duration: 0.3
        }} className="pt-6 space-y-4">
              {mockDonationHistory.map((donation, index) => <motion.div key={donation.id} initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: index * 0.1
          }} className="bg-white rounded-[2rem] p-5 shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-zinc-800 mb-1">
                        {donation.charityName}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-zinc-500">
                        <Calendar size={12} />
                        <span>{formatDate(donation.date)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-[#DDF247] px-3 py-1.5 rounded-full">
                      <span className="text-sm font-bold text-[#2A1805]">+{donation.impactPoints}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {donation.items.map((item, idx) => <span key={idx} className="px-3 py-1 bg-zinc-100 text-zinc-700 text-xs font-medium rounded-full">
                        {item}
                      </span>)}
                  </div>
                </motion.div>)}
            </motion.div>}
        </AnimatePresence>

        {/* Category Filters */}
        <div className="pt-6 pb-4">
          <h2 className="text-lg font-semibold text-zinc-800 mb-4">Browse Charities</h2>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
            {charityCategories.map(category => {
            const isActive = activeCategory === category;
            const count = category === 'All' ? mockCharities.length : mockCharities.filter(c => c.category === category).length;
            return <motion.button key={category} onClick={() => setActiveCategory(category)} className={cn("px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 shadow-sm", isActive ? "bg-[#005C4B] text-white" : "bg-white text-zinc-700 hover:bg-zinc-50")} whileTap={{
              scale: 0.95
            }}>
                  {category} ({count})
                </motion.button>;
          })}
          </div>
        </div>

        {/* Charities Grid */}
        <div className="space-y-4 pb-6">
          {filteredCharities.map((charity, index) => <motion.div key={charity.id} initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: index * 0.1
        }} onClick={() => handleCharityClick(charity)} className="bg-white rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#DDF247] to-[#B8E635] rounded-2xl flex items-center justify-center text-3xl shrink-0">
                  {charity.logo}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-zinc-800 text-lg leading-tight">
                      {charity.name}
                    </h3>
                    <div className="flex items-center gap-1 bg-[#DDF247] px-2 py-1 rounded-full shrink-0">
                      <span className="text-xs font-bold text-[#2A1805]">★ {charity.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-600 line-clamp-2 mb-2">
                    {charity.description}
                  </p>
                  <span className="inline-block px-3 py-1 bg-[#005C4B]/10 text-[#005C4B] text-xs font-semibold rounded-full">
                    {charity.category}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-zinc-100">
                <div className="text-center">
                  <p className="text-lg font-bold text-[#005C4B]">
                    {charity.itemsReceived.toLocaleString()}
                  </p>
                  <p className="text-xs text-zinc-500">Items Received</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-[#005C4B]">
                    {charity.beneficiaries.toLocaleString()}
                  </p>
                  <p className="text-xs text-zinc-500">Beneficiaries</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-[#005C4B]">{charity.trustScore}%</p>
                  <p className="text-xs text-zinc-500">Trust Score</p>
                </div>
              </div>

              {/* Donate Button */}
              <button className="w-full mt-4 py-3 px-4 bg-gradient-to-r from-[#DDF247] to-[#B8E635] text-[#2A1805] rounded-[1.5rem] font-semibold text-sm hover:shadow-md transition-all">
                Donate Items
              </button>
            </motion.div>)}
        </div>
      </div>

      {/* Floating Bottom Navbar */}
      <div className="absolute bottom-8 left-0 right-0 px-6 z-50 flex justify-center pointer-events-none">
        <nav className="bg-white p-2.5 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center gap-2 pointer-events-auto max-w-md w-full justify-between">
          {navItems.map(item => {
          const isActive = activeTab === item.id;
          return <motion.button key={item.id} onClick={() => {
            setActiveTab(item.id);
            if (item.id === 'home' && onNavigateToHome) {
              onNavigateToHome();
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

      {/* Charity Detail Modal */}
      {selectedCharity && <CharityDetailModal charity={selectedCharity} isOpen={isDetailModalOpen} onClose={() => setIsDetailModalOpen(false)} />}
    </div>;
};