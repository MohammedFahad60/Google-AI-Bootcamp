import React, { useState } from 'react';
import {
  X,
  Check,
  Flame,
  User,
  Phone,
  Shirt,
  CreditCard,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Lock,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { RACE_CATEGORIES_DATA } from '../data/mockData';
import { RaceCategory } from '../types';

interface RegistrationFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: RaceCategory;
}

export const RegistrationFlowModal: React.FC<RegistrationFlowModalProps> = ({
  isOpen,
  onClose,
  initialCategory = 'half',
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<RaceCategory>(initialCategory);

  // Form State
  const [formData, setFormData] = useState({
    fullName: 'Arjun Sharma',
    dob: '1993-05-14',
    gender: 'Male',
    email: 'arjun.sharma@example.com',
    phone: '+91 98860 12345',
    address: '14th Main, 4th Block, Koramangala',
    city: 'Bengaluru',
    country: 'India',
    emergencyName: 'Priya Sharma',
    emergencyRelationship: 'Spouse',
    emergencyPhone: '+91 98860 54321',
    tshirtSize: 'M',
    tshirtGender: 'Men',
    paymentMethod: 'UPI',
    assignedBib: 'BGL10248',
  });

  if (!isOpen) return null;

  const steps = [
    { num: 1, label: 'Race' },
    { num: 2, label: 'Personal Details' },
    { num: 3, label: 'Emergency Contact' },
    { num: 4, label: 'T-Shirt' },
    { num: 5, label: 'Payment' },
    { num: 6, label: 'Confirmation' },
  ];

  const currentRace =
    RACE_CATEGORIES_DATA.find((r) => r.id === selectedCategory) ||
    RACE_CATEGORIES_DATA[1];

  const handleNext = () => {
    if (currentStep === 5) {
      // Completed payment! Trigger celebratory confetti
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FF6B2C', '#1479FF', '#FFC857', '#12B76A'],
      });
      setCurrentStep(6);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="bg-[#071A33] text-white px-6 py-4 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#FF6B2C] flex items-center justify-center text-white">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <div className="font-heading font-black text-sm tracking-tight">
                BENGALURU MARATHON 2026
              </div>
              <div className="text-[10px] text-slate-300">
                Official Registration Portal
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Progress Bar */}
        <div className="bg-slate-50 px-6 py-3 border-b border-slate-200">
          <div className="flex items-center justify-between max-w-xl mx-auto">
            {steps.map((s) => {
              const isDone = currentStep > s.num;
              const isCurrent = currentStep === s.num;
              return (
                <div key={s.num} className="flex flex-col items-center">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isDone
                        ? 'bg-[#12B76A] text-white'
                        : isCurrent
                        ? 'bg-[#1479FF] text-white ring-4 ring-[#1479FF]/20'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {isDone ? <Check className="w-3.5 h-3.5" /> : s.num}
                  </div>
                  <span className="hidden sm:inline-block text-[10px] font-bold text-slate-600 mt-1">
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Body / Multi-step Views */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {/* STEP 1: RACE CATEGORY SELECTION */}
          {currentStep === 1 && (
            <div>
              <h3 className="font-heading font-black text-xl text-[#071A33]">
                SELECT YOUR RACE CATEGORY
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Choose the challenge you wish to conquer on Sunday, Oct 18, 2026.
              </p>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {RACE_CATEGORIES_DATA.map((race) => {
                  const isSelected = selectedCategory === race.id;
                  return (
                    <div
                      key={race.id}
                      onClick={() => setSelectedCategory(race.id)}
                      className={`cursor-pointer rounded-2xl p-4 border transition-all ${
                        isSelected
                          ? 'border-[#1479FF] bg-blue-50/50 ring-2 ring-[#1479FF]/30 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-heading font-black text-lg text-[#071A33]">
                            {race.name}
                          </div>
                          <div className="text-xs font-bold text-[#FF6B2C]">
                            {race.distanceLabel}
                          </div>
                        </div>
                        <span className="font-heading font-black text-base text-slate-900">
                          ₹{race.feeINR}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                        {race.description}
                      </p>
                      <div className="mt-3 text-[11px] text-slate-400 font-semibold">
                        Start: {race.startTime}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: PERSONAL DETAILS */}
          {currentStep === 2 && (
            <div>
              <h3 className="font-heading font-black text-xl text-[#071A33]">
                RUNNER'S PERSONAL DETAILS
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Required for your official timing bib certificate and government medical registry.
              </p>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#1479FF]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) =>
                      setFormData({ ...formData, dob: e.target.value })
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#1479FF]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#1479FF]"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Non-Binary / Other</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#1479FF]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Phone (with country code)</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#1479FF]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#1479FF]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-slate-700 block mb-1">Residential Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#1479FF]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: EMERGENCY CONTACT */}
          {currentStep === 3 && (
            <div>
              <h3 className="font-heading font-black text-xl text-[#071A33]">
                EMERGENCY CONTACT DETAILS
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Printed on the reverse of your physical timing bib for medical safety.
              </p>

              <div className="mt-5 space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Emergency Contact Full Name</label>
                  <input
                    type="text"
                    value={formData.emergencyName}
                    onChange={(e) =>
                      setFormData({ ...formData, emergencyName: e.target.value })
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#1479FF]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Relationship</label>
                  <input
                    type="text"
                    value={formData.emergencyRelationship}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        emergencyRelationship: e.target.value,
                      })
                    }
                    placeholder="e.g. Spouse, Parent, Friend"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#1479FF]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Emergency Phone Number</label>
                  <input
                    type="tel"
                    value={formData.emergencyPhone}
                    onChange={(e) =>
                      setFormData({ ...formData, emergencyPhone: e.target.value })
                    }
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#1479FF]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: T-SHIRT SELECTION */}
          {currentStep === 4 && (
            <div>
              <h3 className="font-heading font-black text-xl text-[#071A33]">
                OFFICIAL RACE APPAREL
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Select your moisture-wicking technical running singlet size included with registration.
              </p>

              <div className="mt-6">
                <label className="font-bold text-xs text-slate-700 block mb-2">
                  Select Size (Unisex Standard)
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setFormData({ ...formData, tshirtSize: size })}
                      className={`py-3 rounded-xl font-heading font-black text-sm border transition-all ${
                        formData.tshirtSize === size
                          ? 'bg-[#1479FF] text-white border-[#1479FF] shadow-md'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center gap-3">
                <Shirt className="w-6 h-6 text-[#1479FF] shrink-0" />
                <div>
                  <span className="font-bold text-slate-800">Breathable Micro-Mesh:</span>{' '}
                  Engineered with rapid-dry honeycomb fabric featuring the Bengaluru Skyline graphic on the back.
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: PAYMENT & CHECKOUT */}
          {currentStep === 5 && (
            <div>
              <h3 className="font-heading font-black text-xl text-[#071A33]">
                REVIEW & PAYMENT
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Secure 256-bit encrypted checkout via UPI, Cards, or NetBanking.
              </p>

              {/* Order Summary */}
              <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between text-slate-600">
                  <span>{currentRace.name} Entry Fee</span>
                  <span className="font-mono font-bold">₹{currentRace.feeINR}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>RFID Timing & Bib Kit</span>
                  <span className="text-[#12B76A] font-bold">INCLUDED</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Pro Tech T-Shirt (Size {formData.tshirtSize})</span>
                  <span className="text-[#12B76A] font-bold">INCLUDED</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-heading font-black text-[#071A33]">
                  <span>Total Amount Payable</span>
                  <span className="font-mono text-base text-[#1479FF]">
                    ₹{currentRace.feeINR}
                  </span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mt-5 space-y-2">
                <label className="text-xs font-bold text-slate-700 block">
                  Select Payment Method
                </label>
                {['UPI (Google Pay / PhonePe / Paytm)', 'Credit / Debit Card', 'Net Banking'].map(
                  (method) => (
                    <label
                      key={method}
                      className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer text-xs font-semibold text-slate-800"
                    >
                      <input
                        type="radio"
                        name="pay"
                        checked={formData.paymentMethod === method}
                        onChange={() =>
                          setFormData({ ...formData, paymentMethod: method })
                        }
                        className="text-[#1479FF]"
                      />
                      <span>{method}</span>
                    </label>
                  )
                )}
              </div>
            </div>
          )}

          {/* STEP 6: CONFIRMATION SCREEN (YOU'RE IN!) */}
          {currentStep === 6 && (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-[#12B76A]/15 text-[#12B76A] flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8" />
              </div>

              <div className="font-heading font-black text-xs text-[#12B76A] tracking-widest uppercase">
                REGISTRATION SUCCESSFUL
              </div>
              <h3 className="font-heading font-black text-3xl text-[#071A33] mt-1">
                YOU'RE IN! 🎉
              </h3>
              <p className="text-slate-600 text-sm mt-1">
                Welcome to the Bengaluru Marathon 2026! We can't wait to see you at the start line.
              </p>

              {/* Confirmed Runner Card */}
              <div className="mt-6 p-6 rounded-2xl bg-gradient-to-br from-[#071A33] to-[#0c2340] text-white text-left shadow-xl border border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Runner</span>
                    <div className="font-heading font-black text-xl text-white">
                      {formData.fullName}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Assigned Bib</span>
                    <div className="font-mono font-black text-2xl text-[#FFC857]">
                      {formData.assignedBib}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase">Race Category</span>
                    <div className="font-bold text-[#1479FF]">{currentRace.name}</div>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase">Race Date</span>
                    <div className="font-bold">Oct 18, 2026</div>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase">Venue</span>
                    <div className="font-bold">Sree Kanteerava Stadium</div>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase">Flag-Off Time</span>
                    <div className="font-bold">{currentRace.startTime}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Actions Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          {currentStep > 1 && currentStep < 6 && (
            <button
              onClick={handlePrev}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          )}

          <div className="ml-auto flex items-center gap-3">
            {currentStep < 6 ? (
              <button
                id="btn-reg-next"
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl font-heading font-bold text-xs sm:text-sm text-white bg-[#FF6B2C] hover:bg-[#f05a18] shadow-md shadow-[#FF6B2C]/25 transition-all flex items-center gap-2"
              >
                <span>{currentStep === 5 ? 'Pay & Confirm' : 'Continue'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl font-heading font-bold text-xs sm:text-sm text-white bg-[#071A33] hover:bg-[#1479FF] transition-colors"
              >
                Go to Dashboard
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
