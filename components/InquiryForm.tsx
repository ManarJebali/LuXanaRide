"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type Status = "idle" | "sending" | "success" | "error";

export default function InquiryForm({
  dict,
  vehicleOptions,
  defaultModel,
  defaultRequestType,
}: {
  dict: Dictionary;
  vehicleOptions: string[];
  defaultModel?: string;
  defaultRequestType?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const f = dict.inquiryForm;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    if ((formData.get("company") as string)?.length) {
      setStatus("success");
      form.reset();
      return;
    }

    setStatus("sending");
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("request failed");

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label={f.fullName} htmlFor="name" required>
          <input id="name" name="name" type="text" required autoComplete="name" className="form-input" />
        </Field>
        <Field label={f.email} htmlFor="email" required>
          <input id="email" name="email" type="email" required autoComplete="email" className="form-input" />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label={f.phone} htmlFor="phone">
          <input id="phone" name="phone" type="tel" autoComplete="tel" className="form-input" />
        </Field>
        <Field label={f.modelOfInterest} htmlFor="model">
          <select id="model" name="model" defaultValue={defaultModel ?? f.generalInquiry} className="form-input">
            <option value={f.generalInquiry}>{f.generalInquiry}</option>
            {vehicleOptions.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label={f.requestType} htmlFor="requestType">
          <select
            id="requestType"
            name="requestType"
            defaultValue={defaultRequestType ?? f.requestTypes.quote}
            className="form-input"
          >
            <option value={f.requestTypes.quote}>{f.requestTypes.quote}</option>
            <option value={f.requestTypes.testRide}>{f.requestTypes.testRide}</option>
            <option value={f.requestTypes.warranty}>{f.requestTypes.warranty}</option>
            <option value={f.requestTypes.general}>{f.requestTypes.general}</option>
          </select>
        </Field>

        <fieldset>
          <legend className="mb-2 text-xs font-medium uppercase tracking-[0.08em] text-brand-mist">
            {f.preferredContact}
          </legend>
          <div className="flex gap-6 pt-1">
            <label className="flex items-center gap-2 text-sm text-brand-white">
              <input type="radio" name="preferredContact" value={f.contactEmail} defaultChecked />
              {f.contactEmail}
            </label>
            <label className="flex items-center gap-2 text-sm text-brand-white">
              <input type="radio" name="preferredContact" value={f.contactPhone} />
              {f.contactPhone}
            </label>
          </div>
        </fieldset>
      </div>

      <Field label={f.message} htmlFor="message">
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder={f.messagePlaceholder}
          className="form-input"
        />
      </Field>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex w-full items-center justify-center border border-brand-red bg-brand-red px-7 py-3.5 text-sm font-semibold text-brand-white transition-colors hover:bg-brand-red-dark hover:border-brand-red-dark disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? f.sending : f.submit}
      </button>

      <div role="status" aria-live="polite">
        {status === "success" && (
          <p className="border border-brand-red/40 bg-brand-red-light/5 px-4 py-3 text-sm text-brand-red">
            {f.success}
          </p>
        )}
        {status === "error" && (
          <p className="border border-red-500/40 bg-red-500/5 px-4 py-3 text-sm text-red-400">
            {f.error}
          </p>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-xs font-medium uppercase tracking-[0.08em] text-brand-mist">
        {label}
        {required && <span className="text-brand-red"> *</span>}
      </label>
      {children}
    </div>
  );
}
