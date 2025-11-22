"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Share2, Edit, Trash2, TrendingUp, Eye, Heart, MessageCircle, MapPin, User, Calendar, Package, Leaf, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
export interface ListingDetail {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  originalPrice: number;
  condition: 'Like New' | 'Good' | 'Fair';
  images: string[];
  status: 'active' | 'sold' | 'pending';
  listedDate: string;
  views: number;
  likes: number;
  messages: number;
  location: string;
  seller: {
    name: string;
    rating: number;
    responseTime: string;
  };
  co2Saved: number;
  salesData?: {
    soldDate: string;
    soldPrice: number;
    totalViews: number;
    daysListed: number;
  };
}
export interface ListingDetailCardProps {
  listing: ListingDetail;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onShare?: () => void;
  isOwner?: boolean;
}
export const ListingDetailCard = ({
  listing,
  isOpen,
  onClose,
  onEdit,
  onDelete,
  onShare,
  isOwner = false
}: ListingDetailCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const nextImage = () => {
    setCurrentImageIndex(prev => (prev + 1) % listing.images.length);
  };
  const prevImage = () => {
    setCurrentImageIndex(prev => (prev - 1 + listing.images.length) % listing.images.length);
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'sold':
        return 'bg-zinc-400 text-white';
      case 'pending':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-zinc-100 text-zinc-700';
    }
  };
  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'Like New':
        return 'bg-[#DDF247] text-[#2A1805]';
      case 'Good':
        return 'bg-[#005C4B] text-white';
      case 'Fair':
        return 'bg-zinc-300 text-zinc-700';
      default:
        return 'bg-zinc-100 text-zinc-700';
    }
  };
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  return <AnimatePresence data-magicpath-id="0" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
      {isOpen && <>
          {/* Backdrop */}
          <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" data-magicpath-id="1" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx" />

          {/* Modal */}
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
      }} className="fixed inset-x-0 bottom-0 max-h-[95vh] bg-white rounded-t-[2.5rem] shadow-2xl overflow-hidden z-[101]" data-magicpath-id="2" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
            {/* Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-zinc-100 px-6 py-4 flex items-center justify-between z-10" data-magicpath-id="3" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
              <button onClick={onClose} className="p-2 hover:bg-zinc-100 rounded-full transition-colors cursor-pointer" data-magicpath-id="4" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                <X size={24} className="text-zinc-600" data-magicpath-id="5" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx" />
              </button>

              <div className="flex items-center gap-2" data-magicpath-id="6" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                {isOwner && <>
                    <button onClick={onEdit} className="p-2 hover:bg-zinc-100 rounded-full transition-colors cursor-pointer" data-magicpath-id="7" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                      <Edit size={20} className="text-zinc-600" data-magicpath-id="8" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx" />
                    </button>
                    <button onClick={onDelete} className="p-2 hover:bg-red-50 rounded-full transition-colors cursor-pointer" data-magicpath-id="9" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                      <Trash2 size={20} className="text-red-500" data-magicpath-id="10" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx" />
                    </button>
                  </>}
                <button onClick={onShare} className="p-2 hover:bg-zinc-100 rounded-full transition-colors cursor-pointer" data-magicpath-id="11" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                  <Share2 size={20} className="text-zinc-600" data-magicpath-id="12" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx" />
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto max-h-[calc(95vh-5rem)] pb-32" data-magicpath-id="13" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
              {/* Image Carousel */}
              <div className="relative w-full aspect-square bg-zinc-100" data-magicpath-id="14" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                <AnimatePresence mode="wait" data-magicpath-id="15" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                  <motion.img key={currentImageIndex} src={listing.images[currentImageIndex]} alt={`${listing.name} - Image ${currentImageIndex + 1}`} className="w-full h-full object-cover" initial={{
                opacity: 0
              }} animate={{
                opacity: 1
              }} exit={{
                opacity: 0
              }} transition={{
                duration: 0.3
              }} data-magicpath-id="16" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx" />
                </AnimatePresence>

                {/* Status Badge */}
                <div className={cn('absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold capitalize backdrop-blur-sm', getStatusColor(listing.status))} data-magicpath-id="17" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                  {listing.status}
                </div>

                {/* Like Button */}
                <motion.button onClick={() => setIsLiked(!isLiked)} className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg cursor-pointer" whileTap={{
              scale: 0.9
            }} data-magicpath-id="18" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                  <Heart size={24} className={cn('transition-all', isLiked ? 'fill-red-500 text-red-500' : 'text-zinc-600')} data-magicpath-id="19" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx" />
                </motion.button>

                {/* Navigation Arrows */}
                {listing.images.length > 1 && <>
                    <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors cursor-pointer" data-magicpath-id="20" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                      <ChevronLeft size={20} className="text-zinc-800" data-magicpath-id="21" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx" />
                    </button>
                    <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors cursor-pointer" data-magicpath-id="22" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                      <ChevronRight size={20} className="text-zinc-800" data-magicpath-id="23" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx" />
                    </button>
                  </>}

                {/* Image Indicator Dots */}
                {listing.images.length > 1 && <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2" data-magicpath-id="24" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                    {listing.images.map((_, index) => <button key={index} onClick={() => setCurrentImageIndex(index)} className={cn('w-2 h-2 rounded-full transition-all cursor-pointer', index === currentImageIndex ? 'w-6 bg-white' : 'bg-white/50 hover:bg-white/70')} data-magicpath-id="25" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx" />)}
                  </div>}
              </div>

              {/* Product Info */}
              <div className="px-6 py-6" data-magicpath-id="26" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                {/* Title & Price */}
                <div className="mb-6" data-magicpath-id="27" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                  <h2 className="text-3xl font-bold text-zinc-800 mb-3" data-magicpath-id="28" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                    {listing.name}
                  </h2>
                  <div className="flex items-baseline gap-3 mb-3" data-magicpath-id="29" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                    <span className="text-4xl font-bold text-[#005C4B]" data-magicpath-id="30" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                      ${listing.price.toFixed(2)}
                    </span>
                    <span className="text-xl text-zinc-400 line-through" data-magicpath-id="31" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                      ${listing.originalPrice.toFixed(2)}
                    </span>
                    <span className="ml-2 px-3 py-1 bg-red-100 text-red-700 text-sm font-bold rounded-full" data-magicpath-id="32" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                      {Math.floor((listing.originalPrice - listing.price) / listing.originalPrice * 100)}% OFF
                    </span>
                  </div>
                  <div className="flex items-center gap-2" data-magicpath-id="33" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                    <span className={cn('px-3 py-1 rounded-full text-xs font-bold', getConditionColor(listing.condition))} data-magicpath-id="34" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                      {listing.condition}
                    </span>
                    <span className="px-3 py-1 bg-zinc-100 text-zinc-700 text-xs font-semibold rounded-full" data-magicpath-id="35" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                      {listing.category}
                    </span>
                  </div>
                </div>

                {/* Stats Bar */}
                <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-zinc-50 rounded-2xl" data-magicpath-id="36" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                  <div className="text-center" data-magicpath-id="37" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                    <div className="flex items-center justify-center gap-1 mb-1" data-magicpath-id="38" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                      <Eye size={16} className="text-zinc-500" data-magicpath-id="39" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx" />
                      <span className="text-lg font-bold text-zinc-800" data-magicpath-id="40" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">{listing.views}</span>
                    </div>
                    <p className="text-xs text-zinc-500" data-magicpath-id="41" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">Views</p>
                  </div>
                  <div className="text-center" data-magicpath-id="42" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                    <div className="flex items-center justify-center gap-1 mb-1" data-magicpath-id="43" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                      <Heart size={16} className="text-zinc-500" data-magicpath-id="44" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx" />
                      <span className="text-lg font-bold text-zinc-800" data-magicpath-id="45" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">{listing.likes}</span>
                    </div>
                    <p className="text-xs text-zinc-500" data-magicpath-id="46" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">Likes</p>
                  </div>
                  <div className="text-center" data-magicpath-id="47" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                    <div className="flex items-center justify-center gap-1 mb-1" data-magicpath-id="48" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                      <MessageCircle size={16} className="text-zinc-500" data-magicpath-id="49" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx" />
                      <span className="text-lg font-bold text-zinc-800" data-magicpath-id="50" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">{listing.messages}</span>
                    </div>
                    <p className="text-xs text-zinc-500" data-magicpath-id="51" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">Messages</p>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6" data-magicpath-id="52" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                  <h3 className="text-lg font-semibold text-zinc-800 mb-3" data-magicpath-id="53" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">Description</h3>
                  <p className="text-zinc-600 leading-relaxed" data-magicpath-id="54" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                    {listing.description}
                  </p>
                </div>

                {/* Environmental Impact */}
                <div className="mb-6 bg-gradient-to-br from-green-500 to-green-600 rounded-[2rem] p-6 text-white" data-magicpath-id="55" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                  <div className="flex items-center gap-4 mb-4" data-magicpath-id="56" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                    <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center" data-magicpath-id="57" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                      <Leaf size={28} data-magicpath-id="58" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx" />
                    </div>
                    <div className="flex-1" data-magicpath-id="59" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                      <p className="text-white/90 text-sm font-medium mb-1" data-magicpath-id="60" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                        Environmental Impact
                      </p>
                      <p className="text-2xl font-bold" data-magicpath-id="61" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                        {(listing.co2Saved / 1000).toFixed(1)}kg CO₂ Saved
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-white/90" data-magicpath-id="62" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                    By choosing this pre-loved item, you're helping reduce carbon emissions and supporting sustainable shopping.
                  </p>
                </div>

                {/* Sales Analytics (if sold) */}
                {listing.status === 'sold' && listing.salesData && <div className="mb-6 bg-white border-2 border-zinc-200 rounded-[2rem] p-6" data-magicpath-id="63" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                    <h3 className="text-lg font-semibold text-zinc-800 mb-4 flex items-center gap-2" data-magicpath-id="64" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                      <TrendingUp size={20} className="text-[#005C4B]" data-magicpath-id="65" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx" />
                      Sales Analytics
                    </h3>
                    <div className="grid grid-cols-2 gap-4" data-magicpath-id="66" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                      <div className="bg-[#DDF247]/20 rounded-2xl p-4" data-magicpath-id="67" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                        <p className="text-sm text-zinc-600 mb-1" data-magicpath-id="68" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">Sold For</p>
                        <p className="text-2xl font-bold text-[#005C4B]" data-magicpath-id="69" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                          ${listing.salesData.soldPrice.toFixed(2)}
                        </p>
                      </div>
                      <div className="bg-zinc-50 rounded-2xl p-4" data-magicpath-id="70" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                        <p className="text-sm text-zinc-600 mb-1" data-magicpath-id="71" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">Total Views</p>
                        <p className="text-2xl font-bold text-zinc-800" data-magicpath-id="72" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                          {listing.salesData.totalViews}
                        </p>
                      </div>
                      <div className="bg-zinc-50 rounded-2xl p-4" data-magicpath-id="73" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                        <p className="text-sm text-zinc-600 mb-1" data-magicpath-id="74" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">Days Listed</p>
                        <p className="text-2xl font-bold text-zinc-800" data-magicpath-id="75" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                          {listing.salesData.daysListed}
                        </p>
                      </div>
                      <div className="bg-zinc-50 rounded-2xl p-4" data-magicpath-id="76" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                        <p className="text-sm text-zinc-600 mb-1" data-magicpath-id="77" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">Sold Date</p>
                        <p className="text-sm font-semibold text-zinc-800" data-magicpath-id="78" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                          {formatDate(listing.salesData.soldDate)}
                        </p>
                      </div>
                    </div>
                  </div>}

                {/* Seller Info */}
                <div className="mb-6 bg-white border-2 border-zinc-200 rounded-[2rem] p-6" data-magicpath-id="79" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                  <h3 className="text-lg font-semibold text-zinc-800 mb-4" data-magicpath-id="80" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">Seller Information</h3>
                  <div className="flex items-center gap-4 mb-4" data-magicpath-id="81" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#DDF247] to-[#B8E635] rounded-full flex items-center justify-center" data-magicpath-id="82" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                      <User size={28} className="text-[#005C4B]" data-magicpath-id="83" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx" />
                    </div>
                    <div className="flex-1" data-magicpath-id="84" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                      <p className="font-semibold text-zinc-800" data-magicpath-id="85" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">{listing.seller.name}</p>
                      <div className="flex items-center gap-2 mt-1" data-magicpath-id="86" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                        <span className="text-sm text-[#005C4B] font-semibold" data-magicpath-id="87" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                          ★ {listing.seller.rating.toFixed(1)}
                        </span>
                        <span className="text-sm text-zinc-500" data-magicpath-id="88" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                          • Responds in {listing.seller.responseTime}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-zinc-600" data-magicpath-id="89" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                    <MapPin size={16} data-magicpath-id="90" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx" />
                    <span data-magicpath-id="91" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">{listing.location}</span>
                  </div>
                </div>

                {/* Listing Details */}
                <div className="bg-zinc-50 rounded-2xl p-6" data-magicpath-id="92" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                  <div className="flex items-center gap-2 text-sm text-zinc-600" data-magicpath-id="93" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                    <Calendar size={16} data-magicpath-id="94" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx" />
                    <span data-magicpath-id="95" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">Listed {formatDate(listing.listedDate)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Action Button */}
            {!isOwner && listing.status === 'active' && <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent" data-magicpath-id="96" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                <button className="w-full py-5 rounded-[2rem] bg-gradient-to-r from-[#DDF247] to-[#B8E635] text-[#2A1805] font-bold text-lg hover:shadow-xl transition-all cursor-pointer" data-magicpath-id="97" data-magicpath-path="ListingDetailCard_dupe_1_dupe_1.tsx">
                  Contact Seller
                </button>
              </div>}
          </motion.div>
        </>}
    </AnimatePresence>;
};