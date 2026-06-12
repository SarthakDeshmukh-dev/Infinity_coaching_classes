import { useEffect, useRef, useState } from 'react';
import { Send, CheckCircle, AlertCircle, User, Phone, BookOpen, MessageSquare } from 'lucide-react';

interface FormData {
  name: string;
  phone: string;
  class: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  class?: string;
}

const classes = [
  'Class 8',
  'Class 9',
  'Class 10',
  'Class 11',
  'Class 12',
  'Dropper',
];

export default function Enquiry() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    class: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim() || formData.name.length < 2) {
      newErrors.name = 'Please enter a valid name';
    }
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (!formData.class) {
      newErrors.class = 'Please select your class';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (!validate()) return;

    setSubmitting(true);

    try {
      // 1. Paste your deployed Web App URL here
      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbycHmymfEqc7dcMyLV06g0eQluE5WrxFbKgP8mSx9euVeSIyfhGJXWYspezuCN_XUWz/exec';

      const payload = {
        name: formData.name.trim(),
        phone: formData.phone.replace(/\D/g, ''),
        class: formData.class,
        message: formData.message.trim(),
        timestamp: new Date().toISOString(),
      };

      // 2. Perform the actual fetch request
      // Note: We use 'text/plain' because Google Apps Script does not accept 
      // preflight CORS requests triggered by 'application/json' headers.
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      
      if (result.status !== 'success') {
        throw new Error(result.message || 'Failed to submit');
      }

      setSubmitted(true);
      setFormData({ name: '', phone: '', class: '', message: '' });
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitError('Something went wrong. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="enquiry"
      ref={sectionRef}
      className="section-padding bg-gradient-to-b from-navy to-[#000814] relative overflow-hidden"
    >
      {/* Decorative particles - static dots */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-14 md:mb-20 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-0.5 bg-goldenrod" />
            <span className="text-goldenrod font-body text-sm font-semibold uppercase tracking-wider">
              Get In Touch
            </span>
            <span className="w-8 h-0.5 bg-goldenrod" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-white">
            Start Your Journey
          </h2>
          <p className="mt-4 text-white/60 font-body text-base md:text-lg max-w-xl mx-auto">
            Fill out the form below and our team will get back to you within 24 hours.
          </p>
        </div>

        {/* Form Card */}
        <div
          className={`max-w-3xl mx-auto transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 md:p-10 border border-white/10 shadow-2xl">
            {submitted ? (
              <div className="text-center py-10">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="font-display text-2xl text-white mb-2">
                  Thank You!
                </h3>
                <p className="text-white/60 font-body">
                  Your enquiry has been submitted successfully. We'll contact you soon.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-2.5 bg-royal text-white font-body text-sm font-medium rounded-full hover:bg-bright transition-colors"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-white/80 font-body text-sm font-medium mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: undefined });
                        }}
                        placeholder="Enter your name"
                        className={`w-full pl-11 pr-4 py-3 bg-white/5 border rounded-xl text-white font-body text-sm placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-royal/50 transition-all ${
                          errors.name ? 'border-red-400' : 'border-white/10'
                        }`}
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1.5 text-red-400 font-body text-xs flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-white/80 font-body text-sm font-medium mb-2">
                      Mobile Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (errors.phone) setErrors({ ...errors, phone: undefined });
                        }}
                        placeholder="10-digit mobile number"
                        className={`w-full pl-11 pr-4 py-3 bg-white/5 border rounded-xl text-white font-body text-sm placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-royal/50 transition-all ${
                          errors.phone ? 'border-red-400' : 'border-white/10'
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1.5 text-red-400 font-body text-xs flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Class Dropdown */}
                <div>
                  <label className="block text-white/80 font-body text-sm font-medium mb-2">
                    Current Class
                  </label>
                  <div className="relative">
                    <BookOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <select
                      value={formData.class}
                      onChange={(e) => {
                        setFormData({ ...formData, class: e.target.value });
                        if (errors.class) setErrors({ ...errors, class: undefined });
                      }}
                      className={`w-full pl-11 pr-4 py-3 bg-white/5 border rounded-xl text-white font-body text-sm focus:outline-none focus:ring-2 focus:ring-royal/50 transition-all appearance-none ${
                        errors.class ? 'border-red-400' : 'border-white/10'
                      } ${!formData.class ? 'text-white/30' : ''}`}
                    >
                      <option value="" className="bg-navy text-white/50">Select your class</option>
                      {classes.map((cls) => (
                        <option key={cls} value={cls} className="bg-navy text-white">
                          {cls}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.class && (
                    <p className="mt-1.5 text-red-400 font-body text-xs flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.class}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-white/80 font-body text-sm font-medium mb-2">
                    Message (Optional)
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-white/30" />
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Any specific query or requirement..."
                      rows={4}
                      className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-body text-sm placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-royal/50 transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Error Message */}
                {submitError && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                    <p className="text-red-400 font-body text-sm flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" /> {submitError}
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-goldenrod text-[#000814] font-body text-base font-bold rounded-full hover:bg-warm transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-[#000814]/30 border-t-[#000814] rounded-full animate-spin" />
                      Submitting...
                    </span>
                  ) : (
                    <>
                      Send Enquiry
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Note */}
                <p className="text-center text-white/30 font-body text-xs">
                  Your information is safe with us. We never share your data with third parties.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
