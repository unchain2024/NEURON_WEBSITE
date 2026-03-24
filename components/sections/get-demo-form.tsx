"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import {
  Zap,
  Shield,
  BarChart3,
  CheckCircle2,
  Loader2,
  X,
  Calendar,
  ArrowRight,
  Clock,
  Video,
} from "lucide-react";
import {
  MotionDiv,
  BlurReveal,
  fadeInUp,
  blurIn,
} from "@/components/motion-wrapper";
import { cn } from "@/lib/utils";

const BOOKING_URLS: Record<string, string> = {
  ja: "https://timerex.net/s/tharada_4c59/03bbdfd0",
  en: "https://calendar.app.google/B8uDN6oxopCFkpD2A",
};

const VALUE_PROPS = [
  { icon: Zap, key: "value1" },
  { icon: Shield, key: "value2" },
  { icon: BarChart3, key: "value3" },
] as const;

const COMPANY_SIZE_KEYS = [
  "size1to10",
  "size11to50",
  "size51to200",
  "size201to500",
  "size500plus",
] as const;

const inputClass =
  "w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors";

export default function GetDemoForm() {
  const t = useTranslations("GetDemo");
  const locale = useLocale();
  const bookingUrl = BOOKING_URLS[locale] || BOOKING_URLS.en;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    jobTitle: "",
    companySize: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [error, setError] = useState("");

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setShowBookingModal(false);
  }, []);

  useEffect(() => {
    if (showBookingModal) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [showBookingModal, handleKeyDown]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "496c179e-e42c-4de5-b705-95ca27e2d158",
          subject: `Demo Request from ${formData.firstName} ${formData.lastName}`,
          from_name: `${formData.firstName} ${formData.lastName}`,
          ...formData,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setShowBookingModal(true);
      } else {
        setError(t("errorGeneric"));
      }
    } catch {
      setError(t("errorGeneric"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="section-padding">
      <div className="section-container">
        <BlurReveal>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Column — Copy */}
            <MotionDiv variants={blurIn} className="pt-4">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-6">
                {t.rich("heading", {
                  highlight: (chunks) => (
                    <span className="gradient-text">{chunks}</span>
                  ),
                })}
              </h1>
              <p className="text-lg text-text-secondary mb-10 max-w-lg">
                {t("subheading")}
              </p>

              {/* Value propositions */}
              <div className="space-y-6 mb-12">
                {VALUE_PROPS.map(({ icon: Icon, key }) => (
                  <div key={key} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">
                        {t(`${key}Title`)}
                      </h3>
                      <p className="text-sm text-text-secondary">
                        {t(`${key}Description`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </MotionDiv>

            {/* Right Column — Form */}
            <MotionDiv variants={fadeInUp}>
              <div className="glass-card p-8 rounded-2xl">
                {success ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <MotionDiv
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                      }}
                    >
                      <CheckCircle2 className="h-16 w-16 text-primary mb-6" />
                    </MotionDiv>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">
                      {t("successTitle")}
                    </h2>
                    <p className="text-text-secondary mb-6">
                      {t("successMessage")}
                    </p>
                    <button
                      onClick={() => setShowBookingModal(true)}
                      className="inline-flex items-center gap-2 bg-primary hover:bg-primary-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                    >
                      <Calendar className="h-4 w-4" />
                      {t("bookingModalTitle")}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <h2 className="text-xl font-bold text-slate-900 mb-1">
                      {t("formTitle")}
                    </h2>
                    <p className="text-sm text-text-muted mb-6">
                      {t("formSubtitle")}
                    </p>

                    {/* Name row */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="firstName"
                          className="block text-sm font-medium text-slate-700 mb-1.5"
                        >
                          {t("firstName")} *
                        </label>
                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder={t("firstNamePlaceholder")}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="lastName"
                          className="block text-sm font-medium text-slate-700 mb-1.5"
                        >
                          {t("lastName")} *
                        </label>
                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder={t("lastNamePlaceholder")}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-slate-700 mb-1.5"
                      >
                        {t("email")} *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t("emailPlaceholder")}
                        className={inputClass}
                      />
                    </div>

                    {/* Company */}
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium text-slate-700 mb-1.5"
                      >
                        {t("company")} *
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        required
                        value={formData.company}
                        onChange={handleChange}
                        placeholder={t("companyPlaceholder")}
                        className={inputClass}
                      />
                    </div>

                    {/* Job Title */}
                    <div>
                      <label
                        htmlFor="jobTitle"
                        className="block text-sm font-medium text-slate-700 mb-1.5"
                      >
                        {t("jobTitle")} *
                      </label>
                      <input
                        id="jobTitle"
                        name="jobTitle"
                        type="text"
                        required
                        value={formData.jobTitle}
                        onChange={handleChange}
                        placeholder={t("jobTitlePlaceholder")}
                        className={inputClass}
                      />
                    </div>

                    {/* Company Size */}
                    <div>
                      <label
                        htmlFor="companySize"
                        className="block text-sm font-medium text-slate-700 mb-1.5"
                      >
                        {t("companySize")} *
                      </label>
                      <select
                        id="companySize"
                        name="companySize"
                        required
                        value={formData.companySize}
                        onChange={handleChange}
                        className={cn(
                          inputClass,
                          !formData.companySize && "text-slate-400"
                        )}
                      >
                        <option value="" disabled>
                          {t("companySizePlaceholder")}
                        </option>
                        {COMPANY_SIZE_KEYS.map((key) => (
                          <option key={key} value={t(key)}>
                            {t(key)}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-slate-700 mb-1.5"
                      >
                        {t("message")}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={t("messagePlaceholder")}
                        className={cn(inputClass, "resize-none")}
                      />
                    </div>

                    {/* Error */}
                    {error && (
                      <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-2">
                        {error}
                      </p>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-primary hover:bg-primary-600 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          {t("submitting")}
                        </>
                      ) : (
                        t("submit")
                      )}
                    </button>

                    <p className="text-xs text-text-muted text-center">
                      {t("disclaimer")}
                    </p>
                  </form>
                )}
              </div>
            </MotionDiv>
          </div>
        </BlurReveal>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={t("bookingModalTitle")}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowBookingModal(false)}
          />

          {/* Modal */}
          <MotionDiv
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative z-10 w-full max-w-lg"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Close button */}
              <button
                onClick={() => setShowBookingModal(false)}
                className="absolute top-4 right-4 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-white/80 hover:bg-white shadow-sm transition-colors text-slate-500 hover:text-slate-700"
                aria-label={t("bookingClose")}
              >
                <X className="h-4 w-4" />
              </button>

              {/* Green gradient header */}
              <div className="relative bg-gradient-to-br from-primary via-emerald-500 to-teal-500 px-8 pt-10 pb-12 text-white text-center overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10" />
                <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white/10" />

                <MotionDiv
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.1,
                  }}
                  className="relative"
                >
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-5 backdrop-blur-sm">
                    <CheckCircle2 className="h-8 w-8 text-white" />
                  </div>
                </MotionDiv>
                <h2 className="text-2xl font-bold mb-2 relative">
                  {t("successTitle")}
                </h2>
                <p className="text-emerald-100 text-sm relative max-w-xs mx-auto">
                  {t("successMessage")}
                </p>
              </div>

              {/* Body */}
              <div className="px-8 py-8">
                <h3 className="text-lg font-semibold text-slate-900 mb-1 text-center">
                  {t("bookingModalTitle")}
                </h3>
                <p className="text-sm text-text-muted text-center mb-6">
                  {t("bookingModalSubtitle")}
                </p>

                {/* Info cards */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="flex items-center gap-2.5 bg-slate-50 rounded-xl px-4 py-3">
                    <Clock className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-slate-700">{t("bookingDuration")}</span>
                  </div>
                  <div className="flex items-center gap-2.5 bg-slate-50 rounded-xl px-4 py-3">
                    <Video className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-slate-700">{t("bookingFormat")}</span>
                  </div>
                </div>

                {/* CTA Button */}
                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-3 w-full bg-primary hover:bg-primary-600 text-white font-semibold py-4 px-6 rounded-xl transition-all hover:shadow-lg hover:shadow-primary/25"
                >
                  <Calendar className="h-5 w-5" />
                  {t("bookingCTA")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>

                <p className="text-xs text-text-muted text-center mt-4">
                  {t("bookingFootnote")}
                </p>
              </div>
            </div>
          </MotionDiv>
        </div>
      )}
    </section>
  );
}
