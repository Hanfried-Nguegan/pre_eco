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
  return <AnimatePresence>
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
      }} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]" onClick={onClose} />

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
      }} className="fixed bottom-0 left-0 right-0 z-[101] max-h-[90vh] bg-white rounded-t-[2.5rem] shadow-2xl overflow-hidden">
            {/* Header with Photo Gallery */}
            <div className="relative">
              {/* Photo Gallery Carousel */}
              <div className="relative h-64 bg-gradient-to-br from-zinc-200 to-zinc-300 overflow-hidden">
                <motion.div className="flex h-full" animate={{
              x: `-${activePhotoIndex * 100}%`
            }} transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30
            }}>
                  {detailedData.photos.map((photo, index) => <div key={index} className="min-w-full h-full relative">
                      <img src={photo} alt={`${charity.name} photo ${index + 1}`} className="w-full h-full object-cover" />
                    </div>)}
                </motion.div>

                {/* Photo Navigation Dots */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                  {detailedData.photos.map((_, index) => <button key={index} onClick={() => setActivePhotoIndex(index)} className={cn("w-2 h-2 rounded-full transition-all", activePhotoIndex === index ? "bg-white w-6" : "bg-white/50")} />)}
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
              </div>

              {/* Close Button */}
              <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors z-10">
                <X className="text-zinc-800" size={20} />
              </button>

              {/* Drag Handle */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-white/60 rounded-full" />
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-16rem)] px-6 pb-8">
              {/* Title Section */}
              <div className="py-6 border-b border-zinc-100">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#DDF247] to-[#B8E635] rounded-2xl flex items-center justify-center text-4xl shrink-0">
                    {charity.logo}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h2 className="text-2xl font-bold text-zinc-800 leading-tight">
                        {charity.name}
                      </h2>
                      <div className="flex items-center gap-1 bg-[#DDF247] px-3 py-1.5 rounded-full">
                        <Star size={16} className="text-[#2A1805] fill-[#2A1805]" />
                        <span className="text-sm font-bold text-[#2A1805]">{charity.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-zinc-500 mb-2">
                      <MapPin size={14} />
                      <span>{detailedData.fullAddress}</span>
                    </div>
                    <span className="inline-block px-3 py-1 bg-[#005C4B]/10 text-[#005C4B] text-xs font-semibold rounded-full">
                      {charity.category}
                    </span>
                  </div>
                </div>

                {/* Trust Score Badge */}
                <div className="flex items-center justify-between bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                      <Award className="text-white" size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-zinc-800">Trust Score</p>
                      <p className="text-xs text-zinc-600">Verified & Certified</p>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-green-600">{charity.trustScore}%</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-3 gap-3 py-6 border-b border-zinc-100">
                <button onClick={() => setIsFavorited(!isFavorited)} className={cn("flex flex-col items-center gap-2 py-3 px-2 rounded-2xl font-semibold text-xs transition-all hover:scale-[1.02] active:scale-[0.98]", isFavorited ? "bg-pink-100 text-pink-600" : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200")}>
                  <Heart size={20} className={isFavorited ? "fill-pink-600" : ""} />
                  <span>{isFavorited ? 'Saved' : 'Save'}</span>
                </button>
                <button className="flex flex-col items-center gap-2 py-3 px-2 bg-zinc-100 text-zinc-700 rounded-2xl font-semibold text-xs hover:bg-zinc-200 transition-all hover:scale-[1.02] active:scale-[0.98]">
                  <Share2 size={20} />
                  <span>Share</span>
                </button>
                <button className="flex flex-col items-center gap-2 py-3 px-2 bg-[#005C4B] text-white rounded-2xl font-semibold text-xs hover:bg-[#004a3d] transition-all hover:scale-[1.02] active:scale-[0.98]">
                  <Phone size={20} />
                  <span>Call</span>
                </button>
              </div>

              {/* Mission Statement */}
              <div className="py-6 border-b border-zinc-100">
                <h3 className="text-lg font-semibold text-zinc-800 mb-3">Our Mission</h3>
                <p className="text-sm text-zinc-600 leading-relaxed">{detailedData.mission}</p>
              </div>

              {/* Impact Statistics */}
              <div className="py-6 border-b border-zinc-100">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <BarChart3 className="text-purple-600" size={20} />
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-800">Impact Statistics</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
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
                }} className="bg-gradient-to-br from-zinc-50 to-zinc-100 p-4 rounded-2xl">
                        <Icon className="text-[#005C4B] mb-2" size={24} />
                        <p className="text-2xl font-bold text-zinc-800 mb-1">{stat.value}</p>
                        <p className="text-xs text-zinc-600">{stat.label}</p>
                      </motion.div>;
              })}
                </div>
              </div>

              {/* Monthly Impact Chart */}
              <div className="py-6 border-b border-zinc-100">
                <h3 className="text-lg font-semibold text-zinc-800 mb-4">
                  Monthly Impact Trend
                </h3>
                <div className="flex items-end justify-between gap-2 h-32">
                  {detailedData.monthlyImpactData.map((data, index) => {
                const height = data.value / maxValue * 100;
                return <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                        <motion.div className="w-full bg-gradient-to-t from-[#005C4B] to-[#DDF247] rounded-t-xl relative group" initial={{
                    height: 0
                  }} animate={{
                    height: `${height}%`
                  }} transition={{
                    delay: index * 0.1,
                    duration: 0.5
                  }}>
                          {/* Tooltip */}
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {data.value} items
                          </div>
                        </motion.div>
                        <span className="text-xs text-zinc-500 font-medium">{data.month}</span>
                      </div>;
              })}
                </div>
              </div>

              {/* Certifications */}
              <div className="py-6 border-b border-zinc-100">
                <h3 className="text-lg font-semibold text-zinc-800 mb-4">Certifications</h3>
                <div className="space-y-3">
                  {detailedData.certifications.map((cert, index) => <motion.div key={cert.name} initial={{
                opacity: 0,
                x: -20
              }} animate={{
                opacity: 1,
                x: 0
              }} transition={{
                delay: index * 0.1
              }} className="flex items-center gap-4 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl">
                      <div className="text-3xl">{cert.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-zinc-800 text-sm">{cert.name}</h4>
                        <p className="text-xs text-zinc-600">{cert.rating}</p>
                      </div>
                      <CheckCircle2 className="text-green-600" size={24} />
                    </motion.div>)}
                </div>
              </div>

              {/* Recent Donations */}
              <div className="py-6 border-b border-zinc-100">
                <h3 className="text-lg font-semibold text-zinc-800 mb-4">Recent Donations</h3>
                <div className="space-y-3">
                  {detailedData.recentDonations.map((donation, index) => <motion.div key={donation.id} initial={{
                opacity: 0,
                x: -20
              }} animate={{
                opacity: 1,
                x: 0
              }} transition={{
                delay: index * 0.1
              }} className="flex items-center gap-4 p-4 bg-zinc-50 rounded-2xl">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center text-2xl">
                        {donation.avatar}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-zinc-800 text-sm">{donation.donor}</h4>
                        <p className="text-xs text-zinc-500">{donation.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-[#005C4B]">{donation.items}</p>
                        <p className="text-xs text-zinc-500">items</p>
                      </div>
                    </motion.div>)}
                </div>
              </div>

              {/* Contact Information */}
              <div className="py-6 border-b border-zinc-100">
                <h3 className="text-lg font-semibold text-zinc-800 mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <a href={`tel:${detailedData.phone}`} className="flex items-center gap-3 p-3 hover:bg-zinc-50 rounded-xl transition-colors">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                      <Phone className="text-blue-600" size={18} />
                    </div>
                    <span className="text-sm text-zinc-700">{detailedData.phone}</span>
                  </a>
                  <a href={`mailto:${detailedData.email}`} className="flex items-center gap-3 p-3 hover:bg-zinc-50 rounded-xl transition-colors">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                      <Mail className="text-green-600" size={18} />
                    </div>
                    <span className="text-sm text-zinc-700">{detailedData.email}</span>
                  </a>
                  <a href={`https://${detailedData.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 hover:bg-zinc-50 rounded-xl transition-colors">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center shrink-0">
                      <Globe className="text-purple-600" size={18} />
                    </div>
                    <span className="text-sm text-zinc-700">{detailedData.website}</span>
                  </a>
                </div>
              </div>

              {/* Organization Info */}
              <div className="py-6">
                <h3 className="text-lg font-semibold text-zinc-800 mb-4">Organization Info</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-zinc-50 rounded-2xl">
                    <p className="text-2xl font-bold text-[#005C4B] mb-1">{detailedData.founded}</p>
                    <p className="text-xs text-zinc-600">Founded</p>
                  </div>
                  <div className="text-center p-4 bg-zinc-50 rounded-2xl">
                    <p className="text-2xl font-bold text-[#005C4B] mb-1">{detailedData.employees}</p>
                    <p className="text-xs text-zinc-600">Employees</p>
                  </div>
                  <div className="text-center p-4 bg-zinc-50 rounded-2xl">
                    <p className="text-2xl font-bold text-[#005C4B] mb-1">{detailedData.volunteers}</p>
                    <p className="text-xs text-zinc-600">Volunteers</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Fixed Bottom CTA */}
            <div className="sticky bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent border-t border-zinc-100">
              <button className="w-full py-4 px-6 bg-gradient-to-r from-[#DDF247] to-[#B8E635] text-[#2A1805] rounded-[2rem] font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]">
                Donate Items to {charity.name}
              </button>
            </div>
          </motion.div>
        </>}
    </AnimatePresence>;
};
export default CharityDetailModal;