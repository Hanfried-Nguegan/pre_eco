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
  return <div className="relative w-full h-full min-h-screen bg-zinc-50 flex flex-col font-sans overflow-hidden" data-magicpath-id="0" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
      {/* Header */}
      <header className="bg-white px-6 py-6 shadow-sm relative z-20" data-magicpath-id="1" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
        <div className="flex items-center gap-4" data-magicpath-id="2" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
          <button onClick={handleBack} className="p-2.5 rounded-full bg-zinc-100 hover:bg-zinc-200 transition-all cursor-pointer" data-magicpath-id="3" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
            <ChevronLeft size={24} className="text-zinc-800" data-magicpath-id="4" data-magicpath-path="ListingUploadPage_dupe_1.tsx" />
          </button>
          <div className="flex-1" data-magicpath-id="5" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
            <h1 className="text-2xl font-semibold text-zinc-800" data-magicpath-id="6" data-magicpath-path="ListingUploadPage_dupe_1.tsx">Create Listing</h1>
            <p className="text-sm text-zinc-500 mt-0.5" data-magicpath-id="7" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
              {currentStep === 'photo' && 'Add product photo'}
              {currentStep === 'details' && 'Product information'}
              {currentStep === 'impact' && 'Environmental impact'}
              {currentStep === 'preview' && 'Review listing'}
              {currentStep === 'success' && 'Listing created!'}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 h-2 bg-zinc-100 rounded-full overflow-hidden" data-magicpath-id="8" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
          <motion.div className="h-full bg-gradient-to-r from-[#DDF247] to-[#005C4B]" initial={{
          width: 0
        }} animate={{
          width: `${progressPercent}%`
        }} transition={{
          duration: 0.5,
          ease: 'easeOut'
        }} data-magicpath-id="9" data-magicpath-path="ListingUploadPage_dupe_1.tsx" />
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-32 px-6" data-magicpath-id="10" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
        <AnimatePresence mode="wait" data-magicpath-id="11" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
          {/* Step 1: Photo Upload */}
          {currentStep === 'photo' && <motion.div key="photo" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{
          duration: 0.3
        }} className="pt-8 space-y-6" data-magicpath-id="12" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
              <h2 className="text-lg font-semibold text-zinc-800 mb-6" data-magicpath-id="13" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                Add a photo of your item
              </h2>

              {/* Image Preview or Capture Area */}
              <div className="relative w-full aspect-square max-w-md mx-auto bg-zinc-100 rounded-[2.5rem] overflow-hidden" data-magicpath-id="14" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                {capturedImage ? <>
                    <img src={capturedImage} alt="Captured product" className="w-full h-full object-cover" data-magicpath-id="15" data-magicpath-path="ListingUploadPage_dupe_1.tsx" />
                    <button onClick={handleRemoveImage} className="absolute top-4 right-4 p-3 bg-red-500 rounded-full shadow-lg hover:bg-red-600 transition-colors cursor-pointer" data-magicpath-id="16" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                      <X size={20} className="text-white" data-magicpath-id="17" data-magicpath-path="ListingUploadPage_dupe_1.tsx" />
                    </button>
                  </> : <div className="w-full h-full flex flex-col items-center justify-center p-8" data-magicpath-id="18" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                    {isCapturing ? <motion.div initial={{
                scale: 0.8,
                opacity: 0
              }} animate={{
                scale: 1,
                opacity: 1
              }} className="text-center" data-magicpath-id="19" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                        <div className="w-24 h-24 border-4 border-[#DDF247] border-t-[#005C4B] rounded-full animate-spin mb-4" data-magicpath-id="20" data-magicpath-path="ListingUploadPage_dupe_1.tsx" />
                        <p className="text-zinc-600 font-medium" data-magicpath-id="21" data-magicpath-path="ListingUploadPage_dupe_1.tsx">Capturing...</p>
                      </motion.div> : <>
                        <ImageIcon size={64} className="text-zinc-300 mb-4" data-magicpath-id="22" data-magicpath-path="ListingUploadPage_dupe_1.tsx" />
                        <p className="text-zinc-500 text-center mb-8" data-magicpath-id="23" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                          Take a photo or upload from your device
                        </p>
                      </>}
                  </div>}
              </div>

              {/* Action Buttons */}
              {!capturedImage && !isCapturing && <div className="space-y-3" data-magicpath-id="24" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                  <button onClick={handleCapturePhoto} className="w-full py-5 rounded-[2rem] bg-gradient-to-r from-[#DDF247] to-[#B8E635] text-[#2A1805] font-semibold text-lg flex items-center justify-center gap-3 hover:shadow-lg transition-all cursor-pointer" data-magicpath-id="25" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                    <Camera size={24} />
                    Take Photo
                  </button>

                  <button onClick={() => fileInputRef.current?.click()} className="w-full py-5 rounded-[2rem] bg-white text-zinc-700 font-semibold text-lg flex items-center justify-center gap-3 hover:bg-zinc-50 transition-all cursor-pointer border-2 border-zinc-200" data-magicpath-id="26" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                    <Upload size={24} data-magicpath-id="27" data-magicpath-path="ListingUploadPage_dupe_1.tsx" />
                    Upload from Gallery
                  </button>

                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" data-magicpath-id="28" data-magicpath-path="ListingUploadPage_dupe_1.tsx" />
                </div>}
            </motion.div>}

          {/* Step 2: Product Details */}
          {currentStep === 'details' && <motion.div key="details" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{
          duration: 0.3
        }} className="pt-8 space-y-6" data-magicpath-id="29" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
              <h2 className="text-lg font-semibold text-zinc-800 mb-6" data-magicpath-id="30" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                Tell us about your item
              </h2>

              {/* Product Name */}
              <div className="bg-white rounded-[2rem] p-6" data-magicpath-id="31" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                <label className="block text-sm font-semibold text-zinc-700 mb-3" data-magicpath-id="32" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                  Product Name *
                </label>
                <input type="text" value={formData.name} onChange={e => setFormData({
              ...formData,
              name: e.target.value
            })} placeholder="e.g., Vintage Leather Jacket" className="w-full px-4 py-3 bg-zinc-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#DDF247] text-zinc-800" data-magicpath-id="33" data-magicpath-path="ListingUploadPage_dupe_1.tsx" />
              </div>

              {/* Description */}
              <div className="bg-white rounded-[2rem] p-6" data-magicpath-id="34" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                <label className="block text-sm font-semibold text-zinc-700 mb-3" data-magicpath-id="35" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                  Description
                </label>
                <textarea value={formData.description} onChange={e => setFormData({
              ...formData,
              description: e.target.value
            })} placeholder="Describe the condition, features, and any flaws..." rows={4} className="w-full px-4 py-3 bg-zinc-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#DDF247] text-zinc-800 resize-none" data-magicpath-id="36" data-magicpath-path="ListingUploadPage_dupe_1.tsx" />
              </div>

              {/* Category */}
              <div className="bg-white rounded-[2rem] p-6" data-magicpath-id="37" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                <label className="block text-sm font-semibold text-zinc-700 mb-3" data-magicpath-id="38" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                  Category *
                </label>
                <div className="grid grid-cols-2 gap-3" data-magicpath-id="39" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                  {categories.map(category => {
                const isSelected = formData.category === category;
                return <button key={category} onClick={() => setFormData({
                  ...formData,
                  category
                })} className={cn("py-3 px-4 rounded-2xl font-semibold text-sm transition-all cursor-pointer", isSelected ? "bg-[#DDF247] text-[#2A1805]" : "bg-zinc-50 text-zinc-600 hover:bg-zinc-100")} data-magicpath-id="40" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                        {category}
                      </button>;
              })}
                </div>
              </div>

              {/* Condition */}
              <div className="bg-white rounded-[2rem] p-6" data-magicpath-id="41" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                <label className="block text-sm font-semibold text-zinc-700 mb-3" data-magicpath-id="42" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                  Condition *
                </label>
                <div className="flex gap-3" data-magicpath-id="43" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                  {conditions.map(condition => {
                const isSelected = formData.condition === condition;
                return <button key={condition} onClick={() => setFormData({
                  ...formData,
                  condition
                })} className={cn("flex-1 py-4 px-3 rounded-2xl font-semibold text-sm transition-all cursor-pointer", isSelected ? "bg-[#005C4B] text-white" : "bg-zinc-50 text-zinc-600 hover:bg-zinc-100")} data-magicpath-id="44" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                        {condition}
                      </button>;
              })}
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-white rounded-[2rem] p-6" data-magicpath-id="45" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                <label className="block text-sm font-semibold text-zinc-700 mb-3" data-magicpath-id="46" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                  Pricing *
                </label>
                <div className="grid grid-cols-2 gap-4" data-magicpath-id="47" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                  <div data-magicpath-id="48" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                    <label className="block text-xs text-zinc-500 mb-2" data-magicpath-id="49" data-magicpath-path="ListingUploadPage_dupe_1.tsx">Your Price</label>
                    <div className="relative" data-magicpath-id="50" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                      <DollarSign size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" data-magicpath-id="51" data-magicpath-path="ListingUploadPage_dupe_1.tsx" />
                      <input type="number" value={formData.price} onChange={e => setFormData({
                    ...formData,
                    price: e.target.value
                  })} placeholder="0.00" className="w-full pl-10 pr-4 py-3 bg-zinc-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#DDF247] text-zinc-800" data-magicpath-id="52" data-magicpath-path="ListingUploadPage_dupe_1.tsx" />
                    </div>
                  </div>
                  <div data-magicpath-id="53" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                    <label className="block text-xs text-zinc-500 mb-2" data-magicpath-id="54" data-magicpath-path="ListingUploadPage_dupe_1.tsx">Original Price</label>
                    <div className="relative" data-magicpath-id="55" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                      <DollarSign size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" data-magicpath-id="56" data-magicpath-path="ListingUploadPage_dupe_1.tsx" />
                      <input type="number" value={formData.originalPrice} onChange={e => setFormData({
                    ...formData,
                    originalPrice: e.target.value
                  })} placeholder="0.00" className="w-full pl-10 pr-4 py-3 bg-zinc-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#DDF247] text-zinc-800" data-magicpath-id="57" data-magicpath-path="ListingUploadPage_dupe_1.tsx" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>}

          {/* Step 3: Impact Calculator */}
          {currentStep === 'impact' && <motion.div key="impact" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{
          duration: 0.3
        }} className="pt-8 space-y-6" data-magicpath-id="58" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
              <div className="text-center mb-8" data-magicpath-id="59" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                <motion.div initial={{
              scale: 0
            }} animate={{
              scale: 1
            }} transition={{
              type: 'spring',
              stiffness: 200,
              damping: 15
            }} className="w-24 h-24 bg-gradient-to-br from-[#DDF247] to-[#B8E635] rounded-full flex items-center justify-center mx-auto mb-4" data-magicpath-id="60" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                  <Sparkles size={48} className="text-[#005C4B]" />
                </motion.div>
                <h2 className="text-2xl font-bold text-zinc-800 mb-2" data-magicpath-id="61" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                  Your Environmental Impact
                </h2>
                <p className="text-zinc-600" data-magicpath-id="62" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                  By reselling, you're making a positive difference!
                </p>
              </div>

              {/* Impact Cards */}
              <div className="space-y-4" data-magicpath-id="63" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.2
            }} className="bg-gradient-to-br from-green-500 to-green-600 rounded-[2rem] p-6 text-white" data-magicpath-id="64" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                  <div className="flex items-center gap-4 mb-4" data-magicpath-id="65" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                    <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center" data-magicpath-id="66" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                      <Leaf size={28} data-magicpath-id="67" data-magicpath-path="ListingUploadPage_dupe_1.tsx" />
                    </div>
                    <div className="flex-1" data-magicpath-id="68" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                      <p className="text-white/80 text-sm font-medium mb-1" data-magicpath-id="69" data-magicpath-path="ListingUploadPage_dupe_1.tsx">CO₂ Emissions Saved</p>
                      <p className="text-3xl font-bold" data-magicpath-id="70" data-magicpath-path="ListingUploadPage_dupe_1.tsx">{(impact.co2Saved / 1000).toFixed(1)}kg</p>
                    </div>
                  </div>
                  <p className="text-sm text-white/90" data-magicpath-id="71" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
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
            }} className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-[2rem] p-6 text-white" data-magicpath-id="72" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                  <div className="flex items-center gap-4 mb-4" data-magicpath-id="73" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                    <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center" data-magicpath-id="74" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                      <Package size={28} data-magicpath-id="75" data-magicpath-path="ListingUploadPage_dupe_1.tsx" />
                    </div>
                    <div className="flex-1" data-magicpath-id="76" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                      <p className="text-white/80 text-sm font-medium mb-1" data-magicpath-id="77" data-magicpath-path="ListingUploadPage_dupe_1.tsx">Buyer Savings</p>
                      <p className="text-3xl font-bold" data-magicpath-id="78" data-magicpath-path="ListingUploadPage_dupe_1.tsx">{impact.savingsPercent}%</p>
                    </div>
                  </div>
                  <p className="text-sm text-white/90" data-magicpath-id="79" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
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
            }} className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-[2rem] p-6 text-white" data-magicpath-id="80" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                  <div className="flex items-center gap-4" data-magicpath-id="81" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                    <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center" data-magicpath-id="82" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                      <Sparkles size={28} />
                    </div>
                    <div className="flex-1" data-magicpath-id="83" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                      <p className="text-white/80 text-sm font-medium mb-1" data-magicpath-id="84" data-magicpath-path="ListingUploadPage_dupe_1.tsx">Circular Economy</p>
                      <p className="text-lg font-bold" data-magicpath-id="85" data-magicpath-path="ListingUploadPage_dupe_1.tsx">Extending product lifecycle</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>}

          {/* Step 4: Preview */}
          {currentStep === 'preview' && <motion.div key="preview" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{
          duration: 0.3
        }} className="pt-8 space-y-6" data-magicpath-id="86" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
              <h2 className="text-lg font-semibold text-zinc-800 mb-6" data-magicpath-id="87" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                Preview your listing
              </h2>

              {/* Listing Preview Card */}
              <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-lg" data-magicpath-id="88" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                {/* Image */}
                <div className="relative w-full aspect-square bg-zinc-100" data-magicpath-id="89" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                  {capturedImage && <img src={capturedImage} alt={formData.name} className="w-full h-full object-cover" data-magicpath-id="90" data-magicpath-path="ListingUploadPage_dupe_1.tsx" />}
                  <div className="absolute top-4 right-4 px-3 py-1.5 bg-green-500 text-white rounded-full text-xs font-bold" data-magicpath-id="91" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                    NEW LISTING
                  </div>
                </div>

                {/* Details */}
                <div className="p-6" data-magicpath-id="92" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                  <div className="flex items-start justify-between gap-4 mb-4" data-magicpath-id="93" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                    <div className="flex-1" data-magicpath-id="94" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                      <h3 className="text-2xl font-bold text-zinc-800 mb-2" data-magicpath-id="95" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                        {formData.name}
                      </h3>
                      <p className="text-zinc-600 text-sm mb-3" data-magicpath-id="96" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                        {formData.description || 'No description provided'}
                      </p>
                      <div className="flex items-center gap-2" data-magicpath-id="97" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                        <span className="px-3 py-1 bg-[#005C4B] text-white text-xs font-bold rounded-full" data-magicpath-id="98" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                          {formData.condition}
                        </span>
                        <span className="px-3 py-1 bg-zinc-100 text-zinc-700 text-xs font-semibold rounded-full" data-magicpath-id="99" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                          {formData.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-baseline gap-3 mb-6" data-magicpath-id="100" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                    <span className="text-3xl font-bold text-[#005C4B]" data-magicpath-id="101" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                      ${formData.price}
                    </span>
                    {formData.originalPrice && <span className="text-lg text-zinc-400 line-through" data-magicpath-id="102" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                        ${formData.originalPrice}
                      </span>}
                  </div>

                  {/* Impact Badge */}
                  <div className="bg-gradient-to-r from-[#DDF247] to-[#B8E635] rounded-2xl p-4 flex items-center gap-3" data-magicpath-id="103" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                    <Leaf size={24} className="text-[#005C4B]" data-magicpath-id="104" data-magicpath-path="ListingUploadPage_dupe_1.tsx" />
                    <div data-magicpath-id="105" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                      <p className="text-sm font-semibold text-[#2A1805]" data-magicpath-id="106" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                        Eco-Friendly Choice
                      </p>
                      <p className="text-xs text-[#2A1805]/70" data-magicpath-id="107" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
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
        }} className="pt-8 flex flex-col items-center justify-center min-h-[500px]" data-magicpath-id="108" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
              <motion.div initial={{
            scale: 0
          }} animate={{
            scale: 1
          }} transition={{
            type: 'spring',
            stiffness: 200,
            damping: 15,
            delay: 0.2
          }} className="w-32 h-32 bg-[#DDF247] rounded-full flex items-center justify-center mb-8 shadow-xl" data-magicpath-id="109" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                <Check size={64} className="text-[#005C4B]" strokeWidth={3} data-magicpath-id="110" data-magicpath-path="ListingUploadPage_dupe_1.tsx" />
              </motion.div>

              <motion.h2 initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.4
          }} className="text-3xl font-bold text-zinc-800 mb-4 text-center" data-magicpath-id="111" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
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
          }} className="text-zinc-600 text-center mb-8 px-6" data-magicpath-id="112" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
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
          }} className="w-full max-w-md space-y-3" data-magicpath-id="113" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                <button className="w-full py-4 rounded-[2rem] bg-gradient-to-r from-[#DDF247] to-[#B8E635] text-[#2A1805] font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all cursor-pointer" data-magicpath-id="114" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                  <Share2 size={20} data-magicpath-id="115" data-magicpath-path="ListingUploadPage_dupe_1.tsx" />
                  Share Listing
                </button>
                <button onClick={onComplete} className="w-full py-4 rounded-[2rem] bg-[#005C4B] text-white font-semibold hover:bg-[#004a3d] transition-all cursor-pointer" data-magicpath-id="116" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
                  View My Listings
                </button>
              </motion.div>
            </motion.div>}
        </AnimatePresence>
      </div>

      {/* Bottom Action Button */}
      {currentStep !== 'success' && <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-zinc-50 via-zinc-50 to-transparent z-20" data-magicpath-id="117" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
          <motion.button onClick={handleNext} disabled={!canProceed()} className={cn("w-full py-5 rounded-[2rem] font-bold text-lg transition-all shadow-lg cursor-pointer", canProceed() ? "bg-gradient-to-r from-[#DDF247] to-[#B8E635] text-[#2A1805] hover:shadow-xl" : "bg-zinc-300 text-zinc-500 cursor-not-allowed")} whileTap={canProceed() ? {
        scale: 0.98
      } : {}} data-magicpath-id="118" data-magicpath-path="ListingUploadPage_dupe_1.tsx">
            {currentStep === 'preview' ? 'Publish Listing' : 'Continue'}
          </motion.button>
        </div>}
    </div>;
};