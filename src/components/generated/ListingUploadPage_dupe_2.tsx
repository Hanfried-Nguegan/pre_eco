"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Camera, Upload, Check, Image as ImageIcon, DollarSign, Package, FileText, Leaf, Sparkles, Share2, X } from 'lucide-react';
import { cn } from '../../lib/utils';
type FormStep = 'photo' | 'details' | 'impact' | 'preview' | 'success';
type Category = 'Clothing' | 'Electronics' | 'Furniture' | 'Footwear' | 'Musical' | 'Appliances' | 'Books' | 'Other';
type Condition = 'Like New' | 'Good' | 'Fair';
const categories: Category[] = ['Clothing', 'Electronics', 'Furniture', 'Footwear', 'Musical', 'Appliances', 'Books', 'Other'];
const conditions: Condition[] = ['Like New', 'Good', 'Fair'];
export const ListingUploadPage = ({
  onBack,
  onComplete
}: {
  onBack?: () => void;
  onComplete?: () => void;
} = {}) => {
  const [currentStep, setCurrentStep] = useState<FormStep>('photo');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form data
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '' as Category | '',
    condition: '' as Condition | '',
    price: '',
    originalPrice: ''
  });
  const handleBack = () => {
    const steps: FormStep[] = ['photo', 'details', 'impact', 'preview', 'success'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    } else if (currentIndex === 0 && onBack) {
      onBack();
    }
  };
  const handleNext = () => {
    const steps: FormStep[] = ['photo', 'details', 'impact', 'preview', 'success'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };
  const canProceed = () => {
    switch (currentStep) {
      case 'photo':
        return capturedImage !== null;
      case 'details':
        return formData.name && formData.category && formData.condition && formData.price;
      case 'impact':
        return true;
      case 'preview':
        return true;
      default:
        return true;
    }
  };
  const handleCapturePhoto = () => {
    setIsCapturing(true);
    // Simulate camera capture with a delay
    setTimeout(() => {
      // Use a random placeholder image
      setCapturedImage(`https://picsum.photos/seed/${Date.now()}/600/600`);
      setIsCapturing(false);
    }, 1500);
  };
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCapturedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleRemoveImage = () => {
    setCapturedImage(null);
  };

  // Calculate eco-impact
  const calculateImpact = () => {
    const price = parseFloat(formData.price) || 0;
    const originalPrice = parseFloat(formData.originalPrice) || price * 2;
    const co2Saved = Math.floor(price * 85); // Mock calculation
    const waterSaved = Math.floor(price * 120); // Mock calculation
    const savingsPercent = Math.floor((originalPrice - price) / originalPrice * 100);
    return {
      co2Saved,
      waterSaved,
      savingsPercent
    };
  };
  const impact = calculateImpact();
  const progressPercent = {
    photo: 25,
    details: 50,
    impact: 75,
    preview: 90,
    success: 100
  }[currentStep];
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
  return <div className="relative w-full h-full min-h-screen bg-zinc-50 flex flex-col font-sans overflow-hidden">
      {/* Header */}
      <header className="bg-white px-6 py-6 shadow-sm relative z-20">
        <div className="flex items-center gap-4">
          <button onClick={handleBack} className="p-2.5 rounded-full bg-zinc-100 hover:bg-zinc-200 transition-all cursor-pointer">
            <ChevronLeft size={24} className="text-zinc-800" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-zinc-800">Create Listing</h1>
            <p className="text-sm text-zinc-500 mt-0.5">
              {currentStep === 'photo' && 'Add product photo'}
              {currentStep === 'details' && 'Product information'}
              {currentStep === 'impact' && 'Environmental impact'}
              {currentStep === 'preview' && 'Review listing'}
              {currentStep === 'success' && 'Listing created!'}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 h-2 bg-zinc-100 rounded-full overflow-hidden">
          <motion.div className="h-full bg-gradient-to-r from-[#DDF247] to-[#005C4B]" initial={{
          width: 0
        }} animate={{
          width: `${progressPercent}%`
        }} transition={{
          duration: 0.5,
          ease: 'easeOut'
        }} />
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-32 px-6">
        <AnimatePresence mode="wait">
          {/* Step 1: Photo Upload */}
          {currentStep === 'photo' && <motion.div key="photo" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{
          duration: 0.3
        }} className="pt-8 space-y-6">
              <h2 className="text-lg font-semibold text-zinc-800 mb-6">
                Add a photo of your item
              </h2>

              {/* Image Preview or Capture Area */}
              <div className="relative w-full aspect-square max-w-md mx-auto bg-zinc-100 rounded-[2.5rem] overflow-hidden">
                {capturedImage ? <>
                    <img src={capturedImage} alt="Captured product" className="w-full h-full object-cover" />
                    <button onClick={handleRemoveImage} className="absolute top-4 right-4 p-3 bg-red-500 rounded-full shadow-lg hover:bg-red-600 transition-colors cursor-pointer">
                      <X size={20} className="text-white" />
                    </button>
                  </> : <div className="w-full h-full flex flex-col items-center justify-center p-8">
                    {isCapturing ? <motion.div initial={{
                scale: 0.8,
                opacity: 0
              }} animate={{
                scale: 1,
                opacity: 1
              }} className="text-center">
                        <div className="w-24 h-24 border-4 border-[#DDF247] border-t-[#005C4B] rounded-full animate-spin mb-4" />
                        <p className="text-zinc-600 font-medium">Capturing...</p>
                      </motion.div> : <>
                        <ImageIcon size={64} className="text-zinc-300 mb-4" />
                        <p className="text-zinc-500 text-center mb-8">
                          Take a photo or upload from your device
                        </p>
                      </>}
                  </div>}
              </div>

              {/* Action Buttons */}
              {!capturedImage && !isCapturing && <div className="space-y-3">
                  <button onClick={handleCapturePhoto} className="w-full py-5 rounded-[2rem] bg-gradient-to-r from-[#DDF247] to-[#B8E635] text-[#2A1805] font-semibold text-lg flex items-center justify-center gap-3 hover:shadow-lg transition-all cursor-pointer">
                    <Camera size={24} />
                    Take Photo
                  </button>

                  <button onClick={() => fileInputRef.current?.click()} className="w-full py-5 rounded-[2rem] bg-white text-zinc-700 font-semibold text-lg flex items-center justify-center gap-3 hover:bg-zinc-50 transition-all cursor-pointer border-2 border-zinc-200">
                    <Upload size={24} />
                    Upload from Gallery
                  </button>

                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </div>}
            </motion.div>}

          {/* Step 2: Product Details */}
          {currentStep === 'details' && <motion.div key="details" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{
          duration: 0.3
        }} className="pt-8 space-y-6">
              <h2 className="text-lg font-semibold text-zinc-800 mb-6">
                Tell us about your item
              </h2>

              {/* Product Name */}
              <div className="bg-white rounded-[2rem] p-6">
                <label className="block text-sm font-semibold text-zinc-700 mb-3">
                  Product Name *
                </label>
                <input type="text" value={formData.name} onChange={e => setFormData({
              ...formData,
              name: e.target.value
            })} placeholder="e.g., Vintage Leather Jacket" className="w-full px-4 py-3 bg-zinc-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#DDF247] text-zinc-800" />
              </div>

              {/* Description */}
              <div className="bg-white rounded-[2rem] p-6">
                <label className="block text-sm font-semibold text-zinc-700 mb-3">
                  Description
                </label>
                <textarea value={formData.description} onChange={e => setFormData({
              ...formData,
              description: e.target.value
            })} placeholder="Describe the condition, features, and any flaws..." rows={4} className="w-full px-4 py-3 bg-zinc-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#DDF247] text-zinc-800 resize-none" />
              </div>

              {/* Category */}
              <div className="bg-white rounded-[2rem] p-6">
                <label className="block text-sm font-semibold text-zinc-700 mb-3">
                  Category *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {categories.map(category => {
                const isSelected = formData.category === category;
                return <button key={category} onClick={() => setFormData({
                  ...formData,
                  category
                })} className={cn("py-3 px-4 rounded-2xl font-semibold text-sm transition-all cursor-pointer", isSelected ? "bg-[#DDF247] text-[#2A1805]" : "bg-zinc-50 text-zinc-600 hover:bg-zinc-100")}>
                        {category}
                      </button>;
              })}
                </div>
              </div>

              {/* Condition */}
              <div className="bg-white rounded-[2rem] p-6">
                <label className="block text-sm font-semibold text-zinc-700 mb-3">
                  Condition *
                </label>
                <div className="flex gap-3">
                  {conditions.map(condition => {
                const isSelected = formData.condition === condition;
                return <button key={condition} onClick={() => setFormData({
                  ...formData,
                  condition
                })} className={cn("flex-1 py-4 px-3 rounded-2xl font-semibold text-sm transition-all cursor-pointer", isSelected ? "bg-[#005C4B] text-white" : "bg-zinc-50 text-zinc-600 hover:bg-zinc-100")}>
                        {condition}
                      </button>;
              })}
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-white rounded-[2rem] p-6">
                <label className="block text-sm font-semibold text-zinc-700 mb-3">
                  Pricing *
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-zinc-500 mb-2">Your Price</label>
                    <div className="relative">
                      <DollarSign size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                      <input type="number" value={formData.price} onChange={e => setFormData({
                    ...formData,
                    price: e.target.value
                  })} placeholder="0.00" className="w-full pl-10 pr-4 py-3 bg-zinc-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#DDF247] text-zinc-800" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-500 mb-2">Original Price</label>
                    <div className="relative">
                      <DollarSign size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                      <input type="number" value={formData.originalPrice} onChange={e => setFormData({
                    ...formData,
                    originalPrice: e.target.value
                  })} placeholder="0.00" className="w-full pl-10 pr-4 py-3 bg-zinc-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#DDF247] text-zinc-800" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>}

          {/* Step 3: Impact Calculator */}
          {currentStep === 'impact' && <motion.div key="impact" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{
          duration: 0.3
        }} className="pt-8 space-y-6">
              <div className="text-center mb-8">
                <motion.div initial={{
              scale: 0
            }} animate={{
              scale: 1
            }} transition={{
              type: 'spring',
              stiffness: 200,
              damping: 15
            }} className="w-24 h-24 bg-gradient-to-br from-[#DDF247] to-[#B8E635] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles size={48} className="text-[#005C4B]" />
                </motion.div>
                <h2 className="text-2xl font-bold text-zinc-800 mb-2">
                  Your Environmental Impact
                </h2>
                <p className="text-zinc-600">
                  By reselling, you're making a positive difference!
                </p>
              </div>

              {/* Impact Cards */}
              <div className="space-y-4">
                <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.2
            }} className="bg-gradient-to-br from-green-500 to-green-600 rounded-[2rem] p-6 text-white">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                      <Leaf size={28} />
                    </div>
                    <div className="flex-1">
                      <p className="text-white/80 text-sm font-medium mb-1">CO₂ Emissions Saved</p>
                      <p className="text-3xl font-bold">{(impact.co2Saved / 1000).toFixed(1)}kg</p>
                    </div>
                  </div>
                  <p className="text-sm text-white/90">
                    Equivalent to driving {Math.floor(impact.co2Saved / 120)} miles in a car
                  </p>
                </motion.div>

                <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.3
            }} className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-[2rem] p-6 text-white">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                      <Package size={28} />
                    </div>
                    <div className="flex-1">
                      <p className="text-white/80 text-sm font-medium mb-1">Buyer Savings</p>
                      <p className="text-3xl font-bold">{impact.savingsPercent}%</p>
                    </div>
                  </div>
                  <p className="text-sm text-white/90">
                    Helping someone save ${((parseFloat(formData.originalPrice) || 0) - (parseFloat(formData.price) || 0)).toFixed(2)} on quality goods
                  </p>
                </motion.div>

                <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.4
            }} className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-[2rem] p-6 text-white">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                      <Sparkles size={28} />
                    </div>
                    <div className="flex-1">
                      <p className="text-white/80 text-sm font-medium mb-1">Circular Economy</p>
                      <p className="text-lg font-bold">Extending product lifecycle</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>}

          {/* Step 4: Preview */}
          {currentStep === 'preview' && <motion.div key="preview" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{
          duration: 0.3
        }} className="pt-8 space-y-6">
              <h2 className="text-lg font-semibold text-zinc-800 mb-6">
                Preview your listing
              </h2>

              {/* Listing Preview Card */}
              <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-lg">
                {/* Image */}
                <div className="relative w-full aspect-square bg-zinc-100">
                  {capturedImage && <img src={capturedImage} alt={formData.name} className="w-full h-full object-cover" />}
                  <div className="absolute top-4 right-4 px-3 py-1.5 bg-green-500 text-white rounded-full text-xs font-bold">
                    NEW LISTING
                  </div>
                </div>

                {/* Details */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-zinc-800 mb-2">
                        {formData.name}
                      </h3>
                      <p className="text-zinc-600 text-sm mb-3">
                        {formData.description || 'No description provided'}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-[#005C4B] text-white text-xs font-bold rounded-full">
                          {formData.condition}
                        </span>
                        <span className="px-3 py-1 bg-zinc-100 text-zinc-700 text-xs font-semibold rounded-full">
                          {formData.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-3xl font-bold text-[#005C4B]">
                      ${formData.price}
                    </span>
                    {formData.originalPrice && <span className="text-lg text-zinc-400 line-through">
                        ${formData.originalPrice}
                      </span>}
                  </div>

                  {/* Impact Badge */}
                  <div className="bg-gradient-to-r from-[#DDF247] to-[#B8E635] rounded-2xl p-4 flex items-center gap-3">
                    <Leaf size={24} className="text-[#005C4B]" />
                    <div>
                      <p className="text-sm font-semibold text-[#2A1805]">
                        Eco-Friendly Choice
                      </p>
                      <p className="text-xs text-[#2A1805]/70">
                        Saves {(impact.co2Saved / 1000).toFixed(1)}kg CO₂
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>}

          {/* Step 5: Success */}
          {currentStep === 'success' && <motion.div key="success" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{
          duration: 0.3
        }} className="pt-8 flex flex-col items-center justify-center min-h-[500px]">
              <motion.div initial={{
            scale: 0
          }} animate={{
            scale: 1
          }} transition={{
            type: 'spring',
            stiffness: 200,
            damping: 15,
            delay: 0.2
          }} className="w-32 h-32 bg-[#DDF247] rounded-full flex items-center justify-center mb-8 shadow-xl">
                <Check size={64} className="text-[#005C4B]" strokeWidth={3} />
              </motion.div>

              <motion.h2 initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.4
          }} className="text-3xl font-bold text-zinc-800 mb-4 text-center">
                Listing Created!
              </motion.h2>

              <motion.p initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.5
          }} className="text-zinc-600 text-center mb-8 px-6">
                Your item is now live and ready for buyers to discover
              </motion.p>

              <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.6
          }} className="w-full max-w-md space-y-3">
                <button className="w-full py-4 rounded-[2rem] bg-gradient-to-r from-[#DDF247] to-[#B8E635] text-[#2A1805] font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all cursor-pointer">
                  <Share2 size={20} />
                  Share Listing
                </button>
                <button onClick={onComplete} className="w-full py-4 rounded-[2rem] bg-[#005C4B] text-white font-semibold hover:bg-[#004a3d] transition-all cursor-pointer">
                  View My Listings
                </button>
              </motion.div>
            </motion.div>}
        </AnimatePresence>
      </div>

      {/* Bottom Action Button */}
      {currentStep !== 'success' && <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-zinc-50 via-zinc-50 to-transparent z-20">
          <motion.button onClick={handleNext} disabled={!canProceed()} className={cn("w-full py-5 rounded-[2rem] font-bold text-lg transition-all shadow-lg cursor-pointer", canProceed() ? "bg-gradient-to-r from-[#DDF247] to-[#B8E635] text-[#2A1805] hover:shadow-xl" : "bg-zinc-300 text-zinc-500 cursor-not-allowed")} whileTap={canProceed() ? {
        scale: 0.98
      } : {}}>
            {currentStep === 'preview' ? 'Publish Listing' : 'Continue'}
          </motion.button>
        </div>}
    </div>;
};