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
    fullAddress: "123 Green Street, Eco District, NY 10001",
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
  return <Icon size={16} data-magicpath-id="0" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx" />;
};
export const RecyclingCenterDetailModal: React.FC<RecyclingCenterDetailModalProps> = ({
  markerData,
  onClose,
  isOpen,
  onStartNavigation
}) => {
  const detailedData = getDetailedCenterData(markerData);
  const [isFavorited, setIsFavorited] = React.useState(false);
  return <AnimatePresence data-magicpath-id="1" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">
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
      }} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]" onClick={onClose} data-magicpath-id="2" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx" />

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
      }} className="fixed bottom-0 left-0 right-0 z-[101] max-h-[90vh] bg-white rounded-t-[2.5rem] shadow-2xl overflow-hidden" data-magicpath-id="3" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">
            {/* Header with Image Gallery */}
            <div className="relative" data-magicpath-id="4" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">
              {/* Photo Gallery */}
              <div className="relative h-56 bg-gradient-to-br from-zinc-200 to-zinc-300 overflow-hidden" data-magicpath-id="5" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">
                <div className="flex gap-2 h-full" data-magicpath-id="6" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">
                  {detailedData.photos.map((photo, index) => <motion.div key={index} initial={{
                opacity: 0,
                scale: 0.8
              }} animate={{
                opacity: 1,
                scale: 1
              }} transition={{
                delay: index * 0.1
              }} className="flex-1 relative" data-magicpath-id="7" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">
                      <img src={photo} alt={`Center photo ${index + 1}`} className="w-full h-full object-cover" data-magicpath-id="8" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx" />
                    </motion.div>)}
                </div>
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" data-magicpath-id="9" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx" />
              </div>

              {/* Close Button */}
              <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors z-10" data-magicpath-id="10" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">
                <X className="text-zinc-800" size={20} data-magicpath-id="11" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx" />
              </button>

              {/* Drag Handle */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-white/60 rounded-full" data-magicpath-id="12" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx" />
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-14rem)] px-6 pb-8" data-magicpath-id="13" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">
              {/* Title Section */}
              <div className="py-6 border-b border-zinc-100" data-magicpath-id="14" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">
                <div className="flex items-start justify-between gap-4 mb-3" data-magicpath-id="15" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">
                  <div className="flex-1" data-magicpath-id="16" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">
                    <h2 className="text-2xl font-bold text-zinc-800 mb-2" data-magicpath-id="17" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">
                      {detailedData.name}
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-zinc-500 mb-2" data-magicpath-id="18" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">
                      <Navigation size={14} data-magicpath-id="19" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx" />
                      <span data-magicpath-id="20" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">{detailedData.distance} from you</span>
                    </div>
                    <p className="text-sm text-zinc-600 flex items-start gap-2" data-magicpath-id="21" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">
                      <MapPin size={14} className="mt-0.5 shrink-0" data-magicpath-id="22" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx" />
                      <span data-magicpath-id="23" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">{detailedData.fullAddress}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-1 bg-[#DDF247] px-3 py-1.5 rounded-full" data-magicpath-id="24" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">
                    <Star size={16} className="text-[#2A1805] fill-[#2A1805]" data-magicpath-id="25" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx" />
                    <span className="text-sm font-bold text-[#2A1805]" data-magicpath-id="26" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">{detailedData.rating}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-zinc-500" data-magicpath-id="27" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">
                  <span data-magicpath-id="28" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">{detailedData.reviewCount} reviews</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 py-6 border-b border-zinc-100" data-magicpath-id="29" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">
                <button onClick={() => {
              onStartNavigation?.(markerData);
            }} className="flex items-center justify-center gap-2 py-3 px-4 bg-[#2A1805] text-white rounded-[1.5rem] font-semibold text-sm hover:bg-[#1a1005] transition-all hover:scale-[1.02] active:scale-[0.98]" data-magicpath-id="30" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">
                  <Navigation size={18} data-magicpath-id="31" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx" />
                  Get Directions
                </button>
                <button className="flex items-center justify-center gap-2 py-3 px-4 bg-[#005C4B] text-white rounded-[1.5rem] font-semibold text-sm hover:bg-[#004a3d] transition-all hover:scale-[1.02] active:scale-[0.98]" data-magicpath-id="32" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">
                  <Phone size={18} data-magicpath-id="33" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx" />
                  Call
                </button>
                <button onClick={() => setIsFavorited(!isFavorited)} className={cn("flex items-center justify-center gap-2 py-3 px-4 rounded-[1.5rem] font-semibold text-sm transition-all hover:scale-[1.02] active:scale-[0.98]", isFavorited ? "bg-pink-100 text-pink-600" : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200")} data-magicpath-id="34" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">
                  <Heart size={18} className={isFavorited ? "fill-pink-600" : ""} data-magicpath-id="35" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx" />
                  {isFavorited ? 'Favorited' : 'Favorite'}
                </button>
                <button className="flex items-center justify-center gap-2 py-3 px-4 bg-zinc-100 text-zinc-700 rounded-[1.5rem] font-semibold text-sm hover:bg-zinc-200 transition-all hover:scale-[1.02] active:scale-[0.98]" data-magicpath-id="36" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">
                  <Share2 size={18} data-magicpath-id="37" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx" />
                  Share
                </button>
              </div>

              {/* Operating Hours */}
              <div className="py-6 border-b border-zinc-100" data-magicpath-id="38" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">
                <div className="flex items-center gap-2 mb-4" data-magicpath-id="39" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center" data-magicpath-id="40" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">
                    <Clock className="text-purple-600" size={20} data-magicpath-id="41" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx" />
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-800" data-magicpath-id="42" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">Operating Hours</h3>
                </div>
                <div className="space-y-3" data-magicpath-id="43" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">
                  {detailedData.operatingHours.map((schedule, index) => <div key={index} className="flex justify-between items-center" data-magicpath-id="44" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">
                      <span className="text-sm font-medium text-zinc-700" data-magicpath-id="45" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">{schedule.day}</span>
                      <span className={cn("text-sm font-semibold", schedule.hours === 'Closed' ? "text-red-500" : "text-[#005C4B]")} data-magicpath-id="46" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">
                        {schedule.hours}
                      </span>
                    </div>)}
                </div>
              </div>

              {/* Accepted Materials */}
              <div className="py-6 border-b border-zinc-100" data-magicpath-id="47" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">
                <div className="flex items-center gap-2 mb-4" data-magicpath-id="48" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">
                  <div className="w-10 h-10 bg-[#DDF247] rounded-xl flex items-center justify-center" data-magicpath-id="49" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">
                    <Package className="text-[#2A1805]" size={20} data-magicpath-id="50" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx" />
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-800" data-magicpath-id="51" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">Accepted Materials</h3>
                </div>
                <div className="space-y-3" data-magicpath-id="52" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">
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
                }} className="flex items-start gap-3 p-4 bg-zinc-50 rounded-2xl" data-magicpath-id="53" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">
                          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", material.color)} data-magicpath-id="54" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">
                            <Icon size={20} data-magicpath-id="55" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx" />
                          </div>
                          <div className="flex-1" data-magicpath-id="56" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">
                            <h4 className="font-semibold text-zinc-800 mb-1" data-magicpath-id="57" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">{material.type}</h4>
                            <p className="text-xs text-zinc-600" data-magicpath-id="58" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">{material.description}</p>
                          </div>
                        </motion.div>;
              })}
                </div>
              </div>

              {/* Facilities */}
              <div className="py-6 border-b border-zinc-100" data-magicpath-id="59" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">
                <h3 className="text-lg font-semibold text-zinc-800 mb-4" data-magicpath-id="60" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">Facilities</h3>
                <div className="grid grid-cols-3 gap-3" data-magicpath-id="61" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">
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
                }} className="flex flex-col items-center gap-2 p-4 bg-[#005C4B]/5 rounded-2xl" data-magicpath-id="62" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">
                        <div className="w-10 h-10 bg-[#005C4B] rounded-xl flex items-center justify-center" data-magicpath-id="63" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">
                          <Icon className="text-white" size={20} data-magicpath-id="64" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx" />
                        </div>
                        <span className="text-xs font-medium text-zinc-700 text-center" data-magicpath-id="65" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">{facility.label}</span>
                      </motion.div>;
              })}
                </div>
              </div>

              {/* Contact Information */}
              <div className="py-6 border-b border-zinc-100" data-magicpath-id="66" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">
                <h3 className="text-lg font-semibold text-zinc-800 mb-4" data-magicpath-id="67" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">Contact Information</h3>
                <div className="space-y-3" data-magicpath-id="68" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">
                  <a href={`tel:${detailedData.phone}`} className="flex items-center gap-3 p-3 hover:bg-zinc-50 rounded-xl transition-colors" data-magicpath-id="69" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0" data-magicpath-id="70" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">
                      <Phone className="text-blue-600" size={18} data-magicpath-id="71" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx" />
                    </div>
                    <span className="text-sm text-zinc-700" data-magicpath-id="72" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">{detailedData.phone}</span>
                  </a>
                  <a href={`mailto:${detailedData.email}`} className="flex items-center gap-3 p-3 hover:bg-zinc-50 rounded-xl transition-colors" data-magicpath-id="73" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center shrink-0" data-magicpath-id="74" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">
                      <Mail className="text-green-600" size={18} data-magicpath-id="75" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx" />
                    </div>
                    <span className="text-sm text-zinc-700" data-magicpath-id="76" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">{detailedData.email}</span>
                  </a>
                  <a href={`https://${detailedData.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 hover:bg-zinc-50 rounded-xl transition-colors" data-magicpath-id="77" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center shrink-0" data-magicpath-id="78" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">
                      <Globe className="text-purple-600" size={18} data-magicpath-id="79" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx" />
                    </div>
                    <span className="text-sm text-zinc-700" data-magicpath-id="80" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">{detailedData.website}</span>
                  </a>
                </div>
              </div>

              {/* Reviews */}
              <div className="py-6" data-magicpath-id="81" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">
                <div className="flex items-center justify-between mb-4" data-magicpath-id="82" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">
                  <h3 className="text-lg font-semibold text-zinc-800" data-magicpath-id="83" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">Reviews</h3>
                  <button className="text-sm font-semibold text-[#005C4B] hover:text-[#004a3d]" data-magicpath-id="84" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">
                    See all
                  </button>
                </div>
                <div className="space-y-4" data-magicpath-id="85" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">
                  {detailedData.reviews.map(review => <motion.div key={review.id} initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} className="p-4 bg-zinc-50 rounded-2xl" data-magicpath-id="86" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">
                      <div className="flex items-start justify-between mb-2" data-magicpath-id="87" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">
                        <div data-magicpath-id="88" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">
                          <h4 className="font-semibold text-zinc-800 text-sm" data-magicpath-id="89" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">{review.name}</h4>
                          <div className="flex items-center gap-1 mt-1" data-magicpath-id="90" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">
                            {[...Array(5)].map((_, i) => <Star key={i} size={12} className={cn(i < review.rating ? "text-[#DDF247] fill-[#DDF247]" : "text-zinc-300")} data-magicpath-id="91" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx" />)}
                          </div>
                        </div>
                        <span className="text-xs text-zinc-500" data-magicpath-id="92" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">{review.date}</span>
                      </div>
                      <p className="text-sm text-zinc-600 leading-relaxed" data-magicpath-id="93" data-magicpath-path="RecyclingCenterDetailModal_dupe_1_dupe_7_dupe_2.tsx">{review.comment}</p>
                    </motion.div>)}
                </div>
              </div>
            </div>
          </motion.div>
        </>}
    </AnimatePresence>;
};
export default RecyclingCenterDetailModal;