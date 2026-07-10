import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const firstName = formData.get("first_name")?.toString();
    const lastName = formData.get("last_name")?.toString();
    const email = formData.get("email")?.toString();
    const phone = formData.get("phone")?.toString();
    const service = formData.get("service")?.toString();
    const message = formData.get("message")?.toString();

    if (!firstName || !lastName || !email || !phone || !service) {
      return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
    }

    // In a production app, save the request to the database or send it to an email/CRM.
    console.log("Free trial request:", {
      firstName,
      lastName,
      email,
      phone,
      service,
      message,
      files: Array.from(formData.keys()).filter((key) => key.startsWith("file_")),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to submit free trial request." }, { status: 500 });
  }
}
