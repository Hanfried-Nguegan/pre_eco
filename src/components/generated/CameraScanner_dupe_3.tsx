"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Camera, ScanLine, Package, Leaf, Award, Droplets, CheckCircle2 } from 'lucide-react';
import { cn } from '../../lib/utils';
export interface CameraScannerProps {
  onBack?: () => void;
  onItemScanned?: (item: ScannedItem) => void;
  onNavigateToRecycleOrder?: () => void;
}
export interface ScannedItem {
  id: string;
  name: string;
  type: string;
  description: string;
  recyclable: boolean;
  points: number;
  co2Saved: string;
  instructions: string[];
  category: string;
}

// Mock scanned data - in production this would come from QR code scanning
const mockScannedData: ScannedItem[] = [{
  id: '1',
  name: 'High Density Polyethylene',
  type: 'HDPE',
  description: 'Type 2 plastic commonly used in milk jugs, detergent bottles, and juice containers.',
  recyclable: true,
  points: 15,
  co2Saved: '45g',
  instructions: ['Empty and rinse the container thoroughly', 'Remove any labels or caps (recycle separately)', 'Flatten large containers to save space', 'Place in your blue recycling bin'],
  category: 'PLASTIC'
}, {
  id: '2',
  name: 'Polyethylene Terephthalate',
  type: 'PET',
  description: 'Type 1 plastic used in water bottles, soft drink bottles, and food containers.',
  recyclable: true,
  points: 12,
  co2Saved: '38g',
  instructions: ['Remove the cap and rinse the bottle', 'Crush the bottle to reduce volume', 'Keep the bottle and cap separate', 'Drop in designated PET recycling bins'],
  category: 'PLASTIC'
}, {
  id: '3',
  name: 'Aluminum Can',
  type: 'ALU',
  description: 'Recyclable aluminum beverage container.',
  recyclable: true,
  points: 20,
  co2Saved: '62g',
  instructions: ['Empty and rinse the can', 'Crush to save space (optional)', 'No need to remove labels', 'Place in metal recycling bin'],
  category: 'METAL'
}];
export const CameraScanner = ({
  onBack,
  onItemScanned,
  onNavigateToRecycleOrder
}: CameraScannerProps) => {
  const [isScanning, setIsScanning] = useState(true);
  const [scannedItem, setScannedItem] = useState<ScannedItem | null>(null);
  const [scanProgress, setScanProgress] = useState(0);

  // Simulate scanning animation
  useEffect(() => {
    if (isScanning && !scannedItem) {
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            // Simulate successful scan after progress completes
            setTimeout(() => {
              setScannedItem(mockScannedData[Math.floor(Math.random() * mockScannedData.length)]);
              setIsScanning(false);
            }, 300);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isScanning, scannedItem]);
  const handleAddToOrder = () => {
    if (scannedItem) {
      onItemScanned?.(scannedItem);
      onNavigateToRecycleOrder?.();
    }
  };
  const handleRescan = () => {
    setScannedItem(null);
    setIsScanning(true);
    setScanProgress(0);
  };
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'PLASTIC':
        return 'bg-purple-100 text-purple-600';
      case 'METAL':
        return 'bg-blue-100 text-blue-600';
      case 'PAPER':
        return 'bg-orange-100 text-orange-600';
      case 'GLASS':
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-zinc-100 text-zinc-600';
    }
  };
  return <div className="fixed inset-0 z-[100] bg-black flex flex-col font-sans overflow-hidden">
      {/* Camera View / Scanning Area */}
      <div className="relative flex-1 bg-gradient-to-br from-zinc-900 to-black overflow-hidden">
        {/* Mock camera feed with noise effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.1),transparent_50%)]" />
          <svg className="w-full h-full opacity-30">
            <filter id="noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" opacity="0.5" />
          </svg>
        </div>

        {/* Header Controls */}
        <div className="absolute top-0 left-0 right-0 z-20 p-6 bg-gradient-to-b from-black/60 to-transparent">
          <div className="flex items-center justify-between">
            <button onClick={onBack} className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors">
              <ArrowLeft className="text-white" size={24} />
            </button>

            <div className="flex items-center gap-2">
              <Camera className="text-white" size={20} />
              <span className="text-white font-semibold text-sm">Camera Scanner</span>
            </div>

            <div className="w-12" /> {/* Spacer for centering */}
          </div>
        </div>

        {/* Instruction Text */}
        <AnimatePresence mode="wait">
          {isScanning && !scannedItem && <motion.div initial={{
          opacity: 0,
          y: -20
        }} animate={{
          opacity: 1,
          y: 0
        }} exit={{
          opacity: 0,
          y: -20
        }} className="absolute top-24 left-0 right-0 z-20 px-6">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 max-w-md mx-auto">
                <p className="text-white text-center font-medium">
                  Place recycling code in the frame
                </p>
              </div>
            </motion.div>}
        </AnimatePresence>

        {/* Scanning Frame */}
        <AnimatePresence mode="wait">
          {isScanning && !scannedItem && <motion.div initial={{
          scale: 0.8,
          opacity: 0
        }} animate={{
          scale: 1,
          opacity: 1
        }} exit={{
          scale: 0.8,
          opacity: 0
        }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              {/* Main scanning frame */}
              <div className="relative w-72 h-72 flex items-center justify-center">
                {/* Corner markers */}
                <div className="absolute inset-0">
                  {/* Top-left corner */}
                  <div className="absolute top-0 left-0 w-12 h-12 border-l-4 border-t-4 border-white rounded-tl-2xl" />
                  {/* Top-right corner */}
                  <div className="absolute top-0 right-0 w-12 h-12 border-r-4 border-t-4 border-white rounded-tr-2xl" />
                  {/* Bottom-left corner */}
                  <div className="absolute bottom-0 left-0 w-12 h-12 border-l-4 border-b-4 border-white rounded-bl-2xl" />
                  {/* Bottom-right corner */}
                  <div className="absolute bottom-0 right-0 w-12 h-12 border-r-4 border-b-4 border-white rounded-br-2xl" />
                </div>

                {/* Scanning line animation */}
                <motion.div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#DDF247] to-transparent shadow-[0_0_20px_rgba(221,242,71,0.8)]" animate={{
              y: [-140, 140]
            }} transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }} />

                {/* Pulsing glow effect */}
                <motion.div className="absolute inset-0 border-2 border-white/30 rounded-3xl" animate={{
              scale: [1, 1.05, 1],
              opacity: [0.3, 0.6, 0.3]
            }} transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }} />

                {/* Center icon */}
                <motion.div animate={{
              scale: [1, 1.1, 1]
            }} transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}>
                  <ScanLine className="text-white" size={48} />
                </motion.div>
              </div>

              {/* Progress indicator */}
              <div className="mt-6">
                <div className="h-1.5 w-72 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                  <motion.div className="h-full bg-gradient-to-r from-[#005C4B] to-[#DDF247]" initial={{
                width: 0
              }} animate={{
                width: `${scanProgress}%`
              }} transition={{
                duration: 0.1
              }} />
                </div>
                <p className="text-white/80 text-sm text-center mt-2 font-medium">
                  Scanning... {scanProgress}%
                </p>
              </div>
            </motion.div>}
        </AnimatePresence>

        {/* Scanned Item Detail Card */}
        <AnimatePresence>
          {scannedItem && <motion.div initial={{
          y: '100%'
        }} animate={{
          y: 0
        }} exit={{
          y: '100%'
        }} transition={{
          type: 'spring',
          damping: 30,
          stiffness: 300
        }} className="absolute inset-x-0 bottom-0 max-h-[85vh] bg-white rounded-t-[2.5rem] shadow-2xl overflow-hidden">
              {/* Success indicator */}
              <div className="bg-gradient-to-r from-[#005C4B] to-[#DDF247] px-6 py-4">
                <div className="flex items-center justify-center gap-2">
                  <motion.div initial={{
                scale: 0
              }} animate={{
                scale: 1
              }} transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20
              }}>
                    <CheckCircle2 className="text-white" size={24} />
                  </motion.div>
                  <span className="text-white font-bold">Item Scanned Successfully!</span>
                </div>
              </div>

              {/* Scrollable content */}
              <div className="overflow-y-auto max-h-[calc(85vh-5rem)] px-6 pb-32">
                {/* Material Info Header */}
                <div className="py-6 border-b border-zinc-100">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-[#DDF247] rounded-2xl flex items-center justify-center shrink-0">
                      <Package className="text-[#2A1805]" size={32} />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-zinc-800 mb-2">
                        {scannedItem.name}
                      </h2>
                      <div className="flex items-center gap-2">
                        <span className={cn('px-3 py-1 rounded-full text-xs font-bold', getCategoryColor(scannedItem.category))}>
                          {scannedItem.type}
                        </span>
                        <span className="text-sm text-zinc-500">
                          {scannedItem.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-zinc-600 text-sm leading-relaxed">
                    {scannedItem.description}
                  </p>
                </div>

                {/* Recyclable Status */}
                <div className="py-6 border-b border-zinc-100">
                  <div className="flex items-center justify-center gap-3 p-4 bg-green-50 rounded-2xl">
                    <Leaf className="text-green-600" size={24} />
                    <span className="text-green-700 font-semibold text-lg">
                      {scannedItem.recyclable ? '✓ Recyclable' : '✗ Not Recyclable'}
                    </span>
                  </div>
                </div>

                {/* Rewards Info */}
                <div className="py-6 border-b border-zinc-100">
                  <h3 className="text-lg font-semibold text-zinc-800 mb-4">
                    Environmental Impact
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {/* Points */}
                    <motion.div initial={{
                  opacity: 0,
                  scale: 0.9
                }} animate={{
                  opacity: 1,
                  scale: 1
                }} transition={{
                  delay: 0.2
                }} className="bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="text-purple-600" size={20} />
                        <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide">
                          Points
                        </span>
                      </div>
                      <p className="text-3xl font-bold text-purple-700">+{scannedItem.points}</p>
                    </motion.div>

                    {/* CO2 Saved */}
                    <motion.div initial={{
                  opacity: 0,
                  scale: 0.9
                }} animate={{
                  opacity: 1,
                  scale: 1
                }} transition={{
                  delay: 0.3
                }} className="bg-gradient-to-br from-[#DDF247] to-[#B8E635] rounded-2xl p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <Droplets className="text-[#005C4B]" size={20} />
                        <span className="text-xs font-semibold text-[#005C4B] uppercase tracking-wide">
                          CO2 Saved
                        </span>
                      </div>
                      <p className="text-3xl font-bold text-[#2A1805]">{scannedItem.co2Saved}</p>
                    </motion.div>
                  </div>
                </div>

                {/* Recycling Instructions */}
                <div className="py-6">
                  <h3 className="text-lg font-semibold text-zinc-800 mb-4 flex items-center gap-2">
                    <span>How to recycle it</span>
                  </h3>
                  <div className="space-y-3">
                    {scannedItem.instructions.map((instruction, index) => <motion.div key={index} initial={{
                  opacity: 0,
                  x: -20
                }} animate={{
                  opacity: 1,
                  x: 0
                }} transition={{
                  delay: 0.4 + index * 0.1
                }} className="flex items-start gap-3 p-4 bg-zinc-50 rounded-2xl">
                        <div className="w-6 h-6 bg-[#005C4B] rounded-full flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-white text-xs font-bold">{index + 1}</span>
                        </div>
                        <p className="text-sm text-zinc-700 leading-relaxed flex-1">
                          {instruction}
                        </p>
                      </motion.div>)}
                  </div>
                </div>
              </div>

              {/* Bottom Action Buttons */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent">
                <div className="flex gap-3">
                  <button onClick={handleRescan} className="flex-1 py-4 rounded-[2rem] font-semibold text-base bg-zinc-100 text-zinc-700 hover:bg-zinc-200 transition-all">
                    Scan Another
                  </button>
                  <button onClick={handleAddToOrder} className="flex-1 py-4 rounded-[2rem] font-semibold text-base bg-gradient-to-r from-[#005C4B] to-[#DDF247] text-white hover:shadow-xl transition-all">
                    ADD TO RECYCLE ORDER
                  </button>
                </div>
              </div>
            </motion.div>}
        </AnimatePresence>
      </div>
    </div>;
};
export default CameraScanner;