"use client";

import { useTranslations } from "next-intl";

const ROWS = [
  "businessName",
  "representative",
  "address",
  "phone",
  "contact",
  "pricing",
  "additionalCosts",
  "paymentMethods",
  "paymentTiming",
  "serviceStart",
  "cancellation",
  "autoRenewal",
  "cancellationMethod",
  "planChange",
  "environment",
] as const;

export default function CommercialDisclosureContent() {
  const t = useTranslations("CommercialDisclosurePage");

  return (
    <>
      {/* Hero header — white background */}
      <section className="pt-20 pb-16 sm:pt-28 sm:pb-20">
        <div className="section-container max-w-4xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-4">
            {t("title")}
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-4">
            {t("title")}
          </h1>
          <p className="text-lg text-slate-400">
            {t("lastUpdated")}
          </p>
        </div>
      </section>

      {/* Content — light gray background */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="section-container max-w-4xl mx-auto">
          <div className="max-w-3xl mx-auto">
            {/* Table */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="divide-y divide-slate-100">
                {ROWS.map((row) => (
                  <div
                    key={row}
                    className="grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-1 sm:gap-6 px-8 py-6"
                  >
                    <dt className="text-sm font-semibold text-slate-900">
                      {t(`${row}Label`)}
                    </dt>
                    <dd className="text-base text-slate-600 whitespace-pre-line">
                      {t(`${row}Value`)}
                    </dd>
                  </div>
                ))}
              </div>

              {/* Contact note */}
              <div className="px-8 py-5 bg-slate-50 border-t border-slate-100">
                <p className="text-xs text-slate-400">{t("contactNote")}</p>
              </div>
            </div>

            {/* Company */}
            <p className="text-center text-sm text-slate-400 mt-10">
              {t("companyName")}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
