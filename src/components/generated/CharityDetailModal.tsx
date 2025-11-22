"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Phone, Mail, Globe, Star, Heart, Share2, Users, TrendingUp, Award, Calendar, Package, CheckCircle2, BarChart3, Image as ImageIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
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
interface CharityDetailModalProps {
  charity: Charity;
  onClose: () => void;
  isOpen: boolean;
}

// Mock detailed data
const getDetailedCharityData = (charity: Charity) => {
  return {
    ...charity,
    mission: `Our mission is to create lasting positive change in communities through sustainable practices and dedicated support. We believe in empowering individuals and protecting our shared future.`,
    fullAddress: `${charity.location}, United States`,
    phone: '+1 (555) 987-6543',
    email: `contact@${charity.name.toLowerCase().replace(/\s+/g, '')}.org`,
    website: `www.${charity.name.toLowerCase().replace(/\s+/g, '')}.org`,
    founded: '2015',
    employees: '150+',
    volunteers: '2,400+',
    photos: ['https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=500', 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=500', 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500', 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=500'],
    impactStats: [{
      label: 'Total Items Collected',
      value: charity.itemsReceived.toLocaleString(),
      icon: Package
    }, {
      label: 'Lives Impacted',
      value: charity.beneficiaries.toLocaleString(),
      icon: Users
    }, {
      label: 'Projects Completed',
      value: '156',
      icon: CheckCircle2
    }, {
      label: 'Years Active',
      value: '9+',
      icon: Calendar
    }],
    recentDonations: [{
      id: 1,
      donor: 'Anonymous',
      items: 125,
      date: '2 hours ago',
      avatar: '🙂'
    }, {
      id: 2,
      donor: 'Sarah M.',
      items: 87,
      date: '5 hours ago',
      avatar: '👩'
    }, {
      id: 3,
      donor: 'John D.',
      items: 210,
      date: '1 day ago',
      avatar: '👨'
    }, {
      id: 4,
      donor: 'Emma K.',
      items: 64,
      date: '2 days ago',
      avatar: '👧'
    }],
    monthlyImpactData: [{
      month: 'Jan',
      value: 1200
    }, {
      month: 'Feb',
      value: 1450
    }, {
      month: 'Mar',
      value: 1680
    }, {
      month: 'Apr',
      value: 1920
    }, {
      month: 'May',
      value: 2100
    }, {
      month: 'Jun',
      value: 2340
    }],
    certifications: [{
      name: 'Charity Navigator',
      rating: '4-Star',
      icon: '⭐'
    }, {
      name: 'GuideStar Platinum',
      rating: 'Platinum Seal',
      icon: '🏆'
    }, {
      name: 'BBB Accredited',
      rating: 'A+ Rating',
      icon: '✓'
    }]
  };
};
export const CharityDetailModal: React.FC<CharityDetailModalProps> = ({
  charity,
  onClose,
  isOpen
}) => {
  const detailedData = getDetailedCharityData(charity);
  const [isFavorited, setIsFavorited] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const maxValue = Math.max(...detailedData.monthlyImpactData.map(d => d.value));
  return <AnimatePresence data-magicpath-id="0" data-magicpath-path="CharityDetailModal.tsx">
      {isOpen && <>
          {/* Backdrop */}
          <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} transition={{
        duration: 0.2
      }} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]" onClick={onClose} data-magicpath-id="1" data-magicpath-path="CharityDetailModal.tsx" />

          {/* Modal Content */}
          <motion.div initial={{
        y: '100%'
      }} animate={{
        y: 0
      }} exit={{
        y: '100%'
      }} transition={{
        type: 'spring',
        damping: 30,
        stiffness: 300
      }} className="fixed bottom-0 left-0 right-0 z-[101] max-h-[90vh] bg-white rounded-t-[2.5rem] shadow-2xl overflow-hidden" data-magicpath-id="2" data-magicpath-path="CharityDetailModal.tsx">
            {/* Header with Photo Gallery */}
            <div className="relative" data-magicpath-id="3" data-magicpath-path="CharityDetailModal.tsx">
              {/* Photo Gallery Carousel */}
              <div className="relative h-64 bg-gradient-to-br from-zinc-200 to-zinc-300 overflow-hidden" data-magicpath-id="4" data-magicpath-path="CharityDetailModal.tsx">
                <motion.div className="flex h-full" animate={{
              x: `-${activePhotoIndex * 100}%`
            }} transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30
            }} data-magicpath-id="5" data-magicpath-path="CharityDetailModal.tsx">
                  {detailedData.photos.map((photo, index) => <div key={index} className="min-w-full h-full relative" data-magicpath-id="6" data-magicpath-path="CharityDetailModal.tsx">
                      <img src={photo} alt={`${charity.name} photo ${index + 1}`} className="w-full h-full object-cover" data-magicpath-id="7" data-magicpath-path="CharityDetailModal.tsx" />
                    </div>)}
                </motion.div>

                {/* Photo Navigation Dots */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2" data-magicpath-id="8" data-magicpath-path="CharityDetailModal.tsx">
                  {detailedData.photos.map((_, index) => <button key={index} onClick={() => setActivePhotoIndex(index)} className={cn("w-2 h-2 rounded-full transition-all", activePhotoIndex === index ? "bg-white w-6" : "bg-white/50")} data-magicpath-id="9" data-magicpath-path="CharityDetailModal.tsx" />)}
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" data-magicpath-id="10" data-magicpath-path="CharityDetailModal.tsx" />
              </div>

              {/* Close Button */}
              <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors z-10" data-magicpath-id="11" data-magicpath-path="CharityDetailModal.tsx">
                <X className="text-zinc-800" size={20} data-magicpath-id="12" data-magicpath-path="CharityDetailModal.tsx" />
              </button>

              {/* Drag Handle */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-white/60 rounded-full" data-magicpath-id="13" data-magicpath-path="CharityDetailModal.tsx" />
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-16rem)] px-6 pb-8" data-magicpath-id="14" data-magicpath-path="CharityDetailModal.tsx">
              {/* Title Section */}
              <div className="py-6 border-b border-zinc-100" data-magicpath-id="15" data-magicpath-path="CharityDetailModal.tsx">
                <div className="flex items-start gap-4 mb-4" data-magicpath-id="16" data-magicpath-path="CharityDetailModal.tsx">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#DDF247] to-[#B8E635] rounded-2xl flex items-center justify-center text-4xl shrink-0" data-magicpath-id="17" data-magicpath-path="CharityDetailModal.tsx">
                    {charity.logo}
                  </div>
                  <div className="flex-1" data-magicpath-id="18" data-magicpath-path="CharityDetailModal.tsx">
                    <div className="flex items-start justify-between gap-2 mb-2" data-magicpath-id="19" data-magicpath-path="CharityDetailModal.tsx">
                      <h2 className="text-2xl font-bold text-zinc-800 leading-tight" data-magicpath-id="20" data-magicpath-path="CharityDetailModal.tsx">
                        {charity.name}
                      </h2>
                      <div className="flex items-center gap-1 bg-[#DDF247] px-3 py-1.5 rounded-full" data-magicpath-id="21" data-magicpath-path="CharityDetailModal.tsx">
                        <Star size={16} className="text-[#2A1805] fill-[#2A1805]" data-magicpath-id="22" data-magicpath-path="CharityDetailModal.tsx" />
                        <span className="text-sm font-bold text-[#2A1805]" data-magicpath-id="23" data-magicpath-path="CharityDetailModal.tsx">{charity.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-zinc-500 mb-2" data-magicpath-id="24" data-magicpath-path="CharityDetailModal.tsx">
                      <MapPin size={14} data-magicpath-id="25" data-magicpath-path="CharityDetailModal.tsx" />
                      <span data-magicpath-id="26" data-magicpath-path="CharityDetailModal.tsx">{detailedData.fullAddress}</span>
                    </div>
                    <span className="inline-block px-3 py-1 bg-[#005C4B]/10 text-[#005C4B] text-xs font-semibold rounded-full" data-magicpath-id="27" data-magicpath-path="CharityDetailModal.tsx">
                      {charity.category}
                    </span>
                  </div>
                </div>

                {/* Trust Score Badge */}
                <div className="flex items-center justify-between bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-2xl" data-magicpath-id="28" data-magicpath-path="CharityDetailModal.tsx">
                  <div className="flex items-center gap-3" data-magicpath-id="29" data-magicpath-path="CharityDetailModal.tsx">
                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center" data-magicpath-id="30" data-magicpath-path="CharityDetailModal.tsx">
                      <Award className="text-white" size={24} data-magicpath-id="31" data-magicpath-path="CharityDetailModal.tsx" />
                    </div>
                    <div data-magicpath-id="32" data-magicpath-path="CharityDetailModal.tsx">
                      <p className="text-sm font-semibold text-zinc-800" data-magicpath-id="33" data-magicpath-path="CharityDetailModal.tsx">Trust Score</p>
                      <p className="text-xs text-zinc-600" data-magicpath-id="34" data-magicpath-path="CharityDetailModal.tsx">Verified & Certified</p>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-green-600" data-magicpath-id="35" data-magicpath-path="CharityDetailModal.tsx">{charity.trustScore}%</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-3 gap-3 py-6 border-b border-zinc-100" data-magicpath-id="36" data-magicpath-path="CharityDetailModal.tsx">
                <button onClick={() => setIsFavorited(!isFavorited)} className={cn("flex flex-col items-center gap-2 py-3 px-2 rounded-2xl font-semibold text-xs transition-all hover:scale-[1.02] active:scale-[0.98]", isFavorited ? "bg-pink-100 text-pink-600" : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200")} data-magicpath-id="37" data-magicpath-path="CharityDetailModal.tsx">
                  <Heart size={20} className={isFavorited ? "fill-pink-600" : ""} data-magicpath-id="38" data-magicpath-path="CharityDetailModal.tsx" />
                  <span data-magicpath-id="39" data-magicpath-path="CharityDetailModal.tsx">{isFavorited ? 'Saved' : 'Save'}</span>
                </button>
                <button className="flex flex-col items-center gap-2 py-3 px-2 bg-zinc-100 text-zinc-700 rounded-2xl font-semibold text-xs hover:bg-zinc-200 transition-all hover:scale-[1.02] active:scale-[0.98]" data-magicpath-id="40" data-magicpath-path="CharityDetailModal.tsx">
                  <Share2 size={20} data-magicpath-id="41" data-magicpath-path="CharityDetailModal.tsx" />
                  <span data-magicpath-id="42" data-magicpath-path="CharityDetailModal.tsx">Share</span>
                </button>
                <button className="flex flex-col items-center gap-2 py-3 px-2 bg-[#005C4B] text-white rounded-2xl font-semibold text-xs hover:bg-[#004a3d] transition-all hover:scale-[1.02] active:scale-[0.98]" data-magicpath-id="43" data-magicpath-path="CharityDetailModal.tsx">
                  <Phone size={20} data-magicpath-id="44" data-magicpath-path="CharityDetailModal.tsx" />
                  <span data-magicpath-id="45" data-magicpath-path="CharityDetailModal.tsx">Call</span>
                </button>
              </div>

              {/* Mission Statement */}
              <div className="py-6 border-b border-zinc-100" data-magicpath-id="46" data-magicpath-path="CharityDetailModal.tsx">
                <h3 className="text-lg font-semibold text-zinc-800 mb-3" data-magicpath-id="47" data-magicpath-path="CharityDetailModal.tsx">Our Mission</h3>
                <p className="text-sm text-zinc-600 leading-relaxed" data-magicpath-id="48" data-magicpath-path="CharityDetailModal.tsx">{detailedData.mission}</p>
              </div>

              {/* Impact Statistics */}
              <div className="py-6 border-b border-zinc-100" data-magicpath-id="49" data-magicpath-path="CharityDetailModal.tsx">
                <div className="flex items-center gap-2 mb-4" data-magicpath-id="50" data-magicpath-path="CharityDetailModal.tsx">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center" data-magicpath-id="51" data-magicpath-path="CharityDetailModal.tsx">
                    <BarChart3 className="text-purple-600" size={20} data-magicpath-id="52" data-magicpath-path="CharityDetailModal.tsx" />
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-800" data-magicpath-id="53" data-magicpath-path="CharityDetailModal.tsx">Impact Statistics</h3>
                </div>
                <div className="grid grid-cols-2 gap-4" data-magicpath-id="54" data-magicpath-path="CharityDetailModal.tsx">
                  {detailedData.impactStats.map((stat, index) => {
                const Icon = stat.icon;
                return <motion.div key={stat.label} initial={{
                  opacity: 0,
                  y: 20
                }} animate={{
                  opacity: 1,
                  y: 0
                }} transition={{
                  delay: index * 0.1
                }} className="bg-gradient-to-br from-zinc-50 to-zinc-100 p-4 rounded-2xl" data-magicpath-id="55" data-magicpath-path="CharityDetailModal.tsx">
                        <Icon className="text-[#005C4B] mb-2" size={24} data-magicpath-id="56" data-magicpath-path="CharityDetailModal.tsx" />
                        <p className="text-2xl font-bold text-zinc-800 mb-1" data-magicpath-id="57" data-magicpath-path="CharityDetailModal.tsx">{stat.value}</p>
                        <p className="text-xs text-zinc-600" data-magicpath-id="58" data-magicpath-path="CharityDetailModal.tsx">{stat.label}</p>
                      </motion.div>;
              })}
                </div>
              </div>

              {/* Monthly Impact Chart */}
              <div className="py-6 border-b border-zinc-100" data-magicpath-id="59" data-magicpath-path="CharityDetailModal.tsx">
                <h3 className="text-lg font-semibold text-zinc-800 mb-4" data-magicpath-id="60" data-magicpath-path="CharityDetailModal.tsx">
                  Monthly Impact Trend
                </h3>
                <div className="flex items-end justify-between gap-2 h-32" data-magicpath-id="61" data-magicpath-path="CharityDetailModal.tsx">
                  {detailedData.monthlyImpactData.map((data, index) => {
                const height = data.value / maxValue * 100;
                return <div key={data.month} className="flex-1 flex flex-col items-center gap-2" data-magicpath-id="62" data-magicpath-path="CharityDetailModal.tsx">
                        <motion.div className="w-full bg-gradient-to-t from-[#005C4B] to-[#DDF247] rounded-t-xl relative group" initial={{
                    height: 0
                  }} animate={{
                    height: `${height}%`
                  }} transition={{
                    delay: index * 0.1,
                    duration: 0.5
                  }} data-magicpath-id="63" data-magicpath-path="CharityDetailModal.tsx">
                          {/* Tooltip */}
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap" data-magicpath-id="64" data-magicpath-path="CharityDetailModal.tsx">
                            {data.value} items
                          </div>
                        </motion.div>
                        <span className="text-xs text-zinc-500 font-medium" data-magicpath-id="65" data-magicpath-path="CharityDetailModal.tsx">{data.month}</span>
                      </div>;
              })}
                </div>
              </div>

              {/* Certifications */}
              <div className="py-6 border-b border-zinc-100" data-magicpath-id="66" data-magicpath-path="CharityDetailModal.tsx">
                <h3 className="text-lg font-semibold text-zinc-800 mb-4" data-magicpath-id="67" data-magicpath-path="CharityDetailModal.tsx">Certifications</h3>
                <div className="space-y-3" data-magicpath-id="68" data-magicpath-path="CharityDetailModal.tsx">
                  {detailedData.certifications.map((cert, index) => <motion.div key={cert.name} initial={{
                opacity: 0,
                x: -20
              }} animate={{
                opacity: 1,
                x: 0
              }} transition={{
                delay: index * 0.1
              }} className="flex items-center gap-4 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl" data-magicpath-id="69" data-magicpath-path="CharityDetailModal.tsx">
                      <div className="text-3xl" data-magicpath-id="70" data-magicpath-path="CharityDetailModal.tsx">{cert.icon}</div>
                      <div className="flex-1" data-magicpath-id="71" data-magicpath-path="CharityDetailModal.tsx">
                        <h4 className="font-semibold text-zinc-800 text-sm" data-magicpath-id="72" data-magicpath-path="CharityDetailModal.tsx">{cert.name}</h4>
                        <p className="text-xs text-zinc-600" data-magicpath-id="73" data-magicpath-path="CharityDetailModal.tsx">{cert.rating}</p>
                      </div>
                      <CheckCircle2 className="text-green-600" size={24} data-magicpath-id="74" data-magicpath-path="CharityDetailModal.tsx" />
                    </motion.div>)}
                </div>
              </div>

              {/* Recent Donations */}
              <div className="py-6 border-b border-zinc-100" data-magicpath-id="75" data-magicpath-path="CharityDetailModal.tsx">
                <h3 className="text-lg font-semibold text-zinc-800 mb-4" data-magicpath-id="76" data-magicpath-path="CharityDetailModal.tsx">Recent Donations</h3>
                <div className="space-y-3" data-magicpath-id="77" data-magicpath-path="CharityDetailModal.tsx">
                  {detailedData.recentDonations.map((donation, index) => <motion.div key={donation.id} initial={{
                opacity: 0,
                x: -20
              }} animate={{
                opacity: 1,
                x: 0
              }} transition={{
                delay: index * 0.1
              }} className="flex items-center gap-4 p-4 bg-zinc-50 rounded-2xl" data-magicpath-id="78" data-magicpath-path="CharityDetailModal.tsx">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center text-2xl" data-magicpath-id="79" data-magicpath-path="CharityDetailModal.tsx">
                        {donation.avatar}
                      </div>
                      <div className="flex-1" data-magicpath-id="80" data-magicpath-path="CharityDetailModal.tsx">
                        <h4 className="font-semibold text-zinc-800 text-sm" data-magicpath-id="81" data-magicpath-path="CharityDetailModal.tsx">{donation.donor}</h4>
                        <p className="text-xs text-zinc-500" data-magicpath-id="82" data-magicpath-path="CharityDetailModal.tsx">{donation.date}</p>
                      </div>
                      <div className="text-right" data-magicpath-id="83" data-magicpath-path="CharityDetailModal.tsx">
                        <p className="text-lg font-bold text-[#005C4B]" data-magicpath-id="84" data-magicpath-path="CharityDetailModal.tsx">{donation.items}</p>
                        <p className="text-xs text-zinc-500" data-magicpath-id="85" data-magicpath-path="CharityDetailModal.tsx">items</p>
                      </div>
                    </motion.div>)}
                </div>
              </div>

              {/* Contact Information */}
              <div className="py-6 border-b border-zinc-100" data-magicpath-id="86" data-magicpath-path="CharityDetailModal.tsx">
                <h3 className="text-lg font-semibold text-zinc-800 mb-4" data-magicpath-id="87" data-magicpath-path="CharityDetailModal.tsx">Contact Information</h3>
                <div className="space-y-3" data-magicpath-id="88" data-magicpath-path="CharityDetailModal.tsx">
                  <a href={`tel:${detailedData.phone}`} className="flex items-center gap-3 p-3 hover:bg-zinc-50 rounded-xl transition-colors" data-magicpath-id="89" data-magicpath-path="CharityDetailModal.tsx">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0" data-magicpath-id="90" data-magicpath-path="CharityDetailModal.tsx">
                      <Phone className="text-blue-600" size={18} data-magicpath-id="91" data-magicpath-path="CharityDetailModal.tsx" />
                    </div>
                    <span className="text-sm text-zinc-700" data-magicpath-id="92" data-magicpath-path="CharityDetailModal.tsx">{detailedData.phone}</span>
                  </a>
                  <a href={`mailto:${detailedData.email}`} className="flex items-center gap-3 p-3 hover:bg-zinc-50 rounded-xl transition-colors" data-magicpath-id="93" data-magicpath-path="CharityDetailModal.tsx">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center shrink-0" data-magicpath-id="94" data-magicpath-path="CharityDetailModal.tsx">
                      <Mail className="text-green-600" size={18} data-magicpath-id="95" data-magicpath-path="CharityDetailModal.tsx" />
                    </div>
                    <span className="text-sm text-zinc-700" data-magicpath-id="96" data-magicpath-path="CharityDetailModal.tsx">{detailedData.email}</span>
                  </a>
                  <a href={`https://${detailedData.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 hover:bg-zinc-50 rounded-xl transition-colors" data-magicpath-id="97" data-magicpath-path="CharityDetailModal.tsx">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center shrink-0" data-magicpath-id="98" data-magicpath-path="CharityDetailModal.tsx">
                      <Globe className="text-purple-600" size={18} data-magicpath-id="99" data-magicpath-path="CharityDetailModal.tsx" />
                    </div>
                    <span className="text-sm text-zinc-700" data-magicpath-id="100" data-magicpath-path="CharityDetailModal.tsx">{detailedData.website}</span>
                  </a>
                </div>
              </div>

              {/* Organization Info */}
              <div className="py-6" data-magicpath-id="101" data-magicpath-path="CharityDetailModal.tsx">
                <h3 className="text-lg font-semibold text-zinc-800 mb-4" data-magicpath-id="102" data-magicpath-path="CharityDetailModal.tsx">Organization Info</h3>
                <div className="grid grid-cols-3 gap-4" data-magicpath-id="103" data-magicpath-path="CharityDetailModal.tsx">
                  <div className="text-center p-4 bg-zinc-50 rounded-2xl" data-magicpath-id="104" data-magicpath-path="CharityDetailModal.tsx">
                    <p className="text-2xl font-bold text-[#005C4B] mb-1" data-magicpath-id="105" data-magicpath-path="CharityDetailModal.tsx">{detailedData.founded}</p>
                    <p className="text-xs text-zinc-600" data-magicpath-id="106" data-magicpath-path="CharityDetailModal.tsx">Founded</p>
                  </div>
                  <div className="text-center p-4 bg-zinc-50 rounded-2xl" data-magicpath-id="107" data-magicpath-path="CharityDetailModal.tsx">
                    <p className="text-2xl font-bold text-[#005C4B] mb-1" data-magicpath-id="108" data-magicpath-path="CharityDetailModal.tsx">{detailedData.employees}</p>
                    <p className="text-xs text-zinc-600" data-magicpath-id="109" data-magicpath-path="CharityDetailModal.tsx">Employees</p>
                  </div>
                  <div className="text-center p-4 bg-zinc-50 rounded-2xl" data-magicpath-id="110" data-magicpath-path="CharityDetailModal.tsx">
                    <p className="text-2xl font-bold text-[#005C4B] mb-1" data-magicpath-id="111" data-magicpath-path="CharityDetailModal.tsx">{detailedData.volunteers}</p>
                    <p className="text-xs text-zinc-600" data-magicpath-id="112" data-magicpath-path="CharityDetailModal.tsx">Volunteers</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Fixed Bottom CTA */}
            <div className="sticky bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent border-t border-zinc-100" data-magicpath-id="113" data-magicpath-path="CharityDetailModal.tsx">
              <button className="w-full py-4 px-6 bg-gradient-to-r from-[#DDF247] to-[#B8E635] text-[#2A1805] rounded-[2rem] font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]" data-magicpath-id="114" data-magicpath-path="CharityDetailModal.tsx">
                Donate Items to {charity.name}
              </button>
            </div>
          </motion.div>
        </>}
    </AnimatePresence>;
};
export default CharityDetailModal;