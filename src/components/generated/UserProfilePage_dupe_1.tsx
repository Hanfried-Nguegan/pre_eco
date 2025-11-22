"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, MapPin, ScanLine, ShoppingBag, User, ChevronDown, ChevronRight, Settings, Award, Package, Truck, Gift, Heart, Leaf, Users, HelpCircle, Edit2, Mail, Phone, MapPinIcon, Crown, Sparkles, TrendingUp, Calendar, Clock, CheckCircle, XCircle, BarChart3, Share2, LogOut } from 'lucide-react';
import { cn } from '../../lib/utils';
type NavItem = {
  id: string;
  label: string;
  icon: React.ElementType;
};
type LoyaltyTier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
type Order = {
  id: string;
  date: string;
  items: string[];
  total: number;
  status: 'delivered' | 'processing' | 'cancelled';
};
type Listing = {
  id: string;
  title: string;
  price: number;
  views: number;
  status: 'active' | 'sold' | 'expired';
};
type Pickup = {
  id: string;
  date: string;
  time: string;
  items: string[];
  status: 'scheduled' | 'completed' | 'cancelled';
};
type Reward = {
  id: string;
  name: string;
  points: number;
  redeemed: boolean;
  date?: string;
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

// Mock data
const mockOrders: Order[] = [{
  id: 'ORD001',
  date: '2024-01-15',
  items: ['Eco Backpack', 'Green Sneakers'],
  total: 110,
  status: 'delivered'
}, {
  id: 'ORD002',
  date: '2024-01-10',
  items: ['Organic T-Shirt', 'Cork Wallet'],
  total: 58,
  status: 'processing'
}, {
  id: 'ORD003',
  date: '2024-01-05',
  items: ['Wooden Toy Set'],
  total: 28,
  status: 'delivered'
}];
const mockListings: Listing[] = [{
  id: 'LST001',
  title: 'Vintage Leather Jacket',
  price: 85,
  views: 124,
  status: 'active'
}, {
  id: 'LST002',
  title: 'Classic Books Collection',
  price: 45,
  views: 89,
  status: 'sold'
}, {
  id: 'LST003',
  title: 'Retro Camera',
  price: 120,
  views: 56,
  status: 'active'
}];
const mockPickups: Pickup[] = [{
  id: 'PCK001',
  date: '2024-01-20',
  time: '10:00 AM - 12:00 PM',
  items: ['Plastic', 'Paper', 'Glass'],
  status: 'scheduled'
}, {
  id: 'PCK002',
  date: '2024-01-12',
  time: '2:00 PM - 4:00 PM',
  items: ['Organic Waste', 'Packaging'],
  status: 'completed'
}];
const mockRewards: Reward[] = [{
  id: 'RWD001',
  name: '10% Off Next Purchase',
  points: 500,
  redeemed: true,
  date: '2024-01-08'
}, {
  id: 'RWD002',
  name: 'Free Shipping',
  points: 300,
  redeemed: false
}, {
  id: 'RWD003',
  name: 'Eco-Friendly Tote Bag',
  points: 800,
  redeemed: false
}];
export interface UserProfilePageProps {
  onNavigateToHome?: () => void;
  onNavigateToMap?: () => void;
  onNavigateToScan?: () => void;
  onNavigateToShop?: () => void;
}
export const UserProfilePage = ({
  onNavigateToHome,
  onNavigateToMap,
  onNavigateToScan,
  onNavigateToShop
}: UserProfilePageProps = {}) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [currentPoints] = useState(2160);
  const [tier] = useState<LoyaltyTier>('Gold');
  const [nextTierPoints] = useState(3000);

  // Mock user data
  const userData = {
    name: 'Djaniny Rodriguez',
    email: 'djaniny@ecorecycle.com',
    phone: '+1 (555) 123-4567',
    avatar: '👤',
    joinDate: '2023-06-15',
    location: '123 Eco Street, Green District'
  };

  // Calculate stats
  const totalOrders = mockOrders.length;
  const totalListings = mockListings.length;
  const totalPickups = mockPickups.length;
  const itemsRecycled = 45;
  const co2Saved = 12.5;
  const treesEquivalent = 3;

  // Points breakdown by category
  const pointsBreakdown = {
    shopping: 850,
    recycling: 680,
    donations: 430,
    referrals: 200
  };
  const tierProgress = currentPoints / nextTierPoints * 100;
  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };
  const getTierColor = (tier: LoyaltyTier) => {
    switch (tier) {
      case 'Bronze':
        return 'from-orange-400 to-orange-500';
      case 'Silver':
        return 'from-gray-300 to-gray-400';
      case 'Gold':
        return 'from-yellow-400 to-yellow-500';
      case 'Platinum':
        return 'from-purple-400 to-purple-500';
    }
  };
  const getTierIcon = (tier: LoyaltyTier) => {
    switch (tier) {
      case 'Platinum':
        return <Crown size={24} className="text-white" data-magicpath-id="0" data-magicpath-path="UserProfilePage_dupe_1.tsx" />;
      default:
        return <Award size={24} className="text-white" data-magicpath-id="1" data-magicpath-path="UserProfilePage_dupe_1.tsx" />;
    }
  };
  return <div className="relative w-full h-full min-h-screen bg-zinc-50 flex flex-col font-sans overflow-hidden" data-magicpath-id="2" data-magicpath-path="UserProfilePage_dupe_1.tsx">
      {/* Header with Avatar */}
      <header className="bg-gradient-to-br from-blue-400 to-blue-500 px-6 pt-8 pb-20 shadow-sm relative z-20 overflow-hidden" data-magicpath-id="3" data-magicpath-path="UserProfilePage_dupe_1.tsx">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10" data-magicpath-id="4" data-magicpath-path="UserProfilePage_dupe_1.tsx">
          <svg className="w-full h-full" data-magicpath-id="5" data-magicpath-path="UserProfilePage_dupe_1.tsx">
            <pattern id="dots-profile" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse" data-magicpath-id="6" data-magicpath-path="UserProfilePage_dupe_1.tsx">
              <circle cx="20" cy="20" r="2" fill="white" data-magicpath-id="7" data-magicpath-path="UserProfilePage_dupe_1.tsx" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#dots-profile)" data-magicpath-id="8" data-magicpath-path="UserProfilePage_dupe_1.tsx" />
          </svg>
        </div>

        <div className="relative z-10 flex items-center gap-4" data-magicpath-id="9" data-magicpath-path="UserProfilePage_dupe_1.tsx">
          {/* Avatar */}
          <motion.div initial={{
          scale: 0
        }} animate={{
          scale: 1
        }} transition={{
          type: 'spring',
          stiffness: 200
        }} className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center text-4xl shadow-lg" data-magicpath-id="10" data-magicpath-path="UserProfilePage_dupe_1.tsx">
            {userData.avatar}
          </motion.div>

          {/* User Info */}
          <div className="flex-1" data-magicpath-id="11" data-magicpath-path="UserProfilePage_dupe_1.tsx">
            <h1 className="text-2xl font-bold text-white mb-1" data-magicpath-id="12" data-magicpath-path="UserProfilePage_dupe_1.tsx">{userData.name}</h1>
            <p className="text-white/90 text-sm" data-magicpath-id="13" data-magicpath-path="UserProfilePage_dupe_1.tsx">{userData.email}</p>
            <div className="flex items-center gap-2 mt-2" data-magicpath-id="14" data-magicpath-path="UserProfilePage_dupe_1.tsx">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold text-white" data-magicpath-id="15" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                Member since {new Date(userData.joinDate).getFullYear()}
              </span>
            </div>
          </div>

          {/* Settings Icon */}
          <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all" data-magicpath-id="16" data-magicpath-path="UserProfilePage_dupe_1.tsx">
            <Settings size={24} className="text-white" data-magicpath-id="17" data-magicpath-path="UserProfilePage_dupe_1.tsx" />
          </button>
        </div>
      </header>

      {/* Loyalty Tier Card - Overlapping Header */}
      <div className="px-6 -mt-12 relative z-20" data-magicpath-id="18" data-magicpath-path="UserProfilePage_dupe_1.tsx">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.2
      }} className={cn('bg-gradient-to-br rounded-[2.5rem] p-6 shadow-xl relative overflow-hidden', getTierColor(tier))} data-magicpath-id="19" data-magicpath-path="UserProfilePage_dupe_1.tsx">
          <div className="relative z-10" data-magicpath-id="20" data-magicpath-path="UserProfilePage_dupe_1.tsx">
            <div className="flex items-center justify-between mb-4" data-magicpath-id="21" data-magicpath-path="UserProfilePage_dupe_1.tsx">
              <div className="flex items-center gap-3" data-magicpath-id="22" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                {getTierIcon(tier)}
                <div data-magicpath-id="23" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                  <p className="text-white/90 text-sm font-medium" data-magicpath-id="24" data-magicpath-path="UserProfilePage_dupe_1.tsx">Current Tier</p>
                  <p className="text-3xl font-bold text-white" data-magicpath-id="25" data-magicpath-path="UserProfilePage_dupe_1.tsx">{tier}</p>
                </div>
              </div>
              <div className="text-right" data-magicpath-id="26" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                <p className="text-white/90 text-sm font-medium" data-magicpath-id="27" data-magicpath-path="UserProfilePage_dupe_1.tsx">Points</p>
                <p className="text-3xl font-bold text-white" data-magicpath-id="28" data-magicpath-path="UserProfilePage_dupe_1.tsx">{currentPoints.toLocaleString()}</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2" data-magicpath-id="29" data-magicpath-path="UserProfilePage_dupe_1.tsx">
              <div className="flex justify-between items-center" data-magicpath-id="30" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                <p className="text-white/90 text-sm font-medium" data-magicpath-id="31" data-magicpath-path="UserProfilePage_dupe_1.tsx">Progress to Platinum</p>
                <p className="text-white/90 text-sm font-medium" data-magicpath-id="32" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                  {nextTierPoints - currentPoints} pts to go
                </p>
              </div>
              <div className="h-3 bg-white/30 rounded-full overflow-hidden" data-magicpath-id="33" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                <motion.div className="h-full bg-white shadow-lg" initial={{
                width: 0
              }} animate={{
                width: `${tierProgress}%`
              }} transition={{
                duration: 1,
                delay: 0.5
              }} data-magicpath-id="34" data-magicpath-path="UserProfilePage_dupe_1.tsx" />
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/10 rounded-full" data-magicpath-id="35" data-magicpath-path="UserProfilePage_dupe_1.tsx" />
          <div className="absolute -left-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full" data-magicpath-id="36" data-magicpath-path="UserProfilePage_dupe_1.tsx" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-32 px-6 pt-6" data-magicpath-id="37" data-magicpath-path="UserProfilePage_dupe_1.tsx">
        {/* Points Breakdown */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.3
      }} className="bg-white rounded-[2.5rem] p-6 shadow-sm mb-6" data-magicpath-id="38" data-magicpath-path="UserProfilePage_dupe_1.tsx">
          <h3 className="text-lg font-semibold text-zinc-800 mb-4 flex items-center gap-2" data-magicpath-id="39" data-magicpath-path="UserProfilePage_dupe_1.tsx">
            <Sparkles size={20} className="text-[#DDF247]" />
            Points Breakdown
          </h3>
          <div className="space-y-3" data-magicpath-id="40" data-magicpath-path="UserProfilePage_dupe_1.tsx">
            {Object.entries(pointsBreakdown).map(([category, points], index) => {
            const percent = points / currentPoints * 100;
            return <div key={category} data-magicpath-id="41" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                  <div className="flex justify-between items-center mb-1" data-magicpath-id="42" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                    <span className="text-sm font-medium text-zinc-700 capitalize" data-magicpath-id="43" data-magicpath-path="UserProfilePage_dupe_1.tsx">{category}</span>
                    <span className="text-sm font-bold text-[#005C4B]" data-magicpath-id="44" data-magicpath-path="UserProfilePage_dupe_1.tsx">{points} pts</span>
                  </div>
                  <div className="h-2 bg-zinc-100 rounded-full overflow-hidden" data-magicpath-id="45" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                    <motion.div className="h-full bg-gradient-to-r from-[#DDF247] to-[#005C4B]" initial={{
                  width: 0
                }} animate={{
                  width: `${percent}%`
                }} transition={{
                  duration: 0.8,
                  delay: 0.4 + index * 0.1
                }} data-magicpath-id="46" data-magicpath-path="UserProfilePage_dupe_1.tsx" />
                  </div>
                </div>;
          })}
          </div>
        </motion.div>

        {/* Interactive Info Cards */}
        <div className="space-y-4" data-magicpath-id="47" data-magicpath-path="UserProfilePage_dupe_1.tsx">
          {/* My Orders */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.4
        }} className="bg-white rounded-[2rem] overflow-hidden shadow-sm" data-magicpath-id="48" data-magicpath-path="UserProfilePage_dupe_1.tsx">
            <button onClick={() => toggleSection('orders')} className="w-full p-6 flex items-center justify-between hover:bg-zinc-50 transition-colors" data-magicpath-id="49" data-magicpath-path="UserProfilePage_dupe_1.tsx">
              <div className="flex items-center gap-4" data-magicpath-id="50" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                <div className="w-12 h-12 bg-[#E0E0FF] rounded-2xl flex items-center justify-center" data-magicpath-id="51" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                  <Package size={24} className="text-[#005C4B]" data-magicpath-id="52" data-magicpath-path="UserProfilePage_dupe_1.tsx" />
                </div>
                <div className="text-left" data-magicpath-id="53" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                  <h3 className="font-semibold text-zinc-800" data-magicpath-id="54" data-magicpath-path="UserProfilePage_dupe_1.tsx">My Orders</h3>
                  <p className="text-sm text-zinc-500" data-magicpath-id="55" data-magicpath-path="UserProfilePage_dupe_1.tsx">{totalOrders} orders</p>
                </div>
              </div>
              <motion.div animate={{
              rotate: expandedSection === 'orders' ? 180 : 0
            }} transition={{
              duration: 0.3
            }} data-magicpath-id="56" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                <ChevronDown size={24} className="text-zinc-400" data-magicpath-id="57" data-magicpath-path="UserProfilePage_dupe_1.tsx" />
              </motion.div>
            </button>

            <AnimatePresence data-magicpath-id="58" data-magicpath-path="UserProfilePage_dupe_1.tsx">
              {expandedSection === 'orders' && <motion.div initial={{
              height: 0,
              opacity: 0
            }} animate={{
              height: 'auto',
              opacity: 1
            }} exit={{
              height: 0,
              opacity: 0
            }} transition={{
              duration: 0.3
            }} className="overflow-hidden" data-magicpath-id="59" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                  <div className="px-6 pb-6 space-y-3 border-t border-zinc-100" data-magicpath-id="60" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                    {mockOrders.map((order, index) => <motion.div key={order.id} initial={{
                  opacity: 0,
                  x: -20
                }} animate={{
                  opacity: 1,
                  x: 0
                }} transition={{
                  delay: index * 0.1
                }} className="pt-3" data-magicpath-id="61" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                        <div className="flex items-start justify-between mb-2" data-magicpath-id="62" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                          <div data-magicpath-id="63" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                            <p className="font-semibold text-zinc-800 text-sm" data-magicpath-id="64" data-magicpath-path="UserProfilePage_dupe_1.tsx">{order.id}</p>
                            <p className="text-xs text-zinc-500" data-magicpath-id="65" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                              {new Date(order.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                            </p>
                          </div>
                          <div className="flex items-center gap-2" data-magicpath-id="66" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                            {order.status === 'delivered' ? <span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-semibold rounded-full flex items-center gap-1" data-magicpath-id="67" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                                <CheckCircle size={12} data-magicpath-id="68" data-magicpath-path="UserProfilePage_dupe_1.tsx" />
                                Delivered
                              </span> : order.status === 'processing' ? <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full flex items-center gap-1" data-magicpath-id="69" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                                <Clock size={12} data-magicpath-id="70" data-magicpath-path="UserProfilePage_dupe_1.tsx" />
                                Processing
                              </span> : <span className="px-3 py-1 bg-red-50 text-red-600 text-xs font-semibold rounded-full flex items-center gap-1" data-magicpath-id="71" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                                <XCircle size={12} data-magicpath-id="72" data-magicpath-path="UserProfilePage_dupe_1.tsx" />
                                Cancelled
                              </span>}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-2" data-magicpath-id="73" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                          {order.items.map((item, idx) => <span key={idx} className="text-xs text-zinc-600" data-magicpath-id="74" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                              {item}
                              {idx < order.items.length - 1 ? ', ' : ''}
                            </span>)}
                        </div>
                        <p className="text-sm font-bold text-[#2A1805]" data-magicpath-id="75" data-magicpath-path="UserProfilePage_dupe_1.tsx">${order.total}</p>
                      </motion.div>)}
                    <button className="w-full py-3 px-4 bg-[#005C4B] text-white rounded-xl font-semibold text-sm hover:bg-[#004a3d] transition-colors mt-2" data-magicpath-id="76" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                      View All Orders
                    </button>
                  </div>
                </motion.div>}
            </AnimatePresence>
          </motion.div>

          {/* My Listings */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.5
        }} className="bg-white rounded-[2rem] overflow-hidden shadow-sm" data-magicpath-id="77" data-magicpath-path="UserProfilePage_dupe_1.tsx">
            <button onClick={() => toggleSection('listings')} className="w-full p-6 flex items-center justify-between hover:bg-zinc-50 transition-colors" data-magicpath-id="78" data-magicpath-path="UserProfilePage_dupe_1.tsx">
              <div className="flex items-center gap-4" data-magicpath-id="79" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                <div className="w-12 h-12 bg-[#DDF247] rounded-2xl flex items-center justify-center" data-magicpath-id="80" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                  <ShoppingBag size={24} className="text-[#005C4B]" data-magicpath-id="81" data-magicpath-path="UserProfilePage_dupe_1.tsx" />
                </div>
                <div className="text-left" data-magicpath-id="82" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                  <h3 className="font-semibold text-zinc-800" data-magicpath-id="83" data-magicpath-path="UserProfilePage_dupe_1.tsx">My Listings</h3>
                  <p className="text-sm text-zinc-500" data-magicpath-id="84" data-magicpath-path="UserProfilePage_dupe_1.tsx">{totalListings} active listings</p>
                </div>
              </div>
              <motion.div animate={{
              rotate: expandedSection === 'listings' ? 180 : 0
            }} transition={{
              duration: 0.3
            }} data-magicpath-id="85" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                <ChevronDown size={24} className="text-zinc-400" data-magicpath-id="86" data-magicpath-path="UserProfilePage_dupe_1.tsx" />
              </motion.div>
            </button>

            <AnimatePresence data-magicpath-id="87" data-magicpath-path="UserProfilePage_dupe_1.tsx">
              {expandedSection === 'listings' && <motion.div initial={{
              height: 0,
              opacity: 0
            }} animate={{
              height: 'auto',
              opacity: 1
            }} exit={{
              height: 0,
              opacity: 0
            }} transition={{
              duration: 0.3
            }} className="overflow-hidden" data-magicpath-id="88" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                  <div className="px-6 pb-6 space-y-3 border-t border-zinc-100" data-magicpath-id="89" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                    {mockListings.map((listing, index) => <motion.div key={listing.id} initial={{
                  opacity: 0,
                  x: -20
                }} animate={{
                  opacity: 1,
                  x: 0
                }} transition={{
                  delay: index * 0.1
                }} className="pt-3 flex items-center justify-between" data-magicpath-id="90" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                        <div className="flex-1" data-magicpath-id="91" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                          <p className="font-semibold text-zinc-800 text-sm mb-1" data-magicpath-id="92" data-magicpath-path="UserProfilePage_dupe_1.tsx">{listing.title}</p>
                          <div className="flex items-center gap-3" data-magicpath-id="93" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                            <span className="text-sm font-bold text-[#005C4B]" data-magicpath-id="94" data-magicpath-path="UserProfilePage_dupe_1.tsx">${listing.price}</span>
                            <span className="text-xs text-zinc-500 flex items-center gap-1" data-magicpath-id="95" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                              <BarChart3 size={12} data-magicpath-id="96" data-magicpath-path="UserProfilePage_dupe_1.tsx" />
                              {listing.views} views
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2" data-magicpath-id="97" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                          {listing.status === 'active' ? <span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-semibold rounded-full" data-magicpath-id="98" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                              Active
                            </span> : listing.status === 'sold' ? <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full" data-magicpath-id="99" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                              Sold
                            </span> : <span className="px-3 py-1 bg-zinc-100 text-zinc-600 text-xs font-semibold rounded-full" data-magicpath-id="100" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                              Expired
                            </span>}
                          <button className="p-2 hover:bg-zinc-100 rounded-lg transition-colors" data-magicpath-id="101" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                            <Edit2 size={16} className="text-zinc-400" data-magicpath-id="102" data-magicpath-path="UserProfilePage_dupe_1.tsx" />
                          </button>
                        </div>
                      </motion.div>)}
                    <button className="w-full py-3 px-4 bg-[#DDF247] text-[#2A1805] rounded-xl font-semibold text-sm hover:bg-[#B8E635] transition-colors mt-2" data-magicpath-id="103" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                      Create New Listing
                    </button>
                  </div>
                </motion.div>}
            </AnimatePresence>
          </motion.div>

          {/* My Pickups */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.6
        }} className="bg-white rounded-[2rem] overflow-hidden shadow-sm" data-magicpath-id="104" data-magicpath-path="UserProfilePage_dupe_1.tsx">
            <button onClick={() => toggleSection('pickups')} className="w-full p-6 flex items-center justify-between hover:bg-zinc-50 transition-colors" data-magicpath-id="105" data-magicpath-path="UserProfilePage_dupe_1.tsx">
              <div className="flex items-center gap-4" data-magicpath-id="106" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-2xl flex items-center justify-center" data-magicpath-id="107" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                  <Truck size={24} className="text-white" data-magicpath-id="108" data-magicpath-path="UserProfilePage_dupe_1.tsx" />
                </div>
                <div className="text-left" data-magicpath-id="109" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                  <h3 className="font-semibold text-zinc-800" data-magicpath-id="110" data-magicpath-path="UserProfilePage_dupe_1.tsx">My Pickups</h3>
                  <p className="text-sm text-zinc-500" data-magicpath-id="111" data-magicpath-path="UserProfilePage_dupe_1.tsx">{totalPickups} scheduled</p>
                </div>
              </div>
              <motion.div animate={{
              rotate: expandedSection === 'pickups' ? 180 : 0
            }} transition={{
              duration: 0.3
            }} data-magicpath-id="112" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                <ChevronDown size={24} className="text-zinc-400" data-magicpath-id="113" data-magicpath-path="UserProfilePage_dupe_1.tsx" />
              </motion.div>
            </button>

            <AnimatePresence data-magicpath-id="114" data-magicpath-path="UserProfilePage_dupe_1.tsx">
              {expandedSection === 'pickups' && <motion.div initial={{
              height: 0,
              opacity: 0
            }} animate={{
              height: 'auto',
              opacity: 1
            }} exit={{
              height: 0,
              opacity: 0
            }} transition={{
              duration: 0.3
            }} className="overflow-hidden" data-magicpath-id="115" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                  <div className="px-6 pb-6 space-y-3 border-t border-zinc-100" data-magicpath-id="116" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                    {mockPickups.map((pickup, index) => <motion.div key={pickup.id} initial={{
                  opacity: 0,
                  x: -20
                }} animate={{
                  opacity: 1,
                  x: 0
                }} transition={{
                  delay: index * 0.1
                }} className="pt-3" data-magicpath-id="117" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                        <div className="flex items-start justify-between mb-2" data-magicpath-id="118" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                          <div data-magicpath-id="119" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                            <p className="font-semibold text-zinc-800 text-sm" data-magicpath-id="120" data-magicpath-path="UserProfilePage_dupe_1.tsx">{pickup.date}</p>
                            <p className="text-xs text-zinc-500" data-magicpath-id="121" data-magicpath-path="UserProfilePage_dupe_1.tsx">{pickup.time}</p>
                          </div>
                          {pickup.status === 'scheduled' ? <span className="px-3 py-1 bg-[#DDF247] text-[#2A1805] text-xs font-semibold rounded-full" data-magicpath-id="122" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                              Scheduled
                            </span> : pickup.status === 'completed' ? <span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-semibold rounded-full" data-magicpath-id="123" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                              Completed
                            </span> : <span className="px-3 py-1 bg-red-50 text-red-600 text-xs font-semibold rounded-full" data-magicpath-id="124" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                              Cancelled
                            </span>}
                        </div>
                        <div className="flex flex-wrap gap-2" data-magicpath-id="125" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                          {pickup.items.map((item, idx) => <span key={idx} className="px-3 py-1 bg-zinc-100 text-zinc-700 text-xs font-medium rounded-full" data-magicpath-id="126" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                              {item}
                            </span>)}
                        </div>
                      </motion.div>)}
                    <button className="w-full py-3 px-4 bg-gradient-to-r from-[#DDF247] to-[#B8E635] text-[#2A1805] rounded-xl font-semibold text-sm hover:shadow-md transition-all mt-2" data-magicpath-id="127" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                      Schedule New Pickup
                    </button>
                  </div>
                </motion.div>}
            </AnimatePresence>
          </motion.div>

          {/* My Rewards */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.7
        }} className="bg-white rounded-[2rem] overflow-hidden shadow-sm" data-magicpath-id="128" data-magicpath-path="UserProfilePage_dupe_1.tsx">
            <button onClick={() => toggleSection('rewards')} className="w-full p-6 flex items-center justify-between hover:bg-zinc-50 transition-colors" data-magicpath-id="129" data-magicpath-path="UserProfilePage_dupe_1.tsx">
              <div className="flex items-center gap-4" data-magicpath-id="130" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-2xl flex items-center justify-center" data-magicpath-id="131" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                  <Gift size={24} className="text-white" data-magicpath-id="132" data-magicpath-path="UserProfilePage_dupe_1.tsx" />
                </div>
                <div className="text-left" data-magicpath-id="133" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                  <h3 className="font-semibold text-zinc-800" data-magicpath-id="134" data-magicpath-path="UserProfilePage_dupe_1.tsx">My Rewards</h3>
                  <p className="text-sm text-zinc-500" data-magicpath-id="135" data-magicpath-path="UserProfilePage_dupe_1.tsx">{mockRewards.filter(r => !r.redeemed).length} available</p>
                </div>
              </div>
              <motion.div animate={{
              rotate: expandedSection === 'rewards' ? 180 : 0
            }} transition={{
              duration: 0.3
            }} data-magicpath-id="136" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                <ChevronDown size={24} className="text-zinc-400" data-magicpath-id="137" data-magicpath-path="UserProfilePage_dupe_1.tsx" />
              </motion.div>
            </button>

            <AnimatePresence data-magicpath-id="138" data-magicpath-path="UserProfilePage_dupe_1.tsx">
              {expandedSection === 'rewards' && <motion.div initial={{
              height: 0,
              opacity: 0
            }} animate={{
              height: 'auto',
              opacity: 1
            }} exit={{
              height: 0,
              opacity: 0
            }} transition={{
              duration: 0.3
            }} className="overflow-hidden" data-magicpath-id="139" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                  <div className="px-6 pb-6 space-y-3 border-t border-zinc-100" data-magicpath-id="140" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                    {mockRewards.map((reward, index) => <motion.div key={reward.id} initial={{
                  opacity: 0,
                  x: -20
                }} animate={{
                  opacity: 1,
                  x: 0
                }} transition={{
                  delay: index * 0.1
                }} className={cn('pt-3 p-4 rounded-xl', reward.redeemed ? 'bg-zinc-50' : 'bg-gradient-to-r from-purple-50 to-pink-50')} data-magicpath-id="141" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                        <div className="flex items-center justify-between mb-2" data-magicpath-id="142" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                          <div className="flex-1" data-magicpath-id="143" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                            <p className={cn('font-semibold text-sm mb-1', reward.redeemed ? 'text-zinc-500' : 'text-zinc-800')} data-magicpath-id="144" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                              {reward.name}
                            </p>
                            <div className="flex items-center gap-2" data-magicpath-id="145" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                              <span className={cn('text-xs font-bold', reward.redeemed ? 'text-zinc-400' : 'text-purple-600')} data-magicpath-id="146" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                                {reward.points} points
                              </span>
                              {reward.redeemed && reward.date && <span className="text-xs text-zinc-400" data-magicpath-id="147" data-magicpath-path="UserProfilePage_dupe_1.tsx">• Redeemed {reward.date}</span>}
                            </div>
                          </div>
                          {reward.redeemed ? <CheckCircle size={20} className="text-green-500" data-magicpath-id="148" data-magicpath-path="UserProfilePage_dupe_1.tsx" /> : <button disabled={currentPoints < reward.points} className={cn('px-4 py-2 rounded-lg text-xs font-semibold transition-colors', currentPoints >= reward.points ? 'bg-purple-500 text-white hover:bg-purple-600' : 'bg-zinc-200 text-zinc-400 cursor-not-allowed')} data-magicpath-id="149" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                              Redeem
                            </button>}
                        </div>
                      </motion.div>)}
                  </div>
                </motion.div>}
            </AnimatePresence>
          </motion.div>

          {/* Environmental Impact */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.8
        }} className="bg-gradient-to-br from-green-400 to-green-500 rounded-[2.5rem] p-6 shadow-sm relative overflow-hidden" data-magicpath-id="150" data-magicpath-path="UserProfilePage_dupe_1.tsx">
            <div className="relative z-10" data-magicpath-id="151" data-magicpath-path="UserProfilePage_dupe_1.tsx">
              <div className="flex items-center gap-2 mb-4" data-magicpath-id="152" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                <Leaf size={24} className="text-white" data-magicpath-id="153" data-magicpath-path="UserProfilePage_dupe_1.tsx" />
                <h3 className="text-lg font-semibold text-white" data-magicpath-id="154" data-magicpath-path="UserProfilePage_dupe_1.tsx">Environmental Impact</h3>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4" data-magicpath-id="155" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                <div className="text-center" data-magicpath-id="156" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                  <p className="text-3xl font-bold text-white mb-1" data-magicpath-id="157" data-magicpath-path="UserProfilePage_dupe_1.tsx">{itemsRecycled}</p>
                  <p className="text-xs text-white/80" data-magicpath-id="158" data-magicpath-path="UserProfilePage_dupe_1.tsx">Items Recycled</p>
                </div>
                <div className="text-center" data-magicpath-id="159" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                  <p className="text-3xl font-bold text-white mb-1" data-magicpath-id="160" data-magicpath-path="UserProfilePage_dupe_1.tsx">{co2Saved}kg</p>
                  <p className="text-xs text-white/80" data-magicpath-id="161" data-magicpath-path="UserProfilePage_dupe_1.tsx">CO₂ Saved</p>
                </div>
                <div className="text-center" data-magicpath-id="162" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                  <p className="text-3xl font-bold text-white mb-1" data-magicpath-id="163" data-magicpath-path="UserProfilePage_dupe_1.tsx">{treesEquivalent}</p>
                  <p className="text-xs text-white/80" data-magicpath-id="164" data-magicpath-path="UserProfilePage_dupe_1.tsx">Trees Saved</p>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4" data-magicpath-id="165" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                <p className="text-sm text-white font-medium" data-magicpath-id="166" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                  🌱 Your recycling efforts have saved the equivalent of planting {treesEquivalent} trees! Keep up the great work!
                </p>
              </div>
            </div>

            <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full" data-magicpath-id="167" data-magicpath-path="UserProfilePage_dupe_1.tsx" />
          </motion.div>

          {/* Account Settings & Support */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.9
        }} className="space-y-3" data-magicpath-id="168" data-magicpath-path="UserProfilePage_dupe_1.tsx">
            <button className="w-full bg-white rounded-[2rem] p-5 flex items-center justify-between hover:bg-zinc-50 transition-colors shadow-sm" data-magicpath-id="169" data-magicpath-path="UserProfilePage_dupe_1.tsx">
              <div className="flex items-center gap-4" data-magicpath-id="170" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                <div className="w-12 h-12 bg-[#E0E0FF] rounded-2xl flex items-center justify-center" data-magicpath-id="171" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                  <Settings size={24} className="text-[#005C4B]" data-magicpath-id="172" data-magicpath-path="UserProfilePage_dupe_1.tsx" />
                </div>
                <span className="font-semibold text-zinc-800" data-magicpath-id="173" data-magicpath-path="UserProfilePage_dupe_1.tsx">Account Settings</span>
              </div>
              <ChevronRight size={24} className="text-zinc-400" data-magicpath-id="174" data-magicpath-path="UserProfilePage_dupe_1.tsx" />
            </button>

            <button className="w-full bg-white rounded-[2rem] p-5 flex items-center justify-between hover:bg-zinc-50 transition-colors shadow-sm" data-magicpath-id="175" data-magicpath-path="UserProfilePage_dupe_1.tsx">
              <div className="flex items-center gap-4" data-magicpath-id="176" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                <div className="w-12 h-12 bg-[#FFE4B5] rounded-2xl flex items-center justify-center" data-magicpath-id="177" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                  <Share2 size={24} className="text-[#005C4B]" data-magicpath-id="178" data-magicpath-path="UserProfilePage_dupe_1.tsx" />
                </div>
                <span className="font-semibold text-zinc-800" data-magicpath-id="179" data-magicpath-path="UserProfilePage_dupe_1.tsx">Referral Program</span>
              </div>
              <ChevronRight size={24} className="text-zinc-400" data-magicpath-id="180" data-magicpath-path="UserProfilePage_dupe_1.tsx" />
            </button>

            <button className="w-full bg-white rounded-[2rem] p-5 flex items-center justify-between hover:bg-zinc-50 transition-colors shadow-sm" data-magicpath-id="181" data-magicpath-path="UserProfilePage_dupe_1.tsx">
              <div className="flex items-center gap-4" data-magicpath-id="182" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                <div className="w-12 h-12 bg-[#C0F0D8] rounded-2xl flex items-center justify-center" data-magicpath-id="183" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                  <HelpCircle size={24} className="text-[#005C4B]" data-magicpath-id="184" data-magicpath-path="UserProfilePage_dupe_1.tsx" />
                </div>
                <span className="font-semibold text-zinc-800" data-magicpath-id="185" data-magicpath-path="UserProfilePage_dupe_1.tsx">Help & Support</span>
              </div>
              <ChevronRight size={24} className="text-zinc-400" data-magicpath-id="186" data-magicpath-path="UserProfilePage_dupe_1.tsx" />
            </button>

            <button className="w-full bg-white rounded-[2rem] p-5 flex items-center justify-between hover:bg-red-50 transition-colors shadow-sm group" data-magicpath-id="187" data-magicpath-path="UserProfilePage_dupe_1.tsx">
              <div className="flex items-center gap-4" data-magicpath-id="188" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                <div className="w-12 h-12 bg-red-50 group-hover:bg-red-100 rounded-2xl flex items-center justify-center transition-colors" data-magicpath-id="189" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                  <LogOut size={24} className="text-red-500" data-magicpath-id="190" data-magicpath-path="UserProfilePage_dupe_1.tsx" />
                </div>
                <span className="font-semibold text-red-500" data-magicpath-id="191" data-magicpath-path="UserProfilePage_dupe_1.tsx">Log Out</span>
              </div>
              <ChevronRight size={24} className="text-red-400" data-magicpath-id="192" data-magicpath-path="UserProfilePage_dupe_1.tsx" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Floating Bottom Navbar */}
      <div className="absolute bottom-8 left-0 right-0 px-6 z-50 flex justify-center pointer-events-none" data-magicpath-id="193" data-magicpath-path="UserProfilePage_dupe_1.tsx">
        <nav className="bg-white p-2.5 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center gap-2 pointer-events-auto max-w-md w-full justify-between" data-magicpath-id="194" data-magicpath-path="UserProfilePage_dupe_1.tsx">
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
            if (item.id === 'shop' && onNavigateToShop) {
              onNavigateToShop();
            }
          }} className={cn('relative flex items-center justify-center rounded-[2rem] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer -webkit-tap-highlight-color-transparent outline-none', isActive ? 'flex-grow px-6 py-3 bg-[#2A1805]' : 'w-12 h-12 hover:bg-zinc-100')} layout transition={{
            type: 'spring',
            stiffness: 500,
            damping: 35
          }} data-magicpath-id="195" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                <AnimatePresence mode="wait" data-magicpath-id="196" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                  {isActive && <motion.div className="flex items-center gap-3 overflow-hidden whitespace-nowrap" initial={{
                opacity: 0,
                width: 0
              }} animate={{
                opacity: 1,
                width: 'auto'
              }} exit={{
                opacity: 0,
                width: 0
              }} transition={{
                duration: 0.3,
                delay: 0.1
              }} data-magicpath-id="197" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                      <item.icon size={20} className="text-white shrink-0" strokeWidth={2.5} data-magicpath-id="198" data-magicpath-path="UserProfilePage_dupe_1.tsx" />
                      <motion.span className="text-white font-semibold text-sm tracking-wide" initial={{
                  opacity: 0,
                  x: -10
                }} animate={{
                  opacity: 1,
                  x: 0
                }} transition={{
                  delay: 0.15
                }} data-magicpath-id="199" data-magicpath-path="UserProfilePage_dupe_1.tsx">
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
            }} data-magicpath-id="200" data-magicpath-path="UserProfilePage_dupe_1.tsx">
                    <item.icon size={24} className="text-zinc-400" strokeWidth={2} data-magicpath-id="201" data-magicpath-path="UserProfilePage_dupe_1.tsx" />
                  </motion.div>}
              </motion.button>;
        })}
        </nav>
      </div>
    </div>;
};
export default UserProfilePage;