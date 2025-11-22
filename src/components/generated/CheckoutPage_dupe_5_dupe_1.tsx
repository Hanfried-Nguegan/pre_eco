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
  return <div className="relative w-full h-full min-h-screen bg-zinc-50 flex flex-col font-sans overflow-hidden">
      {/* Header */}
      <header className="bg-white px-6 py-6 shadow-sm relative z-20">
        <div className="flex items-center gap-4">
          <button onClick={handleBack} className="p-2.5 rounded-full bg-zinc-100 hover:bg-zinc-200 transition-all cursor-pointer" disabled={isProcessing || currentStep === 'success'}>
            <ChevronLeft size={24} className="text-zinc-800" />
          </button>
          
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-zinc-800">Checkout</h1>
            <p className="text-sm text-zinc-500 mt-0.5">
              {currentStep === 'address' && 'Delivery address'}
              {currentStep === 'payment' && 'Payment method'}
              {currentStep === 'review' && 'Review your order'}
              {currentStep === 'processing' && 'Processing payment...'}
              {currentStep === 'success' && 'Order confirmed!'}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        {currentStep !== 'success' && <div className="mt-6 h-2 bg-zinc-100 rounded-full overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-[#DDF247] to-[#005C4B]" initial={{
          width: 0
        }} animate={{
          width: `${progressPercent}%`
        }} transition={{
          duration: 0.5,
          ease: 'easeOut'
        }} />
          </div>}
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-32 px-6">
        <AnimatePresence mode="wait">
          {/* Step 1: Address Selection */}
          {currentStep === 'address' && <motion.div key="address" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{
          duration: 0.3
        }} className="pt-8 space-y-4">
              <h2 className="text-lg font-semibold text-zinc-800 mb-6 flex items-center gap-2">
                <MapPin size={24} className="text-[#005C4B]" />
                Where should we deliver?
              </h2>

              <div className="space-y-3">
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
              }}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={cn("font-bold text-lg", isSelected ? "text-[#2A1805]" : "text-zinc-800")}>
                              {addr.name}
                            </span>
                            {addr.isDefault && <span className="px-2 py-0.5 bg-[#005C4B] text-white text-xs font-semibold rounded-full">
                                Default
                              </span>}
                          </div>
                          <p className={cn("text-sm mb-1", isSelected ? "text-zinc-700" : "text-zinc-600")}>
                            {addr.street}
                          </p>
                          <p className={cn("text-sm mb-2", isSelected ? "text-zinc-700" : "text-zinc-600")}>
                            {addr.city}, {addr.zip}
                          </p>
                          <p className={cn("text-sm flex items-center gap-2", isSelected ? "text-zinc-700" : "text-zinc-600")}>
                            <Phone size={14} />
                            {addr.phone}
                          </p>
                        </div>
                        
                        {isSelected && <motion.div initial={{
                    scale: 0
                  }} animate={{
                    scale: 1
                  }} className="w-8 h-8 bg-[#005C4B] rounded-full flex items-center justify-center shrink-0">
                            <Check size={18} className="text-white" strokeWidth={3} />
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
          }}>
                <div className="flex items-center justify-center gap-2 text-[#005C4B]">
                  <MapPin size={20} />
                  <span className="font-semibold">Add New Address</span>
                </div>
              </motion.button>
            </motion.div>}

          {/* Step 2: Payment Method */}
          {currentStep === 'payment' && <motion.div key="payment" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{
          duration: 0.3
        }} className="pt-8 space-y-4">
              <h2 className="text-lg font-semibold text-zinc-800 mb-6 flex items-center gap-2">
                <CreditCard size={24} className="text-[#005C4B]" />
                How would you like to pay?
              </h2>

              <div className="space-y-3">
                {/* Credit Card */}
                <motion.button onClick={() => setSelectedPayment('card')} initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} className={cn("w-full p-6 rounded-[2rem] transition-all cursor-pointer", selectedPayment === 'card' ? "bg-[#005C4B] text-white shadow-lg" : "bg-white hover:bg-zinc-50")} whileTap={{
              scale: 0.98
            }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center", selectedPayment === 'card' ? "bg-white/20" : "bg-zinc-100")}>
                        <CreditCard size={28} className={selectedPayment === 'card' ? "text-[#DDF247]" : "text-[#005C4B]"} />
                      </div>
                      <div className="text-left">
                        <p className={cn("font-semibold text-lg", selectedPayment === 'card' ? "text-white" : "text-zinc-800")}>
                          Credit/Debit Card
                        </p>
                        <p className={cn("text-sm", selectedPayment === 'card' ? "text-white/80" : "text-zinc-500")}>
                          Visa, Mastercard, Amex
                        </p>
                      </div>
                    </div>
                    {selectedPayment === 'card' && <motion.div initial={{
                  scale: 0
                }} animate={{
                  scale: 1
                }} className="w-8 h-8 bg-[#DDF247] rounded-full flex items-center justify-center">
                        <Check size={18} className="text-[#005C4B]" strokeWidth={3} />
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
            }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center", selectedPayment === 'wallet' ? "bg-white/20" : "bg-zinc-100")}>
                        <Wallet size={28} className={selectedPayment === 'wallet' ? "text-[#DDF247]" : "text-[#005C4B]"} />
                      </div>
                      <div className="text-left">
                        <p className={cn("font-semibold text-lg", selectedPayment === 'wallet' ? "text-white" : "text-zinc-800")}>
                          Digital Wallet
                        </p>
                        <p className={cn("text-sm", selectedPayment === 'wallet' ? "text-white/80" : "text-zinc-500")}>
                          Apple Pay, Google Pay
                        </p>
                      </div>
                    </div>
                    {selectedPayment === 'wallet' && <motion.div initial={{
                  scale: 0
                }} animate={{
                  scale: 1
                }} className="w-8 h-8 bg-[#DDF247] rounded-full flex items-center justify-center">
                        <Check size={18} className="text-[#005C4B]" strokeWidth={3} />
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
            } : {}}>
                  {/* Background Pattern */}
                  {selectedPayment === 'points' && <div className="absolute inset-0 opacity-10">
                      <svg className="w-full h-full">
                        <pattern id="dots-payment" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                          <circle cx="20" cy="20" r="2" fill="white" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#dots-payment)" />
                      </svg>
                    </div>}

                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center", selectedPayment === 'points' ? "bg-white/20" : "bg-blue-50")}>
                        <Sparkles size={28} className={selectedPayment === 'points' ? "text-[#DDF247]" : "text-blue-400"} />
                      </div>
                      <div className="text-left">
                        <p className={cn("font-semibold text-lg", selectedPayment === 'points' ? "text-white" : "text-zinc-800")}>
                          Eco Points
                        </p>
                        <p className={cn("text-sm", selectedPayment === 'points' ? "text-white/80" : "text-zinc-500")}>
                          {canPayWithPoints ? `${userPoints.toLocaleString()} points available` : `Need ${(totalPoints - userPoints).toLocaleString()} more points`}
                        </p>
                      </div>
                    </div>
                    {selectedPayment === 'points' && <motion.div initial={{
                  scale: 0
                }} animate={{
                  scale: 1
                }} className="w-8 h-8 bg-[#DDF247] rounded-full flex items-center justify-center">
                        <Check size={18} className="text-[#005C4B]" strokeWidth={3} />
                      </motion.div>}
                  </div>
                </motion.button>
              </div>
            </motion.div>}

          {/* Step 3: Order Review */}
          {currentStep === 'review' && <motion.div key="review" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{
          duration: 0.3
        }} className="pt-8 space-y-4">
              <h2 className="text-lg font-semibold text-zinc-800 mb-6">
                Review Your Order
              </h2>

              {/* Order Items */}
              <div className="bg-white rounded-[2rem] p-6 space-y-4">
                <h3 className="font-semibold text-zinc-800 mb-4 flex items-center gap-2">
                  <Package size={20} className="text-[#005C4B]" />
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
            }} className="flex gap-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-zinc-100 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-zinc-800 text-sm line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="text-xs text-zinc-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-zinc-800">${(item.price * item.quantity).toFixed(2)}</p>
                      <p className="text-xs text-[#005C4B] font-semibold">{(item.points * item.quantity).toLocaleString()}pts</p>
                    </div>
                  </motion.div>)}
              </div>

              {/* Delivery Address */}
              <div className="bg-white rounded-[2rem] p-6">
                <h3 className="font-semibold text-zinc-800 mb-4 flex items-center gap-2">
                  <MapPin size={20} className="text-[#005C4B]" />
                  Delivery Address
                </h3>
                <div className="bg-zinc-50 rounded-xl p-4">
                  <p className="font-semibold text-zinc-800">{address?.name}</p>
                  <p className="text-sm text-zinc-600 mt-1">{address?.street}</p>
                  <p className="text-sm text-zinc-600">{address?.city}, {address?.zip}</p>
                  <p className="text-sm text-zinc-600 mt-2">{address?.phone}</p>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-[2rem] p-6">
                <h3 className="font-semibold text-zinc-800 mb-4 flex items-center gap-2">
                  <CreditCard size={20} className="text-[#005C4B]" />
                  Payment Method
                </h3>
                <div className="bg-zinc-50 rounded-xl p-4 flex items-center gap-3">
                  {selectedPayment === 'card' && <CreditCard size={24} className="text-[#005C4B]" />}
                  {selectedPayment === 'wallet' && <Wallet size={24} className="text-[#005C4B]" />}
                  {selectedPayment === 'points' && <Sparkles size={24} className="text-blue-400" />}
                  <div>
                    <p className="font-semibold text-zinc-800">
                      {selectedPayment === 'card' && 'Credit/Debit Card'}
                      {selectedPayment === 'wallet' && 'Digital Wallet'}
                      {selectedPayment === 'points' && 'Eco Points'}
                    </p>
                    <p className="text-sm text-zinc-500">
                      {selectedPayment === 'points' ? `${totalPoints.toLocaleString()} points will be used` : `$${total.toFixed(2)} will be charged`}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-[2.5rem] p-6 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <svg className="w-full h-full">
                    <pattern id="dots-summary" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                      <circle cx="20" cy="20" r="2" fill="white" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#dots-summary)" />
                  </svg>
                </div>

                <div className="relative z-10 space-y-3">
                  <h3 className="text-white font-semibold text-lg mb-4">Order Summary</h3>

                  <div className="flex justify-between items-center">
                    <span className="text-white/90 text-sm">Subtotal</span>
                    <span className="text-white font-semibold">${subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-white/90 text-sm">Shipping</span>
                    <span className="text-white font-semibold">
                      {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="border-t border-white/20 pt-3 mt-3">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-white font-semibold text-lg">Total</span>
                      <span className="text-white font-bold text-2xl">
                        {selectedPayment === 'points' ? `${totalPoints.toLocaleString()} pts` : `$${total.toFixed(2)}`}
                      </span>
                    </div>

                    {selectedPayment !== 'points' && <div className="flex items-center justify-center gap-2 bg-white/20 rounded-xl px-4 py-3 backdrop-blur-sm">
                        <Sparkles size={18} className="text-[#DDF247]" />
                        <span className="text-white font-semibold">
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
        }} className="pt-8 flex flex-col items-center justify-center min-h-[500px]">
              <motion.div animate={{
            rotate: 360
          }} transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }} className="w-32 h-32 bg-[#DDF247] rounded-full flex items-center justify-center mb-8 shadow-xl">
                <Loader2 size={64} className="text-[#005C4B]" />
              </motion.div>

              <motion.h2 initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.2
          }} className="text-3xl font-bold text-zinc-800 mb-4 text-center">
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
          }} className="text-zinc-600 text-center px-6">
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
          }} className="mt-8 flex gap-2">
                {[0, 1, 2].map(i => <motion.div key={i} animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 1, 0.3]
            }} transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2
            }} className="w-3 h-3 bg-[#005C4B] rounded-full" />)}
              </motion.div>
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
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.2
          }} className="w-32 h-32 bg-[#DDF247] rounded-full flex items-center justify-center mb-8 shadow-xl relative">
                <Check size={64} className="text-[#005C4B]" strokeWidth={3} />
                
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
            }} />)}
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
          }} className="text-zinc-600 text-center mb-8 px-6">
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
          }} className="bg-white p-6 rounded-[2rem] w-full max-w-md shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-[#DDF247] rounded-2xl flex items-center justify-center">
                    <Package size={32} className="text-[#005C4B]" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500">Estimated delivery</p>
                    <p className="text-xl font-bold text-[#2A1805]">3-5 business days</p>
                  </div>
                </div>
                <div className="border-t border-zinc-100 pt-4">
                  <p className="text-sm text-zinc-600 mb-2">
                    Order ID: <span className="font-semibold text-zinc-800">#ECO-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                  </p>
                  {selectedPayment !== 'points' && <div className="flex items-center gap-2 bg-blue-50 rounded-xl px-4 py-3 mt-3">
                      <Sparkles size={18} className="text-blue-400" />
                      <span className="text-sm text-zinc-700">
                        <span className="font-bold text-[#005C4B]">+{totalPoints.toLocaleString()} points</span> earned!
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
          }} className="mt-8 text-center">
                <p className="text-sm text-zinc-500 mb-2">
                  Track your order in real-time
                </p>
                <button className="text-[#005C4B] font-semibold hover:underline">
                  View Order Status →
                </button>
              </motion.div>
            </motion.div>}
        </AnimatePresence>
      </div>

      {/* Bottom Action Button */}
      {currentStep !== 'processing' && currentStep !== 'success' && <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-zinc-50 via-zinc-50 to-transparent z-20">
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
      }}>
            {currentStep === 'review' ? 'Complete Purchase' : 'Continue'}
          </motion.button>
        </div>}

      {/* Success - Back to Shopping Button */}
      {currentStep === 'success' && <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-zinc-50 via-zinc-50 to-transparent z-20">
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
      }}>
            Back to Shop
          </motion.button>
        </div>}
    </div>;
};
export default CheckoutPage;