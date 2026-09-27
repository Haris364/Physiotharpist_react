const API_URL = import.meta.env.VITE_API_URL;
const ASSISTANT_URL = import.meta.env.VITE_ASSISTANT_URL;

const post = async (url, body) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
  return res.json().catch(() => ({}));
};

export async function submitAppointmentRequest(payload) {
  if (API_URL) {
    return post(`${API_URL}/appointments`, payload);
  }
  await new Promise((resolve) => setTimeout(resolve, 1100));
  return { ok: true, reference: `ALT-${String(Date.now()).slice(-6)}` };
}

export async function askAssistant(question) {
  if (ASSISTANT_URL) {
    const data = await post(ASSISTANT_URL, { question });
    return { text: [data.reply ?? 'Thanks — please call the clinic and we will help directly.'], chips: [] };
  }
  return null;
}
