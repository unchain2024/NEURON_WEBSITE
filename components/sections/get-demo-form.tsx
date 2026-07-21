"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Check, Loader2, Calendar, Clock, Video } from "lucide-react";
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
  { src: "/demo/icon-workflow.svg", key: "value1" },
  { src: "/demo/icon-secure.svg", key: "value2" },
  { src: "/demo/icon-layer.svg", key: "value3" },
] as const;

// value is locale-independent so submitted lead data matches across ja/en
const COMPANY_SIZE_OPTIONS = [
  { key: "size1to10", value: "1-10" },
  { key: "size11to50", value: "11-50" },
  { key: "size51to200", value: "51-200" },
  { key: "size201to500", value: "201-500" },
  { key: "size500plus", value: "500+" },
] as const;

const inputClass =
  "w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors";

const labelClass = "block text-sm font-medium text-slate-700 mb-1.5";

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
  const [step, setStep] = useState<1 | 2>(1);
  const [error, setError] = useState("");

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
        setStep(2);
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
    <section className="py-16 md:py-20 lg:py-24">
      <div className="section-container">
        <BlurReveal>
          <div className="grid gap-x-12 gap-y-12 lg:grid-cols-2 lg:gap-x-16 lg:grid-rows-[auto_1fr] lg:items-start">
            {/* Header — copy (mobile: first; desktop: top-left) */}
            <MotionDiv
              variants={blurIn}
              className="order-1 lg:col-start-1 lg:row-start-1 lg:pt-2"
            >
              <h1
                className="mb-5 text-[2rem] leading-[1.1] text-slate-900 sm:text-[2.25rem] lg:text-[40px]"
                style={{
                  fontFamily: '"Inter Display", var(--font-inter), sans-serif',
                  fontWeight: 500,
                  letterSpacing: "0",
                }}
              >
                {t.rich("heading", {
                  highlight: (chunks) => <span>{chunks}</span>,
                })}
              </h1>
              <p className="max-w-lg text-base text-text-secondary sm:text-lg">
                {t("subheading")}
              </p>
            </MotionDiv>

            {/* Form card — spans both rows on desktop, right column */}
            <MotionDiv
              variants={fadeInUp}
              className="order-2 lg:col-start-2 lg:row-span-2 lg:row-start-1"
            >
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                {/* Stepper */}
                <Stepper step={step} t={t} />

                {step === 1 ? (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">
                        {t("formTitle")}
                      </h2>
                      <p className="mt-1 text-sm text-text-muted">
                        {t("formSubtitle")}
                      </p>
                    </div>

                    {/* Name row */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="firstName" className={labelClass}>
                          {t("firstName")} <Req />
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
                        <label htmlFor="lastName" className={labelClass}>
                          {t("lastName")} <Req />
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
                      <label htmlFor="email" className={labelClass}>
                        {t("email")} <Req />
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
                      <label htmlFor="company" className={labelClass}>
                        {t("company")} <Req />
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
                      <label htmlFor="jobTitle" className={labelClass}>
                        {t("jobTitle")} <Req />
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
                      <label htmlFor="companySize" className={labelClass}>
                        {t("companySize")} <Req />
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
                        {COMPANY_SIZE_OPTIONS.map((opt) => (
                          <option key={opt.key} value={opt.value}>
                            {t(opt.key)}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className={labelClass}>
                        {t("message")}{" "}
                        <span className="font-normal text-text-muted">
                          {t("messageOptional")}
                        </span>
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
                      <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">
                        {error}
                      </p>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0A0D12] px-6 py-3.5 font-medium text-white transition-colors hover:bg-[#0A0D12]/90 disabled:cursor-not-allowed disabled:opacity-60"
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

                    <p className="text-xs leading-relaxed text-text-muted">
                      {t("disclaimer")}
                    </p>
                  </form>
                ) : (
                  <div className="flex flex-col items-center py-6 text-center">
                    <MotionDiv
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-b from-[#F7F8FA] to-[#EBECEF]"
                    >
                      <Calendar className="h-9 w-9 text-slate-900" strokeWidth={1.75} />
                    </MotionDiv>
                    <h2 className="mb-2 text-2xl font-bold text-slate-900">
                      {t("successTitle")}
                    </h2>
                    <p className="mb-6 max-w-md text-text-secondary">
                      {t("successMessage")}
                    </p>

                    {/* Meta pill */}
                    <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-slate-900" strokeWidth={1.75} />
                        {t("bookingDuration")}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="inline-flex items-center gap-1.5">
                        <Video className="h-4 w-4 text-slate-900" strokeWidth={1.75} />
                        {t("bookingFormat")}
                      </span>
                    </div>

                    {/* CTA */}
                    <a
                      href={bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center rounded-full bg-[#0A0D12] px-6 py-3.5 font-medium text-white transition-colors hover:bg-[#0A0D12]/90"
                    >
                      {t("bookingCTA")}
                    </a>

                    <p className="mt-4 text-xs leading-relaxed text-text-muted">
                      {t("bookingFootnote")}
                    </p>
                  </div>
                )}
              </div>
            </MotionDiv>

            {/* Value props (mobile: last; desktop: bottom-left) */}
            <MotionDiv
              variants={blurIn}
              className="order-3 space-y-8 lg:col-start-1 lg:row-start-2"
            >
              {VALUE_PROPS.map(({ src, key }) => (
                <div key={key} className="flex items-start gap-3">
                  {/* Exact icon extracted from the Figma export (public/demo/*) */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt=""
                    aria-hidden="true"
                    className="-mt-1.5 h-12 w-12 flex-shrink-0"
                  />
                  <div>
                    <h3 className="mb-1 text-lg font-semibold text-slate-900">
                      {t(`${key}Title`)}
                    </h3>
                    <p className="text-sm leading-relaxed text-text-secondary">
                      {t(`${key}Description`)}
                    </p>
                  </div>
                </div>
              ))}
            </MotionDiv>
          </div>
        </BlurReveal>
      </div>
    </section>
  );
}

/* Red required-field asterisk */
function Req() {
  return <span className="text-red-500">*</span>;
}

/* Two-step progress header inside the card */
function Stepper({
  step,
  t,
}: {
  step: 1 | 2;
  t: ReturnType<typeof useTranslations>;
}) {
  return (
    <div className="mb-6 flex items-center justify-center gap-4 border-b border-slate-200 pb-5 sm:gap-8">
      {/* Step 1 is always emphasized: active on step 1, completed on step 2 */}
      <StepItem
        dark
        showCheck={step > 1}
        labelActive
        label={t("stepDetails")}
        index={1}
      />
      {/* Step 2 circle stays light; only its label darkens once active */}
      <StepItem
        dark={false}
        showCheck={false}
        labelActive={step >= 2}
        label={t("stepPickTime")}
        index={2}
      />
    </div>
  );
}

function StepItem({
  dark,
  showCheck,
  labelActive,
  label,
  index,
}: {
  dark: boolean;
  showCheck: boolean;
  labelActive: boolean;
  label: string;
  index: number;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        className={cn(
          "flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-sm font-medium",
          dark
            ? "bg-gradient-to-b from-[#52525B] to-[#0A0D12] text-white shadow-sm"
            : "bg-gradient-to-b from-[#F4F4F5] to-[#D9DADD] text-slate-500"
        )}
      >
        {showCheck ? <Check className="h-4 w-4" /> : index}
      </span>
      <span
        className={cn(
          "text-sm",
          labelActive ? "font-medium text-slate-900" : "text-slate-400"
        )}
      >
        {label}
      </span>
    </div>
  );
}
