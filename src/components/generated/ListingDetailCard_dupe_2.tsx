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
  return <AnimatePresence>
      {isOpen && <>
          {/* Backdrop */}
          <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" />

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
      }} className="fixed inset-x-0 bottom-0 max-h-[95vh] bg-white rounded-t-[2.5rem] shadow-2xl overflow-hidden z-[101]">
            {/* Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-zinc-100 px-6 py-4 flex items-center justify-between z-10">
              <button onClick={onClose} className="p-2 hover:bg-zinc-100 rounded-full transition-colors cursor-pointer">
                <X size={24} className="text-zinc-600" />
              </button>

              <div className="flex items-center gap-2">
                {isOwner && <>
                    <button onClick={onEdit} className="p-2 hover:bg-zinc-100 rounded-full transition-colors cursor-pointer">
                      <Edit size={20} className="text-zinc-600" />
                    </button>
                    <button onClick={onDelete} className="p-2 hover:bg-red-50 rounded-full transition-colors cursor-pointer">
                      <Trash2 size={20} className="text-red-500" />
                    </button>
                  </>}
                <button onClick={onShare} className="p-2 hover:bg-zinc-100 rounded-full transition-colors cursor-pointer">
                  <Share2 size={20} className="text-zinc-600" />
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto max-h-[calc(95vh-5rem)] pb-32">
              {/* Image Carousel */}
              <div className="relative w-full aspect-square bg-zinc-100">
                <AnimatePresence mode="wait">
                  <motion.img key={currentImageIndex} src={listing.images[currentImageIndex]} alt={`${listing.name} - Image ${currentImageIndex + 1}`} className="w-full h-full object-cover" initial={{
                opacity: 0
              }} animate={{
                opacity: 1
              }} exit={{
                opacity: 0
              }} transition={{
                duration: 0.3
              }} />
                </AnimatePresence>

                {/* Status Badge */}
                <div className={cn('absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold capitalize backdrop-blur-sm', getStatusColor(listing.status))}>
                  {listing.status}
                </div>

                {/* Like Button */}
                <motion.button onClick={() => setIsLiked(!isLiked)} className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg cursor-pointer" whileTap={{
              scale: 0.9
            }}>
                  <Heart size={24} className={cn('transition-all', isLiked ? 'fill-red-500 text-red-500' : 'text-zinc-600')} />
                </motion.button>

                {/* Navigation Arrows */}
                {listing.images.length > 1 && <>
                    <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors cursor-pointer">
                      <ChevronLeft size={20} className="text-zinc-800" />
                    </button>
                    <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors cursor-pointer">
                      <ChevronRight size={20} className="text-zinc-800" />
                    </button>
                  </>}

                {/* Image Indicator Dots */}
                {listing.images.length > 1 && <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {listing.images.map((_, index) => <button key={index} onClick={() => setCurrentImageIndex(index)} className={cn('w-2 h-2 rounded-full transition-all cursor-pointer', index === currentImageIndex ? 'w-6 bg-white' : 'bg-white/50 hover:bg-white/70')} />)}
                  </div>}
              </div>

              {/* Product Info */}
              <div className="px-6 py-6">
                {/* Title & Price */}
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-zinc-800 mb-3">
                    {listing.name}
                  </h2>
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="text-4xl font-bold text-[#005C4B]">
                      ${listing.price.toFixed(2)}
                    </span>
                    <span className="text-xl text-zinc-400 line-through">
                      ${listing.originalPrice.toFixed(2)}
                    </span>
                    <span className="ml-2 px-3 py-1 bg-red-100 text-red-700 text-sm font-bold rounded-full">
                      {Math.floor((listing.originalPrice - listing.price) / listing.originalPrice * 100)}% OFF
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={cn('px-3 py-1 rounded-full text-xs font-bold', getConditionColor(listing.condition))}>
                      {listing.condition}
                    </span>
                    <span className="px-3 py-1 bg-zinc-100 text-zinc-700 text-xs font-semibold rounded-full">
                      {listing.category}
                    </span>
                  </div>
                </div>

                {/* Stats Bar */}
                <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-zinc-50 rounded-2xl">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Eye size={16} className="text-zinc-500" />
                      <span className="text-lg font-bold text-zinc-800">{listing.views}</span>
                    </div>
                    <p className="text-xs text-zinc-500">Views</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Heart size={16} className="text-zinc-500" />
                      <span className="text-lg font-bold text-zinc-800">{listing.likes}</span>
                    </div>
                    <p className="text-xs text-zinc-500">Likes</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <MessageCircle size={16} className="text-zinc-500" />
                      <span className="text-lg font-bold text-zinc-800">{listing.messages}</span>
                    </div>
                    <p className="text-xs text-zinc-500">Messages</p>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-zinc-800 mb-3">Description</h3>
                  <p className="text-zinc-600 leading-relaxed">
                    {listing.description}
                  </p>
                </div>

                {/* Environmental Impact */}
                <div className="mb-6 bg-gradient-to-br from-green-500 to-green-600 rounded-[2rem] p-6 text-white">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                      <Leaf size={28} />
                    </div>
                    <div className="flex-1">
                      <p className="text-white/90 text-sm font-medium mb-1">
                        Environmental Impact
                      </p>
                      <p className="text-2xl font-bold">
                        {(listing.co2Saved / 1000).toFixed(1)}kg CO₂ Saved
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-white/90">
                    By choosing this pre-loved item, you're helping reduce carbon emissions and supporting sustainable shopping.
                  </p>
                </div>

                {/* Sales Analytics (if sold) */}
                {listing.status === 'sold' && listing.salesData && <div className="mb-6 bg-white border-2 border-zinc-200 rounded-[2rem] p-6">
                    <h3 className="text-lg font-semibold text-zinc-800 mb-4 flex items-center gap-2">
                      <TrendingUp size={20} className="text-[#005C4B]" />
                      Sales Analytics
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-[#DDF247]/20 rounded-2xl p-4">
                        <p className="text-sm text-zinc-600 mb-1">Sold For</p>
                        <p className="text-2xl font-bold text-[#005C4B]">
                          ${listing.salesData.soldPrice.toFixed(2)}
                        </p>
                      </div>
                      <div className="bg-zinc-50 rounded-2xl p-4">
                        <p className="text-sm text-zinc-600 mb-1">Total Views</p>
                        <p className="text-2xl font-bold text-zinc-800">
                          {listing.salesData.totalViews}
                        </p>
                      </div>
                      <div className="bg-zinc-50 rounded-2xl p-4">
                        <p className="text-sm text-zinc-600 mb-1">Days Listed</p>
                        <p className="text-2xl font-bold text-zinc-800">
                          {listing.salesData.daysListed}
                        </p>
                      </div>
                      <div className="bg-zinc-50 rounded-2xl p-4">
                        <p className="text-sm text-zinc-600 mb-1">Sold Date</p>
                        <p className="text-sm font-semibold text-zinc-800">
                          {formatDate(listing.salesData.soldDate)}
                        </p>
                      </div>
                    </div>
                  </div>}

                {/* Seller Info */}
                <div className="mb-6 bg-white border-2 border-zinc-200 rounded-[2rem] p-6">
                  <h3 className="text-lg font-semibold text-zinc-800 mb-4">Seller Information</h3>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#DDF247] to-[#B8E635] rounded-full flex items-center justify-center">
                      <User size={28} className="text-[#005C4B]" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-zinc-800">{listing.seller.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-[#005C4B] font-semibold">
                          ★ {listing.seller.rating.toFixed(1)}
                        </span>
                        <span className="text-sm text-zinc-500">
                          • Responds in {listing.seller.responseTime}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-zinc-600">
                    <MapPin size={16} />
                    <span>{listing.location}</span>
                  </div>
                </div>

                {/* Listing Details */}
                <div className="bg-zinc-50 rounded-2xl p-6">
                  <div className="flex items-center gap-2 text-sm text-zinc-600">
                    <Calendar size={16} />
                    <span>Listed {formatDate(listing.listedDate)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Action Button */}
            {!isOwner && listing.status === 'active' && <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent">
                <button className="w-full py-5 rounded-[2rem] bg-gradient-to-r from-[#DDF247] to-[#B8E635] text-[#2A1805] font-bold text-lg hover:shadow-xl transition-all cursor-pointer">
                  Contact Seller
                </button>
              </div>}
          </motion.div>
        </>}
    </AnimatePresence>;
};