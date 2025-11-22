"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Navigation, Phone, Mail, Globe, Clock, Star, Heart, Share2, Car, Accessibility, ShieldCheck, Package, Droplets, Shirt, FileText, WineIcon as Glass } from 'lucide-react';
import { cn } from '../../lib/utils';
type RecyclingType = 'PLASTIC' | 'GLASS' | 'PAPER' | 'CLOTHES';
type MarkerData = {
  id: string;
  name: string;
  distance: string;
  lat: number;
  lng: number;
  type: RecyclingType[];
};
interface RecyclingCenterDetailModalProps {
  markerData: MarkerData;
  onClose: () => void;
  isOpen: boolean;
  onStartNavigation?: (destination: MarkerData) => void;
}

// Mock detailed data for the recycling center
const getDetailedCenterData = (markerData: MarkerData) => {
  return {
    ...markerData,
    fullAddress: "Böllinger 27, 74078 Heilbronn",
    phone: "+1 (555) 123-4567",
    email: "info@recyclecenter.com",
    website: "www.recyclecenter.com",
    rating: 4.5,
    reviewCount: 128,
    operatingHours: [{
      day: 'Monday - Friday',
      hours: '8:00 AM - 6:00 PM'
    }, {
      day: 'Saturday',
      hours: '9:00 AM - 4:00 PM'
    }, {
      day: 'Sunday',
      hours: 'Closed'
    }],
    facilities: [{
      icon: Car,
      label: 'Free Parking'
    }, {
      icon: Accessibility,
      label: 'Wheelchair Access'
    }, {
      icon: ShieldCheck,
      label: 'Covered Area'
    }],
    acceptedMaterials: [{
      type: 'PLASTIC',
      icon: Package,
      description: 'PET, HDPE bottles, containers, bags',
      color: 'bg-purple-100 text-purple-600'
    }, {
      type: 'GLASS',
      icon: Glass,
      description: 'Clear, brown, green bottles and jars',
      color: 'bg-blue-100 text-blue-600'
    }, {
      type: 'PAPER',
      icon: FileText,
      description: 'Newspapers, cardboard, office paper',
      color: 'bg-orange-100 text-orange-600'
    }, {
      type: 'CLOTHES',
      icon: Shirt,
      description: 'Clean textiles, shoes, accessories',
      color: 'bg-pink-100 text-pink-600'
    }],
    photos: ['https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=500', 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=500', 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=500', 'https://images.unsplash.com/photo-1607889767333-b8e9e6e7e4f1?w=500'],
    reviews: [{
      id: 1,
      name: 'Sarah Johnson',
      rating: 5,
      comment: 'Great facility! Very clean and organized. Staff is helpful.',
      date: '2 days ago'
    }, {
      id: 2,
      name: 'Mike Chen',
      rating: 4,
      comment: 'Easy to find and drop off. Could use more signage inside.',
      date: '1 week ago'
    }, {
      id: 3,
      name: 'Emma Davis',
      rating: 5,
      comment: 'Love how they accept so many types of materials!',
      date: '2 weeks ago'
    }]
  };
};
const RecyclingTypeIcon = ({
  type
}: {
  type: RecyclingType;
}) => {
  const iconMap = {
    PLASTIC: Package,
    GLASS: Glass,
    PAPER: FileText,
    CLOTHES: Shirt
  };
  const Icon = iconMap[type];
  return <Icon size={16} />;
};
export const RecyclingCenterDetailModal: React.FC<RecyclingCenterDetailModalProps> = ({
  markerData,
  onClose,
  isOpen,
  onStartNavigation
}) => {
  const detailedData = getDetailedCenterData(markerData);
  const [isFavorited, setIsFavorited] = React.useState(false);
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
            {/* Header with Image Gallery */}
            <div className="relative">
              {/* Photo Gallery */}
              <div className="relative h-56 bg-gradient-to-br from-zinc-200 to-zinc-300 overflow-hidden">
                <div className="flex gap-2 h-full">
                  {detailedData.photos.map((photo, index) => <motion.div key={index} initial={{
                opacity: 0,
                scale: 0.8
              }} animate={{
                opacity: 1,
                scale: 1
              }} transition={{
                delay: index * 0.1
              }} className="flex-1 relative">
                      <img src={photo} alt={`Center photo ${index + 1}`} className="w-full h-full object-cover" />
                    </motion.div>)}
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
            <div className="overflow-y-auto max-h-[calc(90vh-14rem)] px-6 pb-8">
              {/* Title Section */}
              <div className="py-6 border-b border-zinc-100">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-zinc-800 mb-2">
                      {detailedData.name}
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-zinc-500 mb-2">
                      <Navigation size={14} />
                      <span>{detailedData.distance} from you</span>
                    </div>
                    <p className="text-sm text-zinc-600 flex items-start gap-2">
                      <MapPin size={14} className="mt-0.5 shrink-0" />
                      <span>{detailedData.fullAddress}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-1 bg-[#DDF247] px-3 py-1.5 rounded-full">
                    <Star size={16} className="text-[#2A1805] fill-[#2A1805]" />
                    <span className="text-sm font-bold text-[#2A1805]">{detailedData.rating}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <span>{detailedData.reviewCount} reviews</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 py-6 border-b border-zinc-100">
                <button onClick={() => {
              onStartNavigation?.(markerData);
            }} className="flex items-center justify-center gap-2 py-3 px-4 bg-[#2A1805] text-white rounded-[1.5rem] font-semibold text-sm hover:bg-[#1a1005] transition-all hover:scale-[1.02] active:scale-[0.98]">
                  <Navigation size={18} />
                  Get Directions
                </button>
                <button className="flex items-center justify-center gap-2 py-3 px-4 bg-[#005C4B] text-white rounded-[1.5rem] font-semibold text-sm hover:bg-[#004a3d] transition-all hover:scale-[1.02] active:scale-[0.98]">
                  <Phone size={18} />
                  Call
                </button>
                <button onClick={() => setIsFavorited(!isFavorited)} className={cn("flex items-center justify-center gap-2 py-3 px-4 rounded-[1.5rem] font-semibold text-sm transition-all hover:scale-[1.02] active:scale-[0.98]", isFavorited ? "bg-pink-100 text-pink-600" : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200")}>
                  <Heart size={18} className={isFavorited ? "fill-pink-600" : ""} />
                  {isFavorited ? 'Favorited' : 'Favorite'}
                </button>
                <button className="flex items-center justify-center gap-2 py-3 px-4 bg-zinc-100 text-zinc-700 rounded-[1.5rem] font-semibold text-sm hover:bg-zinc-200 transition-all hover:scale-[1.02] active:scale-[0.98]">
                  <Share2 size={18} />
                  Share
                </button>
              </div>

              {/* Operating Hours */}
              <div className="py-6 border-b border-zinc-100">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Clock className="text-purple-600" size={20} />
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-800">Operating Hours</h3>
                </div>
                <div className="space-y-3">
                  {detailedData.operatingHours.map((schedule, index) => <div key={index} className="flex justify-between items-center">
                      <span className="text-sm font-medium text-zinc-700">{schedule.day}</span>
                      <span className={cn("text-sm font-semibold", schedule.hours === 'Closed' ? "text-red-500" : "text-[#005C4B]")}>
                        {schedule.hours}
                      </span>
                    </div>)}
                </div>
              </div>

              {/* Accepted Materials */}
              <div className="py-6 border-b border-zinc-100">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 bg-[#DDF247] rounded-xl flex items-center justify-center">
                    <Package className="text-[#2A1805]" size={20} />
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-800">Accepted Materials</h3>
                </div>
                <div className="space-y-3">
                  {detailedData.acceptedMaterials.filter(material => detailedData.type.includes(material.type as RecyclingType)).map((material, index) => {
                const Icon = material.icon;
                return <motion.div key={material.type} initial={{
                  opacity: 0,
                  x: -20
                }} animate={{
                  opacity: 1,
                  x: 0
                }} transition={{
                  delay: index * 0.1
                }} className="flex items-start gap-3 p-4 bg-zinc-50 rounded-2xl">
                          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", material.color)}>
                            <Icon size={20} />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-zinc-800 mb-1">{material.type}</h4>
                            <p className="text-xs text-zinc-600">{material.description}</p>
                          </div>
                        </motion.div>;
              })}
                </div>
              </div>

              {/* Facilities */}
              <div className="py-6 border-b border-zinc-100">
                <h3 className="text-lg font-semibold text-zinc-800 mb-4">Facilities</h3>
                <div className="grid grid-cols-3 gap-3">
                  {detailedData.facilities.map((facility, index) => {
                const Icon = facility.icon;
                return <motion.div key={index} initial={{
                  opacity: 0,
                  scale: 0.8
                }} animate={{
                  opacity: 1,
                  scale: 1
                }} transition={{
                  delay: index * 0.1
                }} className="flex flex-col items-center gap-2 p-4 bg-[#005C4B]/5 rounded-2xl">
                        <div className="w-10 h-10 bg-[#005C4B] rounded-xl flex items-center justify-center">
                          <Icon className="text-white" size={20} />
                        </div>
                        <span className="text-xs font-medium text-zinc-700 text-center">{facility.label}</span>
                      </motion.div>;
              })}
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

              {/* Reviews */}
              <div className="py-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-zinc-800">Reviews</h3>
                  <button className="text-sm font-semibold text-[#005C4B] hover:text-[#004a3d]">
                    See all
                  </button>
                </div>
                <div className="space-y-4">
                  {detailedData.reviews.map(review => <motion.div key={review.id} initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} className="p-4 bg-zinc-50 rounded-2xl">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-zinc-800 text-sm">{review.name}</h4>
                          <div className="flex items-center gap-1 mt-1">
                            {[...Array(5)].map((_, i) => <Star key={i} size={12} className={cn(i < review.rating ? "text-[#DDF247] fill-[#DDF247]" : "text-zinc-300")} />)}
                          </div>
                        </div>
                        <span className="text-xs text-zinc-500">{review.date}</span>
                      </div>
                      <p className="text-sm text-zinc-600 leading-relaxed">{review.comment}</p>
                    </motion.div>)}
                </div>
              </div>
            </div>
          </motion.div>
        </>}
    </AnimatePresence>;
};
export default RecyclingCenterDetailModal;