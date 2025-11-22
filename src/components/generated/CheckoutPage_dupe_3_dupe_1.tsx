"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, MapPin, CreditCard, Wallet, Sparkles, Check, Loader2, Package, User, Home as HomeIcon, Phone, Mail } from 'lucide-react';
import { cn } from '../../lib/utils';
export interface CartItem {
  id: string;
  name: string;
  price: number;
  points: number;
  image: string;
  quantity: number;
}
export interface CheckoutPageProps {
  cartItems?: CartItem[];
  onBack?: () => void;
  onPaymentComplete?: (orderDetails: {
    items: CartItem[];
    total: number;
    points: number;
    paymentMethod: string;
    address: string;
  }) => void;
}
type CheckoutStep = 'address' | 'payment' | 'review' | 'processing' | 'success';
type PaymentMethod = 'card' | 'wallet' | 'points';
interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  zip: string;
  phone: string;
  isDefault: boolean;
}
const savedAddresses: Address[] = [{
  id: '1',
  name: 'Home',
  street: '123 Eco Street, Green District',
  city: 'Sustainability City',
  zip: '12345',
  phone: '+1 234 567 8900',
  isDefault: true
}, {
  id: '2',
  name: 'Work',
  street: '456 Recycle Avenue, Eco Plaza',
  city: 'Green Town',
  zip: '54321',
  phone: '+1 234 567 8901',
  isDefault: false
}];
export const CheckoutPage = ({
  cartItems = [],
  onBack,
  onPaymentComplete
}: CheckoutPageProps) => {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('address');
  const [selectedAddress, setSelectedAddress] = useState<string>(savedAddresses[0].id);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalPoints = cartItems.reduce((sum, item) => sum + item.points * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;
  const userPoints = 8500; // Mock user's available points
  const canPayWithPoints = userPoints >= totalPoints;
  const handleNext = () => {
    const steps: CheckoutStep[] = ['address', 'payment', 'review'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    } else if (currentStep === 'review') {
      handlePayment();
    }
  };
  const handleBack = () => {
    const steps: CheckoutStep[] = ['address', 'payment', 'review'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    } else if (currentIndex === 0 && onBack) {
      onBack();
    }
  };
  const handlePayment = () => {
    setCurrentStep('processing');
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentStep('success');
      const selectedAddr = savedAddresses.find(a => a.id === selectedAddress);
      if (onPaymentComplete && selectedAddr) {
        onPaymentComplete({
          items: cartItems,
          total,
          points: totalPoints,
          paymentMethod: selectedPayment,
          address: selectedAddr.street
        });
      }
    }, 3000);
  };
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
    address: 25,
    payment: 50,
    review: 75,
    processing: 90,
    success: 100
  }[currentStep];
  const address = savedAddresses.find(a => a.id === selectedAddress);
  return <div className="relative w-full h-full min-h-screen bg-zinc-50 flex flex-col font-sans overflow-hidden" data-magicpath-id="0" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
      {/* Header */}
      <header className="bg-white px-6 py-6 shadow-sm relative z-20" data-magicpath-id="1" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
        <div className="flex items-center gap-4" data-magicpath-id="2" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
          <button onClick={handleBack} className="p-2.5 rounded-full bg-zinc-100 hover:bg-zinc-200 transition-all cursor-pointer" disabled={isProcessing || currentStep === 'success'} data-magicpath-id="3" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
            <ChevronLeft size={24} className="text-zinc-800" data-magicpath-id="4" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx" />
          </button>
          
          <div className="flex-1" data-magicpath-id="5" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
            <h1 className="text-2xl font-semibold text-zinc-800" data-magicpath-id="6" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">Checkout</h1>
            <p className="text-sm text-zinc-500 mt-0.5" data-magicpath-id="7" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
              {currentStep === 'address' && 'Delivery address'}
              {currentStep === 'payment' && 'Payment method'}
              {currentStep === 'review' && 'Review your order'}
              {currentStep === 'processing' && 'Processing payment...'}
              {currentStep === 'success' && 'Order confirmed!'}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        {currentStep !== 'success' && <div className="mt-6 h-2 bg-zinc-100 rounded-full overflow-hidden" data-magicpath-id="8" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
            <motion.div className="h-full bg-gradient-to-r from-[#DDF247] to-[#005C4B]" initial={{
          width: 0
        }} animate={{
          width: `${progressPercent}%`
        }} transition={{
          duration: 0.5,
          ease: 'easeOut'
        }} data-magicpath-id="9" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx" />
          </div>}
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-32 px-6" data-magicpath-id="10" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
        <AnimatePresence mode="wait" data-magicpath-id="11" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
          {/* Step 1: Address Selection */}
          {currentStep === 'address' && <motion.div key="address" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{
          duration: 0.3
        }} className="pt-8 space-y-4" data-magicpath-id="12" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
              <h2 className="text-lg font-semibold text-zinc-800 mb-6 flex items-center gap-2" data-magicpath-id="13" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                <MapPin size={24} className="text-[#005C4B]" data-magicpath-id="14" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx" />
                Where should we deliver?
              </h2>

              <div className="space-y-3" data-magicpath-id="15" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                {savedAddresses.map((addr, index) => {
              const isSelected = selectedAddress === addr.id;
              return <motion.button key={addr.id} onClick={() => setSelectedAddress(addr.id)} initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: index * 0.1
              }} className={cn("w-full p-6 rounded-[2rem] transition-all cursor-pointer text-left", isSelected ? "bg-[#DDF247] shadow-md" : "bg-white hover:bg-zinc-50")} whileTap={{
                scale: 0.98
              }} data-magicpath-id="16" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                      <div className="flex items-start justify-between" data-magicpath-id="17" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                        <div className="flex-1" data-magicpath-id="18" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                          <div className="flex items-center gap-2 mb-2" data-magicpath-id="19" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                            <span className={cn("font-bold text-lg", isSelected ? "text-[#2A1805]" : "text-zinc-800")} data-magicpath-id="20" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                              {addr.name}
                            </span>
                            {addr.isDefault && <span className="px-2 py-0.5 bg-[#005C4B] text-white text-xs font-semibold rounded-full" data-magicpath-id="21" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                                Default
                              </span>}
                          </div>
                          <p className={cn("text-sm mb-1", isSelected ? "text-zinc-700" : "text-zinc-600")} data-magicpath-id="22" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                            {addr.street}
                          </p>
                          <p className={cn("text-sm mb-2", isSelected ? "text-zinc-700" : "text-zinc-600")} data-magicpath-id="23" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                            {addr.city}, {addr.zip}
                          </p>
                          <p className={cn("text-sm flex items-center gap-2", isSelected ? "text-zinc-700" : "text-zinc-600")} data-magicpath-id="24" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                            <Phone size={14} data-magicpath-id="25" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx" />
                            {addr.phone}
                          </p>
                        </div>
                        
                        {isSelected && <motion.div initial={{
                    scale: 0
                  }} animate={{
                    scale: 1
                  }} className="w-8 h-8 bg-[#005C4B] rounded-full flex items-center justify-center shrink-0" data-magicpath-id="26" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                            <Check size={18} className="text-white" strokeWidth={3} data-magicpath-id="27" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx" />
                          </motion.div>}
                      </div>
                    </motion.button>;
            })}
              </div>

              {/* Add New Address */}
              <motion.button initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            delay: 0.3
          }} className="w-full p-6 rounded-[2rem] bg-white border-2 border-dashed border-zinc-300 hover:border-[#005C4B] transition-all cursor-pointer" whileTap={{
            scale: 0.98
          }} data-magicpath-id="28" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                <div className="flex items-center justify-center gap-2 text-[#005C4B]" data-magicpath-id="29" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                  <MapPin size={20} data-magicpath-id="30" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx" />
                  <span className="font-semibold" data-magicpath-id="31" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">Add New Address</span>
                </div>
              </motion.button>
            </motion.div>}

          {/* Step 2: Payment Method */}
          {currentStep === 'payment' && <motion.div key="payment" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{
          duration: 0.3
        }} className="pt-8 space-y-4" data-magicpath-id="32" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
              <h2 className="text-lg font-semibold text-zinc-800 mb-6 flex items-center gap-2" data-magicpath-id="33" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                <CreditCard size={24} className="text-[#005C4B]" data-magicpath-id="34" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx" />
                How would you like to pay?
              </h2>

              <div className="space-y-3" data-magicpath-id="35" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                {/* Credit Card */}
                <motion.button onClick={() => setSelectedPayment('card')} initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} className={cn("w-full p-6 rounded-[2rem] transition-all cursor-pointer", selectedPayment === 'card' ? "bg-[#005C4B] text-white shadow-lg" : "bg-white hover:bg-zinc-50")} whileTap={{
              scale: 0.98
            }} data-magicpath-id="36" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                  <div className="flex items-center justify-between" data-magicpath-id="37" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                    <div className="flex items-center gap-4" data-magicpath-id="38" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                      <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center", selectedPayment === 'card' ? "bg-white/20" : "bg-zinc-100")} data-magicpath-id="39" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                        <CreditCard size={28} className={selectedPayment === 'card' ? "text-[#DDF247]" : "text-[#005C4B]"} data-magicpath-id="40" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx" />
                      </div>
                      <div className="text-left" data-magicpath-id="41" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                        <p className={cn("font-semibold text-lg", selectedPayment === 'card' ? "text-white" : "text-zinc-800")} data-magicpath-id="42" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                          Credit/Debit Card
                        </p>
                        <p className={cn("text-sm", selectedPayment === 'card' ? "text-white/80" : "text-zinc-500")} data-magicpath-id="43" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                          Visa, Mastercard, Amex
                        </p>
                      </div>
                    </div>
                    {selectedPayment === 'card' && <motion.div initial={{
                  scale: 0
                }} animate={{
                  scale: 1
                }} className="w-8 h-8 bg-[#DDF247] rounded-full flex items-center justify-center" data-magicpath-id="44" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                        <Check size={18} className="text-[#005C4B]" strokeWidth={3} data-magicpath-id="45" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx" />
                      </motion.div>}
                  </div>
                </motion.button>

                {/* Digital Wallet */}
                <motion.button onClick={() => setSelectedPayment('wallet')} initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.1
            }} className={cn("w-full p-6 rounded-[2rem] transition-all cursor-pointer", selectedPayment === 'wallet' ? "bg-[#005C4B] text-white shadow-lg" : "bg-white hover:bg-zinc-50")} whileTap={{
              scale: 0.98
            }} data-magicpath-id="46" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                  <div className="flex items-center justify-between" data-magicpath-id="47" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                    <div className="flex items-center gap-4" data-magicpath-id="48" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                      <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center", selectedPayment === 'wallet' ? "bg-white/20" : "bg-zinc-100")} data-magicpath-id="49" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                        <Wallet size={28} className={selectedPayment === 'wallet' ? "text-[#DDF247]" : "text-[#005C4B]"} data-magicpath-id="50" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx" />
                      </div>
                      <div className="text-left" data-magicpath-id="51" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                        <p className={cn("font-semibold text-lg", selectedPayment === 'wallet' ? "text-white" : "text-zinc-800")} data-magicpath-id="52" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                          Digital Wallet
                        </p>
                        <p className={cn("text-sm", selectedPayment === 'wallet' ? "text-white/80" : "text-zinc-500")} data-magicpath-id="53" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                          Apple Pay, Google Pay
                        </p>
                      </div>
                    </div>
                    {selectedPayment === 'wallet' && <motion.div initial={{
                  scale: 0
                }} animate={{
                  scale: 1
                }} className="w-8 h-8 bg-[#DDF247] rounded-full flex items-center justify-center" data-magicpath-id="54" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                        <Check size={18} className="text-[#005C4B]" strokeWidth={3} data-magicpath-id="55" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx" />
                      </motion.div>}
                  </div>
                </motion.button>

                {/* Points Payment */}
                <motion.button onClick={() => canPayWithPoints && setSelectedPayment('points')} initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.2
            }} disabled={!canPayWithPoints} className={cn("w-full p-6 rounded-[2rem] transition-all relative overflow-hidden", !canPayWithPoints && "opacity-50 cursor-not-allowed", canPayWithPoints && "cursor-pointer", selectedPayment === 'points' ? "bg-gradient-to-br from-blue-400 to-blue-500 text-white shadow-lg" : "bg-white hover:bg-zinc-50")} whileTap={canPayWithPoints ? {
              scale: 0.98
            } : {}} data-magicpath-id="56" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                  {/* Background Pattern */}
                  {selectedPayment === 'points' && <div className="absolute inset-0 opacity-10" data-magicpath-id="57" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                      <svg className="w-full h-full" data-magicpath-id="58" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                        <pattern id="dots-payment" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse" data-magicpath-id="59" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                          <circle cx="20" cy="20" r="2" fill="white" data-magicpath-id="60" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#dots-payment)" data-magicpath-id="61" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx" />
                      </svg>
                    </div>}

                  <div className="relative flex items-center justify-between" data-magicpath-id="62" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                    <div className="flex items-center gap-4" data-magicpath-id="63" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                      <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center", selectedPayment === 'points' ? "bg-white/20" : "bg-blue-50")} data-magicpath-id="64" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                        <Sparkles size={28} className={selectedPayment === 'points' ? "text-[#DDF247]" : "text-blue-400"} />
                      </div>
                      <div className="text-left" data-magicpath-id="65" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                        <p className={cn("font-semibold text-lg", selectedPayment === 'points' ? "text-white" : "text-zinc-800")} data-magicpath-id="66" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                          Eco Points
                        </p>
                        <p className={cn("text-sm", selectedPayment === 'points' ? "text-white/80" : "text-zinc-500")} data-magicpath-id="67" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                          {canPayWithPoints ? `${userPoints.toLocaleString()} points available` : `Need ${(totalPoints - userPoints).toLocaleString()} more points`}
                        </p>
                      </div>
                    </div>
                    {selectedPayment === 'points' && <motion.div initial={{
                  scale: 0
                }} animate={{
                  scale: 1
                }} className="w-8 h-8 bg-[#DDF247] rounded-full flex items-center justify-center" data-magicpath-id="68" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                        <Check size={18} className="text-[#005C4B]" strokeWidth={3} data-magicpath-id="69" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx" />
                      </motion.div>}
                  </div>
                </motion.button>
              </div>
            </motion.div>}

          {/* Step 3: Order Review */}
          {currentStep === 'review' && <motion.div key="review" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{
          duration: 0.3
        }} className="pt-8 space-y-4" data-magicpath-id="70" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
              <h2 className="text-lg font-semibold text-zinc-800 mb-6" data-magicpath-id="71" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                Review Your Order
              </h2>

              {/* Order Items */}
              <div className="bg-white rounded-[2rem] p-6 space-y-4" data-magicpath-id="72" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                <h3 className="font-semibold text-zinc-800 mb-4 flex items-center gap-2" data-magicpath-id="73" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                  <Package size={20} className="text-[#005C4B]" data-magicpath-id="74" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx" />
                  Order Items ({cartItems.length})
                </h3>
                
                {cartItems.map((item, index) => <motion.div key={item.id} initial={{
              opacity: 0,
              x: -20
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              delay: index * 0.05
            }} className="flex gap-4" data-magicpath-id="75" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-zinc-100 flex-shrink-0" data-magicpath-id="76" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" data-magicpath-id="77" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx" />
                    </div>
                    <div className="flex-1" data-magicpath-id="78" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                      <h4 className="font-semibold text-zinc-800 text-sm line-clamp-1" data-magicpath-id="79" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                        {item.name}
                      </h4>
                      <p className="text-xs text-zinc-500" data-magicpath-id="80" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right" data-magicpath-id="81" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                      <p className="font-bold text-zinc-800" data-magicpath-id="82" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">${(item.price * item.quantity).toFixed(2)}</p>
                      <p className="text-xs text-[#005C4B] font-semibold" data-magicpath-id="83" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">{(item.points * item.quantity).toLocaleString()}pts</p>
                    </div>
                  </motion.div>)}
              </div>

              {/* Delivery Address */}
              <div className="bg-white rounded-[2rem] p-6" data-magicpath-id="84" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                <h3 className="font-semibold text-zinc-800 mb-4 flex items-center gap-2" data-magicpath-id="85" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                  <MapPin size={20} className="text-[#005C4B]" data-magicpath-id="86" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx" />
                  Delivery Address
                </h3>
                <div className="bg-zinc-50 rounded-xl p-4" data-magicpath-id="87" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                  <p className="font-semibold text-zinc-800" data-magicpath-id="88" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">{address?.name}</p>
                  <p className="text-sm text-zinc-600 mt-1" data-magicpath-id="89" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">{address?.street}</p>
                  <p className="text-sm text-zinc-600" data-magicpath-id="90" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">{address?.city}, {address?.zip}</p>
                  <p className="text-sm text-zinc-600 mt-2" data-magicpath-id="91" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">{address?.phone}</p>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-[2rem] p-6" data-magicpath-id="92" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                <h3 className="font-semibold text-zinc-800 mb-4 flex items-center gap-2" data-magicpath-id="93" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                  <CreditCard size={20} className="text-[#005C4B]" data-magicpath-id="94" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx" />
                  Payment Method
                </h3>
                <div className="bg-zinc-50 rounded-xl p-4 flex items-center gap-3" data-magicpath-id="95" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                  {selectedPayment === 'card' && <CreditCard size={24} className="text-[#005C4B]" data-magicpath-id="96" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx" />}
                  {selectedPayment === 'wallet' && <Wallet size={24} className="text-[#005C4B]" data-magicpath-id="97" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx" />}
                  {selectedPayment === 'points' && <Sparkles size={24} className="text-blue-400" />}
                  <div data-magicpath-id="98" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                    <p className="font-semibold text-zinc-800" data-magicpath-id="99" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                      {selectedPayment === 'card' && 'Credit/Debit Card'}
                      {selectedPayment === 'wallet' && 'Digital Wallet'}
                      {selectedPayment === 'points' && 'Eco Points'}
                    </p>
                    <p className="text-sm text-zinc-500" data-magicpath-id="100" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                      {selectedPayment === 'points' ? `${totalPoints.toLocaleString()} points will be used` : `$${total.toFixed(2)} will be charged`}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-[2.5rem] p-6 relative overflow-hidden" data-magicpath-id="101" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10" data-magicpath-id="102" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                  <svg className="w-full h-full" data-magicpath-id="103" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                    <pattern id="dots-summary" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse" data-magicpath-id="104" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                      <circle cx="20" cy="20" r="2" fill="white" data-magicpath-id="105" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#dots-summary)" data-magicpath-id="106" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx" />
                  </svg>
                </div>

                <div className="relative z-10 space-y-3" data-magicpath-id="107" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                  <h3 className="text-white font-semibold text-lg mb-4" data-magicpath-id="108" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">Order Summary</h3>

                  <div className="flex justify-between items-center" data-magicpath-id="109" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                    <span className="text-white/90 text-sm" data-magicpath-id="110" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">Subtotal</span>
                    <span className="text-white font-semibold" data-magicpath-id="111" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">${subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between items-center" data-magicpath-id="112" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                    <span className="text-white/90 text-sm" data-magicpath-id="113" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">Shipping</span>
                    <span className="text-white font-semibold" data-magicpath-id="114" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                      {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="border-t border-white/20 pt-3 mt-3" data-magicpath-id="115" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                    <div className="flex justify-between items-center mb-3" data-magicpath-id="116" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                      <span className="text-white font-semibold text-lg" data-magicpath-id="117" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">Total</span>
                      <span className="text-white font-bold text-2xl" data-magicpath-id="118" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                        {selectedPayment === 'points' ? `${totalPoints.toLocaleString()} pts` : `$${total.toFixed(2)}`}
                      </span>
                    </div>

                    {selectedPayment !== 'points' && <div className="flex items-center justify-center gap-2 bg-white/20 rounded-xl px-4 py-3 backdrop-blur-sm" data-magicpath-id="119" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                        <Sparkles size={18} className="text-[#DDF247]" />
                        <span className="text-white font-semibold" data-magicpath-id="120" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                          You'll earn {totalPoints.toLocaleString()} points
                        </span>
                      </div>}
                  </div>
                </div>
              </div>
            </motion.div>}

          {/* Step 4: Processing */}
          {currentStep === 'processing' && <motion.div key="processing" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{
          duration: 0.3
        }} className="pt-8 flex flex-col items-center justify-center min-h-[500px]" data-magicpath-id="121" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
              <motion.div animate={{
            rotate: 360
          }} transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }} className="w-32 h-32 bg-[#DDF247] rounded-full flex items-center justify-center mb-8 shadow-xl" data-magicpath-id="122" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                <Loader2 size={64} className="text-[#005C4B]" data-magicpath-id="123" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx" />
              </motion.div>

              <motion.h2 initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.2
          }} className="text-3xl font-bold text-zinc-800 mb-4 text-center" data-magicpath-id="124" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                Processing Payment
              </motion.h2>

              <motion.p initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.3
          }} className="text-zinc-600 text-center px-6" data-magicpath-id="125" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                Please wait while we securely process your payment...
              </motion.p>

              <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.4
          }} className="mt-8 flex gap-2" data-magicpath-id="126" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                {[0, 1, 2].map(i => <motion.div key={i} animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 1, 0.3]
            }} transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2
            }} className="w-3 h-3 bg-[#005C4B] rounded-full" data-magicpath-id="127" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx" />)}
              </motion.div>
            </motion.div>}

          {/* Step 5: Success */}
          {currentStep === 'success' && <motion.div key="success" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{
          duration: 0.3
        }} className="pt-8 flex flex-col items-center justify-center min-h-[500px]" data-magicpath-id="128" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
              <motion.div initial={{
            scale: 0
          }} animate={{
            scale: 1
          }} transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.2
          }} className="w-32 h-32 bg-[#DDF247] rounded-full flex items-center justify-center mb-8 shadow-xl relative" data-magicpath-id="129" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                <Check size={64} className="text-[#005C4B]" strokeWidth={3} data-magicpath-id="130" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx" />
                
                {/* Confetti effect */}
                {[...Array(8)].map((_, i) => <motion.div key={i} initial={{
              scale: 0,
              x: 0,
              y: 0
            }} animate={{
              scale: [0, 1, 0],
              x: Math.cos(i * Math.PI * 2 / 8) * 100,
              y: Math.sin(i * Math.PI * 2 / 8) * 100
            }} transition={{
              duration: 1,
              delay: 0.5,
              ease: "easeOut"
            }} className="absolute w-3 h-3 rounded-full" style={{
              backgroundColor: ['#DDF247', '#005C4B', '#2A1805', '#60A5FA'][i % 4]
            }} data-magicpath-id="131" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx" />)}
              </motion.div>

              <motion.h2 initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.4
          }} className="text-3xl font-bold text-zinc-800 mb-4 text-center" data-magicpath-id="132" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                Order Confirmed!
              </motion.h2>

              <motion.p initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.5
          }} className="text-zinc-600 text-center mb-8 px-6" data-magicpath-id="133" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                Your order has been placed successfully. We'll send you a confirmation email shortly.
              </motion.p>

              <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.6
          }} className="bg-white p-6 rounded-[2rem] w-full max-w-md shadow-sm" data-magicpath-id="134" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                <div className="flex items-center gap-4 mb-4" data-magicpath-id="135" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                  <div className="w-16 h-16 bg-[#DDF247] rounded-2xl flex items-center justify-center" data-magicpath-id="136" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                    <Package size={32} className="text-[#005C4B]" data-magicpath-id="137" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx" />
                  </div>
                  <div data-magicpath-id="138" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                    <p className="text-sm text-zinc-500" data-magicpath-id="139" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">Estimated delivery</p>
                    <p className="text-xl font-bold text-[#2A1805]" data-magicpath-id="140" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">3-5 business days</p>
                  </div>
                </div>
                <div className="border-t border-zinc-100 pt-4" data-magicpath-id="141" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                  <p className="text-sm text-zinc-600 mb-2" data-magicpath-id="142" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                    Order ID: <span className="font-semibold text-zinc-800" data-magicpath-id="143" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">#ECO-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                  </p>
                  {selectedPayment !== 'points' && <div className="flex items-center gap-2 bg-blue-50 rounded-xl px-4 py-3 mt-3" data-magicpath-id="144" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                      <Sparkles size={18} className="text-blue-400" />
                      <span className="text-sm text-zinc-700" data-magicpath-id="145" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                        <span className="font-bold text-[#005C4B]" data-magicpath-id="146" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">+{totalPoints.toLocaleString()} points</span> earned!
                      </span>
                    </div>}
                </div>
              </motion.div>

              <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.7
          }} className="mt-8 text-center" data-magicpath-id="147" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                <p className="text-sm text-zinc-500 mb-2" data-magicpath-id="148" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                  Track your order in real-time
                </p>
                <button className="text-[#005C4B] font-semibold hover:underline" data-magicpath-id="149" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
                  View Order Status →
                </button>
              </motion.div>
            </motion.div>}
        </AnimatePresence>
      </div>

      {/* Bottom Action Button */}
      {currentStep !== 'processing' && currentStep !== 'success' && <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-zinc-50 via-zinc-50 to-transparent z-20" data-magicpath-id="150" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
          <motion.button onClick={handleNext} className="w-full py-5 rounded-[2rem] font-bold text-lg transition-all bg-gradient-to-r from-[#DDF247] to-[#B8E635] text-[#2A1805] hover:shadow-xl shadow-lg cursor-pointer" whileTap={{
        scale: 0.98
      }} initial={{
        y: 100,
        opacity: 0
      }} animate={{
        y: 0,
        opacity: 1
      }} transition={{
        delay: 0.3,
        type: "spring",
        stiffness: 200
      }} data-magicpath-id="151" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
            {currentStep === 'review' ? 'Complete Purchase' : 'Continue'}
          </motion.button>
        </div>}

      {/* Success - Back to Shopping Button */}
      {currentStep === 'success' && <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-zinc-50 via-zinc-50 to-transparent z-20" data-magicpath-id="152" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
          <motion.button onClick={onBack} className="w-full py-5 rounded-[2rem] font-bold text-lg transition-all bg-[#005C4B] text-white shadow-lg hover:shadow-xl cursor-pointer" whileTap={{
        scale: 0.98
      }} initial={{
        y: 100,
        opacity: 0
      }} animate={{
        y: 0,
        opacity: 1
      }} transition={{
        delay: 0.8
      }} data-magicpath-id="153" data-magicpath-path="CheckoutPage_dupe_3_dupe_1.tsx">
            Back to Shop
          </motion.button>
        </div>}
    </div>;
};
export default CheckoutPage;