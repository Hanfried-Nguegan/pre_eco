"use client";

import React, { useState } from 'react';
import { ListingDetailCard, ListingDetail } from './ListingDetailCard';

// Example listing data for demonstration
const exampleListing: ListingDetail = {
  id: '1',
  name: 'Vintage Leather Jacket',
  description: 'Beautiful brown leather jacket in excellent condition. Genuine leather with minimal wear on the cuffs and collar. Features two front pockets, inner lining in pristine condition. Perfect for fall and winter. Originally purchased from a premium boutique. Smoke-free and pet-free home.',
  category: 'Clothing',
  price: 89.99,
  originalPrice: 249.99,
  condition: 'Good',
  images: ['https://picsum.photos/seed/jacket1/600/600', 'https://picsum.photos/seed/jacket2/600/600', 'https://picsum.photos/seed/jacket3/600/600'],
  status: 'active',
  listedDate: '2024-01-10',
  views: 145,
  likes: 23,
  messages: 8,
  location: 'Brooklyn, NY',
  seller: {
    name: 'Sarah Martinez',
    rating: 4.8,
    responseTime: '2 hours'
  },
  co2Saved: 15200
};
export const ListingDetailExample = () => {
  const [isOpen, setIsOpen] = useState(false);
  return <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-6" data-magicpath-id="0" data-magicpath-path="ListingDetailExample_dupe_1_dupe_1.tsx">
      <button onClick={() => setIsOpen(true)} className="px-8 py-4 bg-gradient-to-r from-[#DDF247] to-[#B8E635] text-[#2A1805] rounded-[2rem] font-semibold text-lg hover:shadow-lg transition-all" data-magicpath-id="1" data-magicpath-path="ListingDetailExample_dupe_1_dupe_1.tsx">
        View Listing Details
      </button>

      <ListingDetailCard listing={exampleListing} isOpen={isOpen} onClose={() => setIsOpen(false)} onEdit={() => console.log('Edit clicked')} onDelete={() => console.log('Delete clicked')} onShare={() => console.log('Share clicked')} isOwner={true} data-magicpath-id="2" data-magicpath-path="ListingDetailExample_dupe_1_dupe_1.tsx" />
    </div>;
};