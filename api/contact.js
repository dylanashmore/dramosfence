import { Resend } from 'resend';

export default async function handler(req, res) {
  if (req.method !== 'POST')
    return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { firstName, lastName, phone, email, message, serviceTitle } = req.body || {};
    if (!firstName || !email || !message)
      return res.status(400).json({ error: 'Missing required fields' });

    const resend = new Resend(process.env.RESEND_API_KEY);
    const fullName = [firstName, lastName].filter(Boolean).join(' ');

    await resend.emails.send({
      from: 'D. Ramos Fence <contact@dramosfence.com>', // ✅ now fully verified
      to: ['dramos@enterprisesllc.net'],                // where you’ll get the message
      reply_to: email,                                  // reply goes straight to the user
      subject: `New Inquiry from ${fullName}`,
      text: `
New message from the Ramos Fencing website:

Name: ${fullName}
Phone: ${phone || '—'}
Email: ${email}
Service: ${serviceTitle || 'N/A'}

Message:
${message}
      `
    });

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Email failed to send' });
  }
}
