// app/lib/mailer.ts
import nodemailer from "nodemailer";
import { generateInvoicePdf } from "./Generateinvoicepdf"; // ✅ same folder now

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendInvoiceEmail(
  userEmail: string,
  orderId: number,
  serviceName: string,
  qty: number,
  price: number,
  retouching: string | null,
  declutterType: string | null,
  color: string | null,
  detailing: string | null,
  addons: any[],
  total: number
) {
  // ── 1. Generate PDF in memory ──────────────────────────────
  console.log("📄 [mailer] Generating invoice PDF...");
  const pdfBytes = await generateInvoicePdf({
    orderId,
    userEmail,
    serviceName,
    qty,
    price,
    retouching,
    declutterType,
    color,
    detailing,
    addons,
    total,
    createdAt: new Date(),
  });

  console.log("📄 [mailer] PDF byte length:", pdfBytes?.length ?? "NULL/UNDEFINED");

  const pdfBuffer = Buffer.from(pdfBytes);
  console.log("📄 [mailer] Buffer length:", pdfBuffer.length);

  // ── 2. Build HTML body ────────────────────────────────────
  const addonsList =
    addons.length > 0
      ? `<ul>${addons
          .map((a) => `<li>${typeof a === "string" ? a : a.name ?? JSON.stringify(a)}</li>`)
          .join("")}</ul>`
      : "<p>None</p>";

  const htmlBody = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto">
      <div style="background:#2261D9;padding:24px 32px;border-radius:8px 8px 0 0">
        <h1 style="color:#fff;margin:0;font-size:24px">SnappEditt</h1>
        <p style="color:#c9daff;margin:4px 0 0">Order Confirmation</p>
      </div>
      <div style="background:#f9f9f9;padding:32px;border-radius:0 0 8px 8px">
        <p style="font-size:16px;color:#222">Hi there,</p>
        <p style="color:#444">
          Your order <strong>#${String(orderId).padStart(6, "0")}</strong> has been placed
          successfully and payment confirmed. Please find your invoice attached as a PDF.
        </p>
        <table style="width:100%;border-collapse:collapse;margin-top:24px">
          <thead>
            <tr style="background:#2261D9;color:#fff">
              <th style="padding:10px 14px;text-align:left">Detail</th>
              <th style="padding:10px 14px;text-align:right">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr style="background:#fff">
              <td style="padding:10px 14px;color:#333">Service</td>
              <td style="padding:10px 14px;text-align:right;color:#333">${serviceName}</td>
            </tr>
            <tr style="background:#f4f4f4">
              <td style="padding:10px 14px;color:#333">Quantity</td>
              <td style="padding:10px 14px;text-align:right;color:#333">${qty}</td>
            </tr>
            <tr style="background:#fff">
              <td style="padding:10px 14px;color:#333">Unit Price</td>
              <td style="padding:10px 14px;text-align:right;color:#333">$${Number(price).toFixed(2)}</td>
            </tr>
            ${retouching ? `<tr style="background:#f4f4f4"><td style="padding:10px 14px;color:#333">Retouching</td><td style="padding:10px 14px;text-align:right;color:#333">${retouching}</td></tr>` : ""}
            ${declutterType ? `<tr style="background:#fff"><td style="padding:10px 14px;color:#333">Declutter Type</td><td style="padding:10px 14px;text-align:right;color:#333">${declutterType}</td></tr>` : ""}
            ${color ? `<tr style="background:#f4f4f4"><td style="padding:10px 14px;color:#333">Color</td><td style="padding:10px 14px;text-align:right;color:#333">${color}</td></tr>` : ""}
            ${detailing ? `<tr style="background:#fff"><td style="padding:10px 14px;color:#333">Detailing</td><td style="padding:10px 14px;text-align:right;color:#333">${detailing}</td></tr>` : ""}
            <tr style="background:#2261D9">
              <td style="padding:12px 14px;color:#fff;font-weight:bold">Total</td>
              <td style="padding:12px 14px;text-align:right;color:#fff;font-weight:bold;font-size:16px">
                $${Number(total).toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
        <div style="margin-top:20px">
          <strong style="color:#333">Add-ons:</strong>
          <div style="color:#555">${addonsList}</div>
        </div>
        <p style="margin-top:32px;color:#888;font-size:12px">
          If you have any questions, contact us at
          <a href="mailto:support@snappeditt.com" style="color:#2261D9">support@snappeditt.com</a>
        </p>
      </div>
    </div>
  `;

  // ── 3. Send with PDF attachment ───────────────────────────
  const attachment = {
    filename: `invoice-${orderId}.pdf`,
    content: pdfBuffer,
    contentType: "application/pdf",
  };

  console.log("📎 [mailer] Attachment info:", {
    filename: attachment.filename,
    contentLength: attachment.content.length,
  });

  await transporter.sendMail({
    from: `"SnappEditt" <${process.env.SMTP_USER}>`,
    to: userEmail,
    subject: `Your SnappEditt Invoice #${String(orderId).padStart(6, "0")}`,
    html: htmlBody,
    attachments: [attachment],
  });

  console.log("✅ [mailer] Email sent with PDF attachment to:", userEmail);
}