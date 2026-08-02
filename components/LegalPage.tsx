import type { Dictionary } from "@/lib/i18n/dictionaries";

type LegalContent = Dictionary["legal"]["privacy"];

export default function LegalPage({
  content,
  email,
  phone,
}: {
  content: LegalContent;
  email: string;
  phone: string;
}) {
  const contactNote = content.contactNote
    .replace("{email}", email)
    .replace("{phone}", phone);

  return (
    <section className="mx-auto max-w-content px-6 py-16 lg:px-10">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight text-brand-white sm:text-5xl">
          {content.title}
        </h1>
        <p className="mt-3 text-sm text-brand-mist">{content.lastUpdated}</p>
        <p className="mt-6 leading-relaxed text-brand-mist">{content.intro}</p>

        <div className="mt-10 space-y-8">
          {content.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-lg font-semibold text-brand-white">{section.heading}</h2>
              <p className="mt-2 leading-relaxed text-brand-mist">{section.body}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 border-t border-brand-line/70 pt-6 text-sm leading-relaxed text-brand-mist">
          {contactNote}
        </p>
      </div>
    </section>
  );
}
