const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export default function GoogleMap({ address, title }: { address: string; title: string }) {
  const query = encodeURIComponent(address);
  const src = apiKey
    ? `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${query}`
    : `https://www.google.com/maps?q=${query}&output=embed`;

  return (
    <div className="aspect-[4/3] w-full overflow-hidden border border-brand-line">
      <iframe
        src={src}
        title={title}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
