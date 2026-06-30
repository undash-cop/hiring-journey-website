const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://localhost:8000";

export type ContactFormPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
  website?: string;
};

export type ContactFormResponse = {
  id: number;
  message: string;
};

export async function submitContactForm(payload: ContactFormPayload): Promise<ContactFormResponse> {
  const response = await fetch(`${API_BASE_URL}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let detail = "Failed to send message. Please try again.";
    try {
      const body = (await response.json()) as { detail?: string };
      if (body.detail) detail = body.detail;
    } catch {
      // ignore parse errors
    }
    throw new Error(detail);
  }

  return response.json() as Promise<ContactFormResponse>;
}
