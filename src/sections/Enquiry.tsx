import { useEffect, useRef, useState } from 'react';
import {
  Send,
  CheckCircle,
  AlertCircle,
  User,
  Phone,
  BookOpen,
  MessageSquare,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

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

export default function Enquiry() {
  const { t } = useTranslation();

  const classes = t('enquiry.classes', {
    returnObjects: true,
  }) as string[];

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
      newErrors.name = t('enquiry.validation.name');
    }

    if (
      !formData.phone.trim() ||
      !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))
    ) {
      newErrors.phone = t('enquiry.validation.phone');
    }

    if (!formData.class) {
      newErrors.class = t('enquiry.validation.class');
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


      const GOOGLE_SCRIPT_URL =
        'https://script.google.com/macros/s/AKfycbycHmymfEqc7dcMyLV06g0eQluE5WrxFbKgP8mSx9euVeSIyfhGJXWYspezuCN_XUWz/exec';

      const payload = {
        name: formData.name.trim(),
        phone: formData.phone.replace(/\D/g, ''),
        class: formData.class,
        message: formData.message.trim(),
        timestamp: new Date().toISOString(),
      };

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.status !== 'success') {
        throw new Error(result.message || 'Failed to submit');
      }

      setSubmitted(true);

      setFormData({
        name: '',
        phone: '',
        class: '',
        message: '',
      });
    } catch (error) {
      console.error(error);
      setSubmitError(t('enquiry.submitError'));
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
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-14 md:mb-20 transition-all duration-700 ${isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
            }`}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-0.5 bg-goldenrod" />
            <span className="text-goldenrod font-body text-sm font-semibold uppercase tracking-wider">
              {t('enquiry.sectionTitle')}
            </span>
            <span className="w-8 h-0.5 bg-goldenrod" />
          </div>

          <h2 className="font-display text-4xl md:text-5xl text-white">
            {t('enquiry.heading')}
          </h2>

          <p className="mt-4 text-white/60 font-body text-base md:text-lg max-w-xl mx-auto">
            {t('enquiry.description')}
          </p>
        </div>

        {/* Form */}
        <div
          className={`max-w-3xl mx-auto transition-all duration-700 delay-300 ${isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
            }`}
        >
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 md:p-10 border border-white/10 shadow-2xl">
            {submitted ? (
              <div className="text-center py-10">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />

                <h3 className="font-display text-2xl text-white mb-2">
                  {t('enquiry.success.title')}
                </h3>

                <p className="text-white/60 font-body">
                  {t('enquiry.success.description')}
                </p>

                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-2.5 bg-royal text-white font-body text-sm font-medium rounded-full hover:bg-bright transition-colors"
                >
                  {t('enquiry.success.button')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-white/80 font-body text-sm font-medium mb-2">
                      {t('enquiry.fields.name.label')}
                    </label>

                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />

                      <input
                        type="text"
                        value={formData.name}
                        placeholder={t('enquiry.fields.name.placeholder')}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            name: e.target.value,
                          })
                        }
                        className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
                      />
                    </div>

                    {errors.name && (
                      <p className="mt-1 text-red-400 text-xs">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-white/80 font-body text-sm font-medium mb-2">
                      {t('enquiry.fields.phone.label')}
                    </label>

                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />

                      <input
                        type="tel"
                        value={formData.phone}
                        placeholder={t('enquiry.fields.phone.placeholder')}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            phone: e.target.value,
                          })
                        }
                        className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
                      />
                    </div>

                    {errors.phone && (
                      <p className="mt-1 text-red-400 text-xs">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Class */}
                <div>
                  <label className="block text-white/80 font-body text-sm font-medium mb-2">
                    {t('enquiry.fields.class.label')}
                  </label>

                  <div className="relative">
                    <BookOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />

                    <select
                      value={formData.class}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          class: e.target.value,
                        })
                      }
                      className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white appearance-none focus:outline-none focus:border-goldenrod"
                    >
                      <option value="" className="bg-[#0B1220] text-white">
                        {t('enquiry.fields.class.placeholder')}
                      </option>

                      {classes.map((cls) => (
                        <option
                          key={cls}
                          value={cls}
                          className="bg-[#0B1220] text-white"
                        >
                          {cls}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-white/80 font-body text-sm font-medium mb-2">
                    {t('enquiry.fields.message.label')}
                  </label>

                  <div className="relative">
                    <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-white/30" />

                    <textarea
                      rows={4}
                      value={formData.message}
                      placeholder={t('enquiry.fields.message.placeholder')}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          message: e.target.value,
                        })
                      }
                      className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white resize-none"
                    />
                  </div>
                </div>

                {submitError && (
                  <p className="text-red-400 text-sm">
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-goldenrod text-[#000814] font-bold rounded-full"
                >
                  {submitting ? (
                    <>
                      <span className="w-5 h-5 border-2 border-[#000814]/30 border-t-[#000814] rounded-full animate-spin" />
                      {t('enquiry.submitting')}
                    </>
                  ) : (
                    <>
                      {t('enquiry.submitButton')}
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-center text-white/30 text-xs">
                  {t('enquiry.privacyNote')}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}