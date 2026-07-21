"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import {
  CheckCircle2,
  Loader2,
  FileText,
  Calendar,
  ArrowRight,
  Download,
} from "lucide-react";
import {
  MotionDiv,
  BlurReveal,
  fadeInUp,
  blurIn,
} from "@/components/motion-wrapper";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { CASE_STUDIES, CASE_STUDY_SLUGS } from "@/lib/case-studies-data";
import { onepagerPath } from "@/lib/onepagers";

const PRIVACY_URLS: Record<string, string> = {
  ja: "https://www.the-unchain.com/privacy-policy",
  en: "https://www.the-unchain.com/en/privacy-policy",
};

const SLIDE_VISUALS: Record<string, string> = {
  ja: "/download/slide-visual-jp.svg",
  en: "/download/slide-visual-en.svg",
};

// Dedicated Web3Forms key for overview-download leads (get-demo uses its own).
const WEB3FORMS_ACCESS_KEY = "7bd15a3e-4187-4db1-aafe-082286d02696";

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

export default function DownloadOverviewForm() {
  const t = useTranslations("DownloadOverview");
  const industryNames = useTranslations("CaseStudies");
  const locale = useLocale();
  const privacyUrl = PRIVACY_URLS[locale] || PRIVACY_URLS.en;
  const slideVisual = SLIDE_VISUALS[locale] || SLIDE_VISUALS.en;

  const searchParams = useSearchParams();
  const industryParam = searchParams.get("industry") ?? "";
  const initialIndustry = CASE_STUDY_SLUGS.includes(industryParam)
    ? industryParam
    : "";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    jobTitle: "",
    companySize: "",
    industry: initialIndustry,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
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
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Overview Request from ${formData.firstName} ${formData.lastName}`,
          from_name: `${formData.firstName} ${formData.lastName}`,
          locale,
          ...formData,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSuccess(true);
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
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
            {/* Left Column — Copy + Overview card */}
            <MotionDiv variants={blurIn} className="lg:pt-4">
              <h1
                className="mb-5 text-[2rem] leading-[1.1] text-slate-900 sm:text-[2.25rem] lg:text-[40px]"
                style={{
                  fontFamily: '"Inter Display", var(--font-inter), sans-serif',
                  fontWeight: 500,
                  letterSpacing: "0",
                }}
              >
                {t("heading")}
              </h1>
              <p className="text-base sm:text-lg text-text-secondary mb-8 max-w-lg">
                {t("subheading")}
              </p>

              {/* Product Overview card */}
              <div className="max-w-md">
                <div className="overflow-hidden rounded-xl shadow-xl shadow-slate-900/10 ring-1 ring-slate-900/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={slideVisual}
                    alt={t("cardTitle")}
                    className="block h-auto w-full"
                  />
                </div>
                <div className="mt-3 flex items-center gap-2 text-sm text-text-muted">
                  <FileText className="h-4 w-4" />
                  <span>{t("cardMeta")}</span>
                </div>
              </div>
            </MotionDiv>

            {/* Right Column — Form */}
            <MotionDiv variants={fadeInUp}>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                {success ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <MotionDiv
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                      }}
                    >
                      <CheckCircle2 className="mb-6 h-16 w-16 text-primary" />
                    </MotionDiv>
                    <h2 className="mb-2 text-2xl font-bold text-slate-900">
                      {t("successTitle")}
                    </h2>
                    <p className="mb-8 max-w-sm text-text-secondary">
                      {t("successMessage")}
                    </p>
                    <div className="mb-8 flex flex-col gap-3 sm:flex-row">
                      <a
                        href={onepagerPath(formData.industry, "en")}
                        download
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-white transition-colors hover:bg-primary-600"
                      >
                        <Download className="h-4 w-4" />
                        {t("downloadCtaEn")}
                      </a>
                      <a
                        href={onepagerPath(formData.industry, "ja")}
                        download
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-white transition-colors hover:bg-primary-600"
                      >
                        <Download className="h-4 w-4" />
                        {t("downloadCtaJa")}
                      </a>
                    </div>
                    <p className="mb-4 text-sm text-text-muted">
                      {t("successCtaNote")}
                    </p>
                    <Link
                      href="/get-demo"
                      className="group inline-flex items-center gap-2 rounded-lg border border-slate-200 px-6 py-3 font-medium text-slate-700 transition-colors hover:border-primary hover:text-primary"
                    >
                      <Calendar className="h-4 w-4" />
                      {t("successCta")}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <h2
                      className="text-[24px] leading-[1.1] text-slate-900"
                      style={{
                        fontFamily:
                          '"Inter Display", var(--font-inter), sans-serif',
                        fontWeight: 500,
                        letterSpacing: "0",
                      }}
                    >
                      {t("formTitle")}
                    </h2>
                    <p className="!mt-1 text-sm text-text-muted">
                      {t("formSubtitle")}
                    </p>

                    {/* Name row */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="firstName" className={labelClass}>
                          {t("firstName")} <span className="text-red-500">*</span>
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
                          {t("lastName")} <span className="text-red-500">*</span>
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
                        {t("email")} <span className="text-red-500">*</span>
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
                        {t("company")} <span className="text-red-500">*</span>
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
                        {t("jobTitle")} <span className="text-red-500">*</span>
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
                        {t("companySize")} <span className="text-red-500">*</span>
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

                    {/* Industry */}
                    <div>
                      <label htmlFor="industry" className={labelClass}>
                        {t("industry")} <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="industry"
                        name="industry"
                        required
                        value={formData.industry}
                        onChange={handleChange}
                        className={cn(
                          inputClass,
                          !formData.industry && "text-slate-400"
                        )}
                      >
                        <option value="" disabled>
                          {t("industryPlaceholder")}
                        </option>
                        {CASE_STUDIES.map((cs) => (
                          <option key={cs.slug} value={cs.slug}>
                            {industryNames(`${cs.i18nKey}.name`)}
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
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0A0D12] px-6 py-3.5 font-medium text-white transition-colors hover:bg-[#0A0D12]/90 disabled:cursor-not-allowed disabled:opacity-60"
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
                      {t("disclaimerBefore")}
                      <a
                        href={privacyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-slate-700 underline underline-offset-2 hover:text-primary"
                      >
                        {t("disclaimerLink")}
                      </a>
                      {t("disclaimerAfter")}
                    </p>
                  </form>
                )}
              </div>
            </MotionDiv>
          </div>
        </BlurReveal>
      </div>
    </section>
  );
}
