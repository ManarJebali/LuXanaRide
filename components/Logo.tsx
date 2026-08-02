import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";

export default function Logo({ locale, className = "" }: { locale: Locale; className?: string }) {
  return (
    <Link
      href={`/${locale}`}
      className={`inline-flex items-center gap-2.5 ${className}`}
      aria-label="LuXana Ride"
    >
      <span className="inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-md">
        <Image
          src="/images/logo.svg"
          alt=""
          width={842}
          height={526}
          className="h-full w-full object-cover"
        />
      </span>
      <span className="text-lg font-semibold tracking-tight text-brand-white">
        LuXana<span className="font-light text-brand-mist"> Ride</span>
      </span>
    </Link>
  );
}
