"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Camera, ScanLine, Package, Leaf, Award, Droplets, CheckCircle2 } from 'lucide-react';
import { cn } from '../../lib/utils';
export interface CameraScannerProps {
  onBack?: () => void;
  onItemScanned?: (item: ScannedItem) => void;
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
  onItemScanned
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
      // Reset for next scan or go back
      onBack?.();
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
  return <div className="fixed inset-0 z-[100] bg-black flex flex-col font-sans overflow-hidden" data-magicpath-id="0" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">
      {/* Camera View / Scanning Area */}
      <div className="relative flex-1 bg-gradient-to-br from-zinc-900 to-black overflow-hidden" data-magicpath-id="1" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">
        {/* Mock camera feed with noise effect */}
        <div className="absolute inset-0 opacity-20" data-magicpath-id="2" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.1),transparent_50%)]" data-magicpath-id="3" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx" />
          <svg className="w-full h-full opacity-30" data-magicpath-id="4" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">
            <filter id="noise" data-magicpath-id="5" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" data-magicpath-id="6" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" opacity="0.5" data-magicpath-id="7" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx" />
          </svg>
        </div>

        {/* Header Controls */}
        <div className="absolute top-0 left-0 right-0 z-20 p-6 bg-gradient-to-b from-black/60 to-transparent" data-magicpath-id="8" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">
          <div className="flex items-center justify-between" data-magicpath-id="9" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">
            <button onClick={onBack} className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors" data-magicpath-id="10" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">
              <ArrowLeft className="text-white" size={24} data-magicpath-id="11" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx" />
            </button>

            <div className="flex items-center gap-2" data-magicpath-id="12" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">
              <Camera className="text-white" size={20} />
              <span className="text-white font-semibold text-sm" data-magicpath-id="13" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">Camera Scanner</span>
            </div>

            <div className="w-12" data-magicpath-id="14" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx" /> {/* Spacer for centering */}
          </div>
        </div>

        {/* Instruction Text */}
        <AnimatePresence mode="wait" data-magicpath-id="15" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">
          {isScanning && !scannedItem && <motion.div initial={{
          opacity: 0,
          y: -20
        }} animate={{
          opacity: 1,
          y: 0
        }} exit={{
          opacity: 0,
          y: -20
        }} className="absolute top-24 left-0 right-0 z-20 px-6" data-magicpath-id="16" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 max-w-md mx-auto" data-magicpath-id="17" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">
                <p className="text-white text-center font-medium" data-magicpath-id="18" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">
                  Place recycling code in the frame
                </p>
              </div>
            </motion.div>}
        </AnimatePresence>

        {/* Scanning Frame */}
        <AnimatePresence mode="wait" data-magicpath-id="19" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">
          {isScanning && !scannedItem && <motion.div initial={{
          scale: 0.8,
          opacity: 0
        }} animate={{
          scale: 1,
          opacity: 1
        }} exit={{
          scale: 0.8,
          opacity: 0
        }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10" data-magicpath-id="20" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">
              {/* Main scanning frame */}
              <div className="relative w-72 h-72 flex items-center justify-center" data-magicpath-id="21" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">
                {/* Corner markers */}
                <div className="absolute inset-0" data-magicpath-id="22" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">
                  {/* Top-left corner */}
                  <div className="absolute top-0 left-0 w-12 h-12 border-l-4 border-t-4 border-white rounded-tl-2xl" data-magicpath-id="23" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx" />
                  {/* Top-right corner */}
                  <div className="absolute top-0 right-0 w-12 h-12 border-r-4 border-t-4 border-white rounded-tr-2xl" data-magicpath-id="24" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx" />
                  {/* Bottom-left corner */}
                  <div className="absolute bottom-0 left-0 w-12 h-12 border-l-4 border-b-4 border-white rounded-bl-2xl" data-magicpath-id="25" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx" />
                  {/* Bottom-right corner */}
                  <div className="absolute bottom-0 right-0 w-12 h-12 border-r-4 border-b-4 border-white rounded-br-2xl" data-magicpath-id="26" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx" />
                </div>

                {/* Scanning line animation */}
                <motion.div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#DDF247] to-transparent shadow-[0_0_20px_rgba(221,242,71,0.8)]" animate={{
              y: [-140, 140]
            }} transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }} data-magicpath-id="27" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx" />

                {/* Pulsing glow effect */}
                <motion.div className="absolute inset-0 border-2 border-white/30 rounded-3xl" animate={{
              scale: [1, 1.05, 1],
              opacity: [0.3, 0.6, 0.3]
            }} transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }} data-magicpath-id="28" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx" />

                {/* Center icon */}
                <motion.div animate={{
              scale: [1, 1.1, 1]
            }} transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }} data-magicpath-id="29" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">
                  <ScanLine className="text-white" size={48} data-magicpath-id="30" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx" />
                </motion.div>
              </div>

              {/* Progress indicator */}
              <div className="mt-6" data-magicpath-id="31" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">
                <div className="h-1.5 w-72 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm" data-magicpath-id="32" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">
                  <motion.div className="h-full bg-gradient-to-r from-[#005C4B] to-[#DDF247]" initial={{
                width: 0
              }} animate={{
                width: `${scanProgress}%`
              }} transition={{
                duration: 0.1
              }} data-magicpath-id="33" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx" />
                </div>
                <p className="text-white/80 text-sm text-center mt-2 font-medium" data-magicpath-id="34" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">
                  Scanning... {scanProgress}%
                </p>
              </div>
            </motion.div>}
        </AnimatePresence>

        {/* Scanned Item Detail Card */}
        <AnimatePresence data-magicpath-id="35" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">
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
        }} className="absolute inset-x-0 bottom-0 max-h-[85vh] bg-white rounded-t-[2.5rem] shadow-2xl overflow-hidden" data-magicpath-id="36" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">
              {/* Success indicator */}
              <div className="bg-gradient-to-r from-[#005C4B] to-[#DDF247] px-6 py-4" data-magicpath-id="37" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">
                <div className="flex items-center justify-center gap-2" data-magicpath-id="38" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">
                  <motion.div initial={{
                scale: 0
              }} animate={{
                scale: 1
              }} transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20
              }} data-magicpath-id="39" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">
                    <CheckCircle2 className="text-white" size={24} data-magicpath-id="40" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx" />
                  </motion.div>
                  <span className="text-white font-bold" data-magicpath-id="41" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">Item Scanned Successfully!</span>
                </div>
              </div>

              {/* Scrollable content */}
              <div className="overflow-y-auto max-h-[calc(85vh-5rem)] px-6 pb-32" data-magicpath-id="42" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">
                {/* Material Info Header */}
                <div className="py-6 border-b border-zinc-100" data-magicpath-id="43" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">
                  <div className="flex items-start gap-4 mb-4" data-magicpath-id="44" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">
                    <div className="w-16 h-16 bg-[#DDF247] rounded-2xl flex items-center justify-center shrink-0" data-magicpath-id="45" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">
                      <Package className="text-[#2A1805]" size={32} data-magicpath-id="46" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx" />
                    </div>
                    <div className="flex-1" data-magicpath-id="47" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">
                      <h2 className="text-2xl font-bold text-zinc-800 mb-2" data-magicpath-id="48" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">
                        {scannedItem.name}
                      </h2>
                      <div className="flex items-center gap-2" data-magicpath-id="49" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">
                        <span className={cn('px-3 py-1 rounded-full text-xs font-bold', getCategoryColor(scannedItem.category))} data-magicpath-id="50" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">
                          {scannedItem.type}
                        </span>
                        <span className="text-sm text-zinc-500" data-magicpath-id="51" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">
                          {scannedItem.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-zinc-600 text-sm leading-relaxed" data-magicpath-id="52" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">
                    {scannedItem.description}
                  </p>
                </div>

                {/* Recyclable Status */}
                <div className="py-6 border-b border-zinc-100" data-magicpath-id="53" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">
                  <div className="flex items-center justify-center gap-3 p-4 bg-green-50 rounded-2xl" data-magicpath-id="54" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">
                    <Leaf className="text-green-600" size={24} data-magicpath-id="55" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx" />
                    <span className="text-green-700 font-semibold text-lg" data-magicpath-id="56" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">
                      {scannedItem.recyclable ? '✓ Recyclable' : '✗ Not Recyclable'}
                    </span>
                  </div>
                </div>

                {/* Rewards Info */}
                <div className="py-6 border-b border-zinc-100" data-magicpath-id="57" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">
                  <h3 className="text-lg font-semibold text-zinc-800 mb-4" data-magicpath-id="58" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">
                    Environmental Impact
                  </h3>
                  <div className="grid grid-cols-2 gap-4" data-magicpath-id="59" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">
                    {/* Points */}
                    <motion.div initial={{
                  opacity: 0,
                  scale: 0.9
                }} animate={{
                  opacity: 1,
                  scale: 1
                }} transition={{
                  delay: 0.2
                }} className="bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl p-5" data-magicpath-id="60" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">
                      <div className="flex items-center gap-2 mb-2" data-magicpath-id="61" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">
                        <Award className="text-purple-600" size={20} data-magicpath-id="62" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx" />
                        <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide" data-magicpath-id="63" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">
                          Points
                        </span>
                      </div>
                      <p className="text-3xl font-bold text-purple-700" data-magicpath-id="64" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">+{scannedItem.points}</p>
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
                }} className="bg-gradient-to-br from-[#DDF247] to-[#B8E635] rounded-2xl p-5" data-magicpath-id="65" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">
                      <div className="flex items-center gap-2 mb-2" data-magicpath-id="66" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">
                        <Droplets className="text-[#005C4B]" size={20} data-magicpath-id="67" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx" />
                        <span className="text-xs font-semibold text-[#005C4B] uppercase tracking-wide" data-magicpath-id="68" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">
                          CO2 Saved
                        </span>
                      </div>
                      <p className="text-3xl font-bold text-[#2A1805]" data-magicpath-id="69" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">{scannedItem.co2Saved}</p>
                    </motion.div>
                  </div>
                </div>

                {/* Recycling Instructions */}
                <div className="py-6" data-magicpath-id="70" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">
                  <h3 className="text-lg font-semibold text-zinc-800 mb-4 flex items-center gap-2" data-magicpath-id="71" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">
                    <span data-magicpath-id="72" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">How to recycle it</span>
                  </h3>
                  <div className="space-y-3" data-magicpath-id="73" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">
                    {scannedItem.instructions.map((instruction, index) => <motion.div key={index} initial={{
                  opacity: 0,
                  x: -20
                }} animate={{
                  opacity: 1,
                  x: 0
                }} transition={{
                  delay: 0.4 + index * 0.1
                }} className="flex items-start gap-3 p-4 bg-zinc-50 rounded-2xl" data-magicpath-id="74" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">
                        <div className="w-6 h-6 bg-[#005C4B] rounded-full flex items-center justify-center shrink-0 mt-0.5" data-magicpath-id="75" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">
                          <span className="text-white text-xs font-bold" data-magicpath-id="76" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">{index + 1}</span>
                        </div>
                        <p className="text-sm text-zinc-700 leading-relaxed flex-1" data-magicpath-id="77" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">
                          {instruction}
                        </p>
                      </motion.div>)}
                  </div>
                </div>
              </div>

              {/* Bottom Action Buttons */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent" data-magicpath-id="78" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">
                <div className="flex gap-3" data-magicpath-id="79" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">
                  <button onClick={handleRescan} className="flex-1 py-4 rounded-[2rem] font-semibold text-base bg-zinc-100 text-zinc-700 hover:bg-zinc-200 transition-all" data-magicpath-id="80" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">
                    Scan Another
                  </button>
                  <button onClick={handleAddToOrder} className="flex-1 py-4 rounded-[2rem] font-semibold text-base bg-gradient-to-r from-[#005C4B] to-[#DDF247] text-white hover:shadow-xl transition-all" data-magicpath-id="81" data-magicpath-path="CameraScanner_dupe_2_dupe_1_dupe_2.tsx">
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