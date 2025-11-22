"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Navigation, Volume2, VolumeX, ArrowUpRight, ArrowRight, MapPin, Clock, Flag } from 'lucide-react';
type MarkerData = {
  id: string;
  name: string;
  distance: string;
  lat: number;
  lng: number;
  type: string[];
};
type DirectionStep = {
  id: number;
  instruction: string;
  distance: string;
  icon: 'left' | 'right' | 'straight' | 'arrive';
};
export interface NavigationWaypointProps {
  destination: MarkerData;
  onClose: () => void;
}
const directionSteps: DirectionStep[] = [{
  id: 1,
  instruction: "Head north on Main Street",
  distance: "120m",
  icon: "straight"
}, {
  id: 2,
  instruction: "Turn right onto Oak Avenue",
  distance: "250m",
  icon: "right"
}, {
  id: 3,
  instruction: "Turn left at the intersection",
  distance: "180m",
  icon: "left"
}, {
  id: 4,
  instruction: "Continue straight for 3 blocks",
  distance: "400m",
  icon: "straight"
}, {
  id: 5,
  instruction: "Turn right onto Elm Street",
  distance: "150m",
  icon: "right"
}, {
  id: 6,
  instruction: "Destination on your left",
  distance: "50m",
  icon: "arrive"
}];
export const NavigationWaypoint = ({
  destination,
  onClose
}: NavigationWaypointProps) => {
  const [isNavigating, setIsNavigating] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(8); // minutes
  const [distanceRemaining, setDistanceRemaining] = useState(1150); // meters

  // Progress calculation
  const totalSteps = directionSteps.length;
  const progressPercentage = (currentStep + 1) / totalSteps * 100;

  // Simulate navigation progress
  useEffect(() => {
    if (!isNavigating) return;
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < directionSteps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
      setTimeRemaining(prev => Math.max(0, prev - 1));
      setDistanceRemaining(prev => Math.max(0, prev - 150));
    }, 5000); // Progress every 5 seconds for demo

    return () => clearInterval(interval);
  }, [isNavigating]);
  const getStepIcon = (icon: string) => {
    switch (icon) {
      case 'left':
        return <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white" data-magicpath-id="0" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" data-magicpath-id="1" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx" />
          </svg>;
      case 'right':
        return <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white" data-magicpath-id="2" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" data-magicpath-id="3" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx" />
          </svg>;
      case 'straight':
        return <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white" data-magicpath-id="4" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">
            <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" data-magicpath-id="5" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx" />
          </svg>;
      case 'arrive':
        return <Flag className="text-white" size={32} strokeWidth={2.5} data-magicpath-id="6" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx" />;
      default:
        return <Navigation className="text-white" size={32} data-magicpath-id="7" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx" />;
    }
  };
  return <div className="fixed inset-0 z-[100] bg-zinc-50 flex flex-col font-sans overflow-hidden" data-magicpath-id="8" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">
      {/* Header */}
      <div className="relative bg-white shadow-sm px-6 py-4 z-20" data-magicpath-id="9" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">
        <div className="flex items-center justify-between" data-magicpath-id="10" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">
          <button onClick={onClose} className="p-2 hover:bg-zinc-100 rounded-xl transition-colors" data-magicpath-id="11" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">
            <ArrowLeft className="text-zinc-800" size={24} data-magicpath-id="12" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx" />
          </button>
          
          <div className="flex-1 text-center" data-magicpath-id="13" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">
            <h2 className="text-lg font-semibold text-zinc-800" data-magicpath-id="14" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">Navigation</h2>
          </div>

          <button onClick={() => setVoiceEnabled(!voiceEnabled)} className="p-2 hover:bg-zinc-100 rounded-xl transition-colors" data-magicpath-id="15" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">
            {voiceEnabled ? <Volume2 className="text-[#005C4B]" size={24} data-magicpath-id="16" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx" /> : <VolumeX className="text-zinc-400" size={24} data-magicpath-id="17" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx" />}
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 relative h-2 bg-zinc-100 rounded-full overflow-hidden" data-magicpath-id="18" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">
          <motion.div className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#005C4B] to-[#DDF247]" initial={{
          width: 0
        }} animate={{
          width: `${progressPercentage}%`
        }} transition={{
          duration: 0.5,
          ease: "easeOut"
        }} data-magicpath-id="19" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-32" data-magicpath-id="20" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">
        {/* Minimap Preview */}
        <div className="relative w-full h-64 bg-gradient-to-br from-zinc-100 to-zinc-200 overflow-hidden" data-magicpath-id="21" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">
          {/* Map Grid Pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-20" data-magicpath-id="22" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">
            <defs data-magicpath-id="23" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">
              <pattern id="nav-grid" width="40" height="40" patternUnits="userSpaceOnUse" data-magicpath-id="24" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#005C4B" strokeWidth="0.5" data-magicpath-id="25" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#nav-grid)" data-magicpath-id="26" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx" />
          </svg>

          {/* Animated Route Path */}
          <svg className="absolute inset-0 w-full h-full" data-magicpath-id="27" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">
            <motion.path d="M 50 220 L 50 180 Q 50 150 80 150 L 200 150 Q 230 150 230 120 L 230 40" stroke="#8b5cf6" strokeWidth="6" fill="none" strokeLinecap="round" strokeDasharray="12 8" initial={{
            pathLength: 0
          }} animate={{
            pathLength: progressPercentage / 100
          }} transition={{
            duration: 1,
            ease: "easeInOut"
          }} data-magicpath-id="28" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx" />
            
            {/* Current Location Marker */}
            <motion.circle cx="50" cy="220" r="10" fill="#005C4B" animate={{
            scale: [1, 1.2, 1]
          }} transition={{
            duration: 2,
            repeat: Infinity
          }} data-magicpath-id="29" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx" />
            
            {/* Destination Marker */}
            <circle cx="230" cy="40" r="8" fill="#8b5cf6" data-magicpath-id="30" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx" />
          </svg>

          {/* Overlay Stats */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start" data-magicpath-id="31" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg" data-magicpath-id="32" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">
              <div className="flex items-center gap-2" data-magicpath-id="33" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">
                <Clock className="text-[#005C4B]" size={16} data-magicpath-id="34" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx" />
                <span className="text-sm font-semibold text-zinc-800" data-magicpath-id="35" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">{timeRemaining} min</span>
              </div>
            </div>
            
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg" data-magicpath-id="36" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">
              <div className="flex items-center gap-2" data-magicpath-id="37" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">
                <Navigation className="text-[#005C4B]" size={16} data-magicpath-id="38" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx" />
                <span className="text-sm font-semibold text-zinc-800" data-magicpath-id="39" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">{distanceRemaining}m</span>
              </div>
            </div>
          </div>
        </div>

        {/* Current Step - Large Display */}
        <div className="p-6" data-magicpath-id="40" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">
          <AnimatePresence mode="wait" data-magicpath-id="41" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">
            <motion.div key={currentStep} initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} exit={{
            opacity: 0,
            y: -20
          }} transition={{
            duration: 0.3
          }} className="bg-[#2A1805] rounded-[2.5rem] p-8 mb-6 relative overflow-hidden" data-magicpath-id="42" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">
              {/* Decorative Background Pattern */}
              <div className="absolute top-0 right-0 w-48 h-48 opacity-5" data-magicpath-id="43" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">
                <svg viewBox="0 0 200 200" className="w-full h-full" data-magicpath-id="44" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">
                  <circle cx="100" cy="100" r="80" stroke="white" strokeWidth="2" fill="none" data-magicpath-id="45" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx" />
                  <circle cx="100" cy="100" r="60" stroke="white" strokeWidth="2" fill="none" data-magicpath-id="46" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx" />
                  <circle cx="100" cy="100" r="40" stroke="white" strokeWidth="2" fill="none" data-magicpath-id="47" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx" />
                </svg>
              </div>

              <div className="relative z-10" data-magicpath-id="48" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">
                <div className="flex items-center gap-4 mb-4" data-magicpath-id="49" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">
                  <div className="w-16 h-16 bg-[#005C4B] rounded-2xl flex items-center justify-center shrink-0" data-magicpath-id="50" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">
                    {getStepIcon(directionSteps[currentStep].icon)}
                  </div>
                  
                  <div className="flex-1" data-magicpath-id="51" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">
                    <div className="text-[#DDF247] text-sm font-semibold uppercase tracking-wide mb-1" data-magicpath-id="52" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">
                      Step {currentStep + 1} of {totalSteps}
                    </div>
                    <div className="text-white text-2xl font-bold leading-tight" data-magicpath-id="53" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">
                      {directionSteps[currentStep].instruction}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2" data-magicpath-id="54" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">
                  <div className="h-1 w-16 bg-[#DDF247] rounded-full" data-magicpath-id="55" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx" />
                  <span className="text-white/80 text-sm font-medium" data-magicpath-id="56" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">
                    in {directionSteps[currentStep].distance}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Destination Info Card */}
          <div className="bg-white rounded-[2.5rem] p-6 shadow-lg mb-6" data-magicpath-id="57" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">
            <div className="flex items-start gap-4" data-magicpath-id="58" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center shrink-0" data-magicpath-id="59" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">
                <MapPin className="text-purple-600" size={24} data-magicpath-id="60" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx" />
              </div>
              <div className="flex-1" data-magicpath-id="61" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">
                <h3 className="text-lg font-semibold text-zinc-800 mb-1" data-magicpath-id="62" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">
                  {destination.name}
                </h3>
                <p className="text-sm text-zinc-500" data-magicpath-id="63" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">
                  {destination.distance} • Recycling Center
                </p>
                <div className="flex gap-2 flex-wrap mt-3" data-magicpath-id="64" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">
                  {destination.type.map(type => <span key={type} className="px-3 py-1 bg-[#DDF247]/30 text-[#005C4B] text-xs font-semibold rounded-full" data-magicpath-id="65" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">
                      {type}
                    </span>)}
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Steps */}
          <div className="space-y-3" data-magicpath-id="66" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">
            <h3 className="text-sm font-bold text-zinc-500 tracking-wider uppercase mb-4" data-magicpath-id="67" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">
              Upcoming Turns
            </h3>
            
            {directionSteps.slice(currentStep + 1, currentStep + 4).map((step, index) => <motion.div key={step.id} initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            delay: index * 0.1
          }} className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4" data-magicpath-id="68" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">
                <div className="w-10 h-10 bg-zinc-100 rounded-xl flex items-center justify-center shrink-0" data-magicpath-id="69" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">
                  {step.icon === 'left' && <ArrowLeft className="text-zinc-600" size={20} data-magicpath-id="70" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx" />}
                  {step.icon === 'right' && <ArrowRight className="text-zinc-600" size={20} data-magicpath-id="71" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx" />}
                  {step.icon === 'straight' && <ArrowUpRight className="text-zinc-600" size={20} data-magicpath-id="72" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx" />}
                  {step.icon === 'arrive' && <Flag className="text-zinc-600" size={20} data-magicpath-id="73" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx" />}
                </div>
                
                <div className="flex-1" data-magicpath-id="74" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">
                  <p className="text-sm font-medium text-zinc-800" data-magicpath-id="75" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">
                    {step.instruction}
                  </p>
                  <p className="text-xs text-zinc-500 mt-0.5" data-magicpath-id="76" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">
                    {step.distance}
                  </p>
                </div>
              </motion.div>)}
          </div>
        </div>
      </div>

      {/* Bottom Control Button */}
      <div className="absolute bottom-8 left-6 right-6 z-50 flex justify-center pointer-events-none" data-magicpath-id="77" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">
        <motion.button onClick={() => setIsNavigating(!isNavigating)} className={`
            px-8 py-4 rounded-[2rem] font-semibold text-lg shadow-xl pointer-events-auto
            flex items-center justify-center gap-3 min-w-[200px]
            transition-all duration-300
            ${isNavigating ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-[#005C4B] hover:bg-[#004a3d] text-white'}
          `} whileTap={{
        scale: 0.95
      }} data-magicpath-id="78" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">
          {isNavigating ? <>
              <motion.div animate={{
            rotate: 360
          }} transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }} data-magicpath-id="79" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">
                <Navigation size={24} data-magicpath-id="80" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx" />
              </motion.div>
              Stop Navigation
            </> : <>
              <Navigation size={24} data-magicpath-id="81" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx" />
              Start Navigation
            </>}
        </motion.button>
      </div>

      {/* Arrival Countdown (shows when close to destination) */}
      <AnimatePresence data-magicpath-id="82" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">
        {currentStep === directionSteps.length - 1 && <motion.div initial={{
        scale: 0,
        opacity: 0
      }} animate={{
        scale: 1,
        opacity: 1
      }} exit={{
        scale: 0,
        opacity: 0
      }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50" data-magicpath-id="83" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">
            <div className="bg-[#DDF247] rounded-[3rem] px-12 py-8 shadow-2xl text-center" data-magicpath-id="84" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">
              <Flag className="text-[#005C4B] mx-auto mb-3" size={48} data-magicpath-id="85" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx" />
              <h2 className="text-3xl font-bold text-[#2A1805] mb-2" data-magicpath-id="86" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">
                Almost There!
              </h2>
              <p className="text-[#2A1805]/80 font-medium" data-magicpath-id="87" data-magicpath-path="NavigationWaypoint_dupe_2_dupe_3.tsx">
                Arriving in {timeRemaining} min
              </p>
            </div>
          </motion.div>}
      </AnimatePresence>
    </div>;
};