import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Calendar, Clock, MapPin, Check, Trash2, Recycle, Wine, FileText, Package, Droplet } from 'lucide-react';
import { cn } from '../../lib/utils';
type WasteCategory = {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
};
const wasteCategories: WasteCategory[] = [{
  id: 'organic',
  label: 'Organic Waste',
  icon: Droplet,
  color: '#DDF247'
}, {
  id: 'plastic',
  label: 'Plastic',
  icon: Recycle,
  color: '#E0E0FF'
}, {
  id: 'paper',
  label: 'Paper',
  icon: FileText,
  color: '#FFE4B5'
}, {
  id: 'glass',
  label: 'Glass',
  icon: Wine,
  color: '#C0F0D8'
}, {
  id: 'mixed',
  label: 'Mixed Waste',
  icon: Trash2,
  color: '#FFD1DC'
}, {
  id: 'packaging',
  label: 'Packaging',
  icon: Package,
  color: '#B5E7FF'
}];
const timeSlots = [{
  id: '1',
  time: '8:00 AM - 10:00 AM',
  available: true
}, {
  id: '2',
  time: '10:00 AM - 12:00 PM',
  available: true
}, {
  id: '3',
  time: '2:00 PM - 4:00 PM',
  available: true
}, {
  id: '4',
  time: '4:00 PM - 6:00 PM',
  available: false
}];
type FormStep = 'category' | 'date' | 'time' | 'details' | 'confirmation';
export const SchedulePickup = ({
  onBack
}: {
  onBack?: () => void;
}) => {
  const [currentStep, setCurrentStep] = useState<FormStep>('category');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [address] = useState<string>('123 Eco Street, Green District');
  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev => prev.includes(categoryId) ? prev.filter(id => id !== categoryId) : [...prev, categoryId]);
  };
  const canProceed = () => {
    switch (currentStep) {
      case 'category':
        return selectedCategories.length > 0;
      case 'date':
        return selectedDate !== '';
      case 'time':
        return selectedTime !== '';
      case 'details':
        return quantity !== '';
      default:
        return true;
    }
  };
  const handleNext = () => {
    if (!canProceed()) return;
    const steps: FormStep[] = ['category', 'date', 'time', 'details', 'confirmation'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };
  const handleBack = () => {
    const steps: FormStep[] = ['category', 'date', 'time', 'details', 'confirmation'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    } else if (currentIndex === 0 && onBack) {
      onBack();
    }
  };
  const generateDates = () => {
    const dates: Array<{
      id: string;
      day: string;
      date: number;
      month: string;
      full: string;
    }> = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        id: date.toISOString(),
        day: date.toLocaleDateString('en-US', {
          weekday: 'short'
        }),
        date: date.getDate(),
        month: date.toLocaleDateString('en-US', {
          month: 'short'
        }),
        full: date.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        })
      });
    }
    return dates;
  };
  const dates = generateDates();
  const pageVariants = {
    initial: {
      opacity: 0,
      x: 20
    },
    animate: {
      opacity: 1,
      x: 0
    },
    exit: {
      opacity: 0,
      x: -20
    }
  };
  const progressPercent = {
    category: 20,
    date: 40,
    time: 60,
    details: 80,
    confirmation: 100
  }[currentStep];
  return <div className="relative w-full h-full min-h-screen bg-zinc-50 flex flex-col font-sans overflow-hidden" data-magicpath-id="0" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
      {/* Header */}
      <header className="bg-white px-6 py-6 shadow-sm relative z-20" data-magicpath-id="1" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
        <div className="flex items-center gap-4" data-magicpath-id="2" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
          <button onClick={handleBack} className={cn("p-2.5 rounded-full transition-all", "bg-zinc-100 hover:bg-zinc-200 cursor-pointer")} data-magicpath-id="3" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
            <ChevronLeft size={24} className="text-zinc-800" data-magicpath-id="4" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx" />
          </button>
          <div className="flex-1" data-magicpath-id="5" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
            <h1 className="text-2xl font-semibold text-zinc-800" data-magicpath-id="6" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">Schedule Pickup</h1>
            <p className="text-sm text-zinc-500 mt-0.5" data-magicpath-id="7" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
              {currentStep === 'category' && 'Select waste categories'}
              {currentStep === 'date' && 'Choose pickup date'}
              {currentStep === 'time' && 'Select time slot'}
              {currentStep === 'details' && 'Confirm details'}
              {currentStep === 'confirmation' && 'Pickup scheduled!'}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 h-2 bg-zinc-100 rounded-full overflow-hidden" data-magicpath-id="8" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
          <motion.div className="h-full bg-gradient-to-r from-[#DDF247] to-[#005C4B]" initial={{
          width: 0
        }} animate={{
          width: `${progressPercent}%`
        }} transition={{
          duration: 0.5,
          ease: 'easeOut'
        }} data-magicpath-id="9" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx" />
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-32 px-6" data-magicpath-id="10" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
        <AnimatePresence mode="wait" data-magicpath-id="11" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
          {/* Step 1: Category Selection */}
          {currentStep === 'category' && <motion.div key="category" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{
          duration: 0.3
        }} className="pt-8 space-y-4" data-magicpath-id="12" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
              <h2 className="text-lg font-semibold text-zinc-800 mb-6" data-magicpath-id="13" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
                What would you like us to pick up?
              </h2>
              <div className="grid grid-cols-2 gap-4" data-magicpath-id="14" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
                {wasteCategories.map(category => {
              const isSelected = selectedCategories.includes(category.id);
              return <motion.button key={category.id} onClick={() => handleCategoryToggle(category.id)} className={cn("relative p-6 rounded-[2rem] transition-all duration-300 cursor-pointer", "flex flex-col items-start gap-3 min-h-[140px] overflow-hidden")} style={{
                backgroundColor: category.color,
                transform: isSelected ? 'scale(0.95)' : 'scale(1)'
              }} whileTap={{
                scale: 0.9
              }} data-magicpath-id="15" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
                      <category.icon size={28} className={cn("transition-colors", isSelected ? "text-[#005C4B]" : "text-zinc-600")} strokeWidth={2} data-magicpath-id="16" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx" />
                      <span className={cn("text-sm font-semibold leading-tight transition-colors", isSelected ? "text-[#2A1805]" : "text-zinc-700")} data-magicpath-id="17" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
                        {category.label}
                      </span>
                      
                      {/* Check mark */}
                      <AnimatePresence data-magicpath-id="18" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
                        {isSelected && <motion.div initial={{
                    scale: 0,
                    opacity: 0
                  }} animate={{
                    scale: 1,
                    opacity: 1
                  }} exit={{
                    scale: 0,
                    opacity: 0
                  }} className="absolute top-3 right-3 w-7 h-7 bg-[#005C4B] rounded-full flex items-center justify-center" data-magicpath-id="19" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
                            <Check size={16} className="text-white" strokeWidth={3} data-magicpath-id="20" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx" />
                          </motion.div>}
                      </AnimatePresence>
                    </motion.button>;
            })}
              </div>
            </motion.div>}

          {/* Step 2: Date Selection */}
          {currentStep === 'date' && <motion.div key="date" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{
          duration: 0.3
        }} className="pt-8" data-magicpath-id="21" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
              <h2 className="text-lg font-semibold text-zinc-800 mb-6 flex items-center gap-2" data-magicpath-id="22" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
                <Calendar size={24} className="text-[#005C4B]" data-magicpath-id="23" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx" />
                When should we pick up?
              </h2>
              <div className="space-y-3" data-magicpath-id="24" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
                {dates.map(date => {
              const isSelected = selectedDate === date.id;
              return <motion.button key={date.id} onClick={() => setSelectedDate(date.id)} className={cn("w-full p-5 rounded-[2rem] flex items-center justify-between transition-all", "cursor-pointer", isSelected ? "bg-[#DDF247] shadow-md" : "bg-white hover:bg-zinc-50")} whileTap={{
                scale: 0.98
              }} data-magicpath-id="25" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
                      <div className="flex items-center gap-4" data-magicpath-id="26" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
                        <div className={cn("w-16 h-16 rounded-2xl flex flex-col items-center justify-center", isSelected ? "bg-[#005C4B] text-white" : "bg-zinc-100 text-zinc-800")} data-magicpath-id="27" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
                          <span className="text-xs font-medium uppercase" data-magicpath-id="28" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">{date.day}</span>
                          <span className="text-2xl font-bold" data-magicpath-id="29" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">{date.date}</span>
                        </div>
                        <div className="text-left" data-magicpath-id="30" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
                          <p className={cn("font-semibold", isSelected ? "text-[#2A1805]" : "text-zinc-800")} data-magicpath-id="31" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
                            {date.month} {date.date}
                          </p>
                          <p className="text-sm text-zinc-500" data-magicpath-id="32" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">Available</p>
                        </div>
                      </div>
                      {isSelected && <motion.div initial={{
                  scale: 0
                }} animate={{
                  scale: 1
                }} className="w-8 h-8 bg-[#005C4B] rounded-full flex items-center justify-center" data-magicpath-id="33" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
                          <Check size={18} className="text-white" strokeWidth={3} data-magicpath-id="34" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx" />
                        </motion.div>}
                    </motion.button>;
            })}
              </div>
            </motion.div>}

          {/* Step 3: Time Selection */}
          {currentStep === 'time' && <motion.div key="time" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{
          duration: 0.3
        }} className="pt-8" data-magicpath-id="35" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
              <h2 className="text-lg font-semibold text-zinc-800 mb-6 flex items-center gap-2" data-magicpath-id="36" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
                <Clock size={24} className="text-[#005C4B]" data-magicpath-id="37" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx" />
                Select a time slot
              </h2>
              <div className="space-y-3" data-magicpath-id="38" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
                {timeSlots.map(slot => {
              const isSelected = selectedTime === slot.id;
              return <motion.button key={slot.id} onClick={() => slot.available && setSelectedTime(slot.id)} disabled={!slot.available} className={cn("w-full p-6 rounded-[2rem] flex items-center justify-between transition-all", slot.available ? "cursor-pointer" : "cursor-not-allowed opacity-50", isSelected ? "bg-[#005C4B] text-white shadow-lg" : slot.available ? "bg-white hover:bg-zinc-50" : "bg-zinc-100")} whileTap={slot.available ? {
                scale: 0.98
              } : {}} data-magicpath-id="39" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
                      <div className="flex items-center gap-4" data-magicpath-id="40" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
                        <Clock size={24} className={isSelected ? "text-[#DDF247]" : "text-zinc-400"} data-magicpath-id="41" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx" />
                        <span className={cn("font-semibold text-lg", isSelected ? "text-white" : "text-zinc-800")} data-magicpath-id="42" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
                          {slot.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2" data-magicpath-id="43" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
                        {!slot.available && <span className="text-sm text-zinc-500 font-medium" data-magicpath-id="44" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">Unavailable</span>}
                        {isSelected && <motion.div initial={{
                    scale: 0
                  }} animate={{
                    scale: 1
                  }} className="w-8 h-8 bg-[#DDF247] rounded-full flex items-center justify-center" data-magicpath-id="45" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
                            <Check size={18} className="text-[#005C4B]" strokeWidth={3} data-magicpath-id="46" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx" />
                          </motion.div>}
                      </div>
                    </motion.button>;
            })}
              </div>
            </motion.div>}

          {/* Step 4: Details */}
          {currentStep === 'details' && <motion.div key="details" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{
          duration: 0.3
        }} className="pt-8 space-y-6" data-magicpath-id="47" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
              <h2 className="text-lg font-semibold text-zinc-800 mb-6" data-magicpath-id="48" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
                Confirm pickup details
              </h2>

              {/* Location */}
              <div className="bg-white p-6 rounded-[2rem]" data-magicpath-id="49" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
                <div className="flex items-start gap-4" data-magicpath-id="50" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
                  <div className="w-12 h-12 bg-[#E0E0FF] rounded-2xl flex items-center justify-center shrink-0" data-magicpath-id="51" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
                    <MapPin size={24} className="text-[#005C4B]" data-magicpath-id="52" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx" />
                  </div>
                  <div className="flex-1" data-magicpath-id="53" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
                    <h3 className="font-semibold text-zinc-800 mb-1" data-magicpath-id="54" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">Pickup Address</h3>
                    <p className="text-zinc-600" data-magicpath-id="55" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">{address}</p>
                    <button className="text-sm text-[#005C4B] font-semibold mt-2 hover:underline" data-magicpath-id="56" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
                      Change address
                    </button>
                  </div>
                </div>
              </div>

              {/* Quantity */}
              <div className="bg-white p-6 rounded-[2rem]" data-magicpath-id="57" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
                <h3 className="font-semibold text-zinc-800 mb-4" data-magicpath-id="58" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">Estimated Quantity</h3>
                <div className="flex gap-3" data-magicpath-id="59" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
                  {['Small (1-5kg)', 'Medium (5-15kg)', 'Large (15kg+)'].map((size, idx) => {
                const sizeId = ['small', 'medium', 'large'][idx];
                const isSelected = quantity === sizeId;
                return <button key={sizeId} onClick={() => setQuantity(sizeId)} className={cn("flex-1 py-4 px-3 rounded-2xl text-sm font-semibold transition-all cursor-pointer", isSelected ? "bg-[#DDF247] text-[#2A1805] shadow-md" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200")} data-magicpath-id="60" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
                        {size.split(' (')[0]}
                      </button>;
              })}
                </div>
              </div>

              {/* Selected Categories */}
              <div className="bg-white p-6 rounded-[2rem]" data-magicpath-id="61" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
                <h3 className="font-semibold text-zinc-800 mb-4" data-magicpath-id="62" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">Items to Pick Up</h3>
                <div className="flex flex-wrap gap-2" data-magicpath-id="63" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
                  {selectedCategories.map(catId => {
                const category = wasteCategories.find(c => c.id === catId);
                if (!category) return null;
                return <div key={catId} className="px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2" style={{
                  backgroundColor: category.color
                }} data-magicpath-id="64" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
                        <category.icon size={16} className="text-[#005C4B]" data-magicpath-id="65" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx" />
                        <span className="text-[#2A1805]" data-magicpath-id="66" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">{category.label}</span>
                      </div>;
              })}
                </div>
              </div>
            </motion.div>}

          {/* Step 5: Confirmation */}
          {currentStep === 'confirmation' && <motion.div key="confirmation" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{
          duration: 0.3
        }} className="pt-8 flex flex-col items-center justify-center min-h-[500px]" data-magicpath-id="67" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
              <motion.div initial={{
            scale: 0
          }} animate={{
            scale: 1
          }} transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.2
          }} className="w-32 h-32 bg-[#DDF247] rounded-full flex items-center justify-center mb-8 shadow-xl" data-magicpath-id="68" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
                <Check size={64} className="text-[#005C4B]" strokeWidth={3} data-magicpath-id="69" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx" />
              </motion.div>

              <motion.h2 initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.4
          }} className="text-3xl font-bold text-zinc-800 mb-4 text-center" data-magicpath-id="70" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
                Pickup Scheduled!
              </motion.h2>

              <motion.p initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.5
          }} className="text-zinc-600 text-center mb-8 px-6" data-magicpath-id="71" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
                Your courier will arrive on{' '}
                <span className="font-semibold text-[#005C4B]" data-magicpath-id="72" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
                  {dates.find(d => d.id === selectedDate)?.full}
                </span>{' '}
                between{' '}
                <span className="font-semibold text-[#005C4B]" data-magicpath-id="73" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
                  {timeSlots.find(t => t.id === selectedTime)?.time}
                </span>
              </motion.p>

              <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.6
          }} className="bg-white p-6 rounded-[2rem] w-full max-w-md shadow-sm" data-magicpath-id="74" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
                <div className="flex items-center gap-4 mb-4" data-magicpath-id="75" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
                  <div className="w-16 h-16 bg-[#DDF247] rounded-2xl flex items-center justify-center" data-magicpath-id="76" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
                    <Recycle size={32} className="text-[#005C4B]" data-magicpath-id="77" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx" />
                  </div>
                  <div data-magicpath-id="78" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
                    <p className="text-sm text-zinc-500" data-magicpath-id="79" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">Estimated reward</p>
                    <p className="text-2xl font-bold text-[#2A1805]" data-magicpath-id="80" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">+25 points</p>
                  </div>
                </div>
                <p className="text-sm text-zinc-600" data-magicpath-id="81" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
                  You'll earn eco-points for this pickup! Keep recycling to unlock rewards.
                </p>
              </motion.div>
            </motion.div>}
        </AnimatePresence>
      </div>

      {/* Bottom Action Button */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-zinc-50 via-zinc-50 to-transparent z-20" data-magicpath-id="82" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
        {currentStep !== 'confirmation' ? <motion.button onClick={handleNext} disabled={!canProceed()} className={cn("w-full py-5 rounded-[2rem] font-bold text-lg transition-all", "shadow-lg cursor-pointer", canProceed() ? "bg-gradient-to-r from-[#DDF247] to-[#B8E635] text-[#2A1805] hover:shadow-xl" : "bg-zinc-300 text-zinc-500 cursor-not-allowed")} whileTap={canProceed() ? {
        scale: 0.98
      } : {}} data-magicpath-id="83" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
            {currentStep === 'details' ? 'Confirm Pickup' : 'Continue'}
          </motion.button> : <motion.button onClick={() => {
        // Reset form or navigate back to home
        setCurrentStep('category');
        setSelectedCategories([]);
        setSelectedDate('');
        setSelectedTime('');
        setQuantity('');
        onBack?.();
      }} className="w-full py-5 rounded-[2rem] font-bold text-lg transition-all bg-[#005C4B] text-white shadow-lg hover:shadow-xl cursor-pointer" whileTap={{
        scale: 0.98
      }} data-magicpath-id="84" data-magicpath-path="SchedulePickup_dupe_9_dupe_2.tsx">
            Back to Home
          </motion.button>}
      </div>
    </div>;
};