// app/lib/generateInvoicePdf.ts
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export interface InvoiceData {
  orderId: number;
  userEmail: string;
  serviceName: string;
  qty: number;
  price: number;
  retouching: string | null;
  declutterType: string | null;
  color: string | null;
  detailing: string | null;
  addons: any[];
  total: number;
  createdAt?: Date;
}

export async function generateInvoicePdf(data: InvoiceData): Promise<Uint8Array> {
  console.log("🖨️ [generateInvoicePdf] Called with orderId:", data.orderId);

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4

  const { width, height } = page.getSize();

  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const brandColor = rgb(0.13, 0.38, 0.85);
  const darkGray = rgb(0.2, 0.2, 0.2);
  const midGray = rgb(0.45, 0.45, 0.45);
  const lightGray = rgb(0.9, 0.9, 0.9);
  const white = rgb(1, 1, 1);

  const margin = 50;
  let y = height - margin;

  // Header bar
  page.drawRectangle({ x: 0, y: height - 90, width, height: 90, color: brandColor });
  page.drawText("SnappEditt", { x: margin, y: height - 55, size: 26, font: fontBold, color: white });
  page.drawText("INVOICE", { x: width - margin - 80, y: height - 55, size: 22, font: fontBold, color: white });

  y = height - 110;

  // Invoice meta
  const dateStr = (data.createdAt ?? new Date()).toLocaleDateString("en-IN", {
    day: "2-digit", month: "long", year: "numeric",
  });

  page.drawText(`Invoice #${String(data.orderId).padStart(6, "0")}`, { x: margin, y, size: 11, font: fontBold, color: darkGray });
  page.drawText(`Date: ${dateStr}`, { x: width - margin - 160, y, size: 10, font: fontRegular, color: midGray });
  y -= 16;
  page.drawText(`Billed to: ${data.userEmail}`, { x: margin, y, size: 10, font: fontRegular, color: midGray });
  y -= 30;

  // Table header
  const col = { desc: margin, qty: 310, price: 390, amount: 470 };
  page.drawRectangle({ x: margin, y: y - 6, width: width - margin * 2, height: 22, color: brandColor });

  for (const [label, x] of [["Description", col.desc + 4], ["Qty", col.qty], ["Unit Price", col.price], ["Amount", col.amount]] as [string, number][]) {
    page.drawText(label, { x, y, size: 10, font: fontBold, color: white });
  }
  y -= 24;

  // Row helper
  function drawRow(label: string, qty: number | string, unitPrice: number | string, amount: number | string, shade: boolean) {
    if (shade) {
      page.drawRectangle({ x: margin, y: y - 6, width: width - margin * 2, height: 20, color: lightGray });
    }
    page.drawText(String(label), { x: col.desc + 4, y, size: 10, font: fontRegular, color: darkGray });
    page.drawText(String(qty), { x: col.qty, y, size: 10, font: fontRegular, color: darkGray });
    page.drawText(typeof unitPrice === "number" ? `$${unitPrice.toFixed(2)}` : String(unitPrice), { x: col.price, y, size: 10, font: fontRegular, color: darkGray });
    page.drawText(typeof amount === "number" ? `$${amount.toFixed(2)}` : String(amount), { x: col.amount, y, size: 10, font: fontBold, color: darkGray });
    y -= 24;
  }

  // Main service row
  drawRow(data.serviceName, data.qty, data.price, data.qty * data.price, false);

  // Optional detail rows
  const extras: { label: string; value: string }[] = [];
  if (data.retouching) extras.push({ label: "Retouching", value: data.retouching });
  if (data.declutterType) extras.push({ label: "Declutter Type", value: data.declutterType });
  if (data.color) extras.push({ label: "Color", value: data.color });
  if (data.detailing) extras.push({ label: "Detailing", value: data.detailing });

  let rowShade = true;
  for (const extra of extras) {
    drawRow(`  + ${extra.label}: ${extra.value}`, "-", "-", "-", rowShade);
    rowShade = !rowShade;
  }

  // Addons
  if (Array.isArray(data.addons) && data.addons.length > 0) {
    for (const addon of data.addons) {
      const addonLabel = typeof addon === "string" ? addon : addon.name ?? JSON.stringify(addon);
      const addonQty = typeof addon === "object" && addon.qty ? Number(addon.qty) : 1;
      const addonPrice = typeof addon === "object" && addon.price ? Number(addon.price) : 0;
      drawRow(`  + Addon: ${addonLabel}`, addonQty, addonPrice, addonQty * addonPrice, rowShade);
      rowShade = !rowShade;
    }
  }

  // Divider
  y -= 4;
  page.drawLine({ start: { x: margin, y }, end: { x: width - margin, y }, thickness: 1, color: lightGray });
  y -= 16;

  // Total
  page.drawText("Total", { x: col.price, y, size: 12, font: fontBold, color: darkGray });
  page.drawText(`$${Number(data.total).toFixed(2)}`, { x: col.amount, y, size: 13, font: fontBold, color: brandColor });
  y -= 50;

  // PAID badge
  page.drawRectangle({ x: margin, y: y - 6, width: 80, height: 22, color: rgb(0.13, 0.7, 0.4) });
  page.drawText("PAID", { x: margin + 22, y, size: 11, font: fontBold, color: white });
  y -= 40;

  // Footer
  page.drawLine({ start: { x: margin, y }, end: { x: width - margin, y }, thickness: 0.5, color: lightGray });
  y -= 18;
  page.drawText("Thank you for choosing SnappEditt! For support, contact support@snappeditt.com", {
    x: margin, y, size: 9, font: fontRegular, color: midGray,
  });

  const pdfBytes = await pdfDoc.save();
  console.log("🖨️ [generateInvoicePdf] PDF saved, bytes:", pdfBytes.length);
  return pdfBytes;
}