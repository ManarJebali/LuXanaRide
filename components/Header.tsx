"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";
import { locales, localeLabels, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export default function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: `/${locale}/scooters`, label: dict.nav.scooters },
    { href: `/${locale}/tricycles`, label: dict.nav.tricycles },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  function pathForLocale(target: Locale) {
    const rest = pathname?.replace(new RegExp(`^/${locale}`), "") || "";
    return `/${target}${rest}`;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-brand-line/70 bg-brand-ink/90 backdrop-blur">
      <div className="mx-auto flex max-w-content items-center justify-between px-6 py-4 lg:px-10">
        <Logo locale={locale} />

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-brand-fog transition-colors hover:text-brand-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangOpen((v) => !v)}
              aria-expanded={langOpen}
              aria-haspopup="true"
              className="inline-flex items-center gap-1.5 border border-brand-line px-3 py-2 text-sm font-medium text-brand-fog hover:text-brand-white"
            >
              {localeLabels[locale]}
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            {langOpen && (
              <ul className="absolute end-0 top-full mt-1 min-w-[140px] border border-brand-line bg-brand-charcoal py-1">
                {locales.map((loc) => (
                  <li key={loc}>
                    <Link
                      href={pathForLocale(loc)}
                      onClick={() => setLangOpen(false)}
                      className={`block px-4 py-2 text-sm ${
                        loc === locale
                          ? "text-brand-red"
                          : "text-brand-fog hover:text-brand-white"
                      }`}
                    >
                      {localeLabels[loc]}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center border border-brand-red bg-brand-red px-5 py-2.5 text-sm font-semibold text-brand-white transition-colors hover:bg-brand-red-dark hover:border-brand-red-dark"
          >
            {dict.nav.requestInfo}
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center border border-brand-line p-2 text-brand-white lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            {open ? (
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" />
            ) : (
              <path d="M2 5h16M2 10h16M2 15h16" stroke="currentColor" strokeWidth="1.5" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-brand-line/70 lg:hidden">
          <ul className="flex flex-col px-6 py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-3 text-base font-medium text-brand-fog hover:text-brand-white"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="flex gap-3 py-3">
              {locales.map((loc) => (
                <Link
                  key={loc}
                  href={pathForLocale(loc)}
                  onClick={() => setOpen(false)}
                  className={`border px-3 py-1.5 text-sm ${
                    loc === locale
                      ? "border-brand-red text-brand-red"
                      : "border-brand-line text-brand-fog"
                  }`}
                >
                  {localeLabels[loc]}
                </Link>
              ))}
            </li>
            <li className="pt-2">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex w-full items-center justify-center border border-brand-red bg-brand-red px-5 py-3 text-sm font-semibold text-brand-white"
                onClick={() => setOpen(false)}
              >
                {dict.nav.requestInfo}
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
