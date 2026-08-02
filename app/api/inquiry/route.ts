import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const {
    name,
    email,
    phone,
    model,
    requestType,
    preferredContact,
    message,
    company,
  } = body ?? {};

  // Honeypot field — bots fill every field, real users never see it.
  if (company) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  const { RESEND_API_KEY, INQUIRY_TO_EMAIL, INQUIRY_FROM_EMAIL } = process.env;

  if (!RESEND_API_KEY || !INQUIRY_TO_EMAIL) {
    console.error(
      "Inquiry received but Resend is not configured. Set RESEND_API_KEY and INQUIRY_TO_EMAIL in .env.local.",
      { name, email, phone, model, requestType, preferredContact, message }
    );
    return NextResponse.json(
      { error: "Email service is not configured yet." },
      { status: 503 }
    );
  }

  try {
    const resend = new Resend(RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: `LuXana Ride — Site Web <${INQUIRY_FROM_EMAIL || "onboarding@resend.dev"}>`,
      to: INQUIRY_TO_EMAIL,
      replyTo: email,
      subject: `[${requestType || "Inquiry"}] ${model || "General"} — ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || "—"}`,
        `Model of interest: ${model || "—"}`,
        `Request type: ${requestType || "—"}`,
        `Preferred contact method: ${preferredContact || "—"}`,
        "",
        "Message:",
        message || "—",
      ].join("\n"),
      html: `
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone || "—")}</p>
        <p><strong>Model of interest:</strong> ${escapeHtml(model || "—")}</p>
        <p><strong>Request type:</strong> ${escapeHtml(requestType || "—")}</p>
        <p><strong>Preferred contact method:</strong> ${escapeHtml(preferredContact || "—")}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message || "—").replace(/\n/g, "<br/>")}</p>
      `,
    });

    if (error) {
      console.error("Resend failed to send inquiry email", error);
      return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to send inquiry email", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}

function escapeHtml(value: string) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
