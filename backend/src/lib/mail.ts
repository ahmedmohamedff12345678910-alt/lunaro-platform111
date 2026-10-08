import { env } from '../config/env.js';

export async function sendTransactionalMail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  if (!env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY is not configured. Skipping email delivery.');
    return { ok: false, skipped: true };
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.MAIL_FROM,
      to: [to],
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const payload = await response.text();
    throw new Error(`Email send failed: ${payload}`);
  }

  return { ok: true, response: await response.json() };
}

export function buildWelcomeEmail(name: string, email: string) {
  return `
    <div style="font-family:Arial,sans-serif;background:#0b132b;color:#f8fafc;padding:32px;">
      <div style="max-width:640px;margin:0 auto;background:linear-gradient(135deg,#0b132b,#101c32);border:1px solid rgba(94,234,212,0.25);border-radius:24px;overflow:hidden;">
        <div style="padding:28px 28px 12px;text-align:center;">
          <div style="width:70px;height:70px;display:inline-flex;align-items:center;justify-content:center;border-radius:50%;background:linear-gradient(135deg,#5eead4,#3bc9db);color:#061118;font-size:30px;box-shadow:0 0 30px rgba(94,234,212,0.6);">✓</div>
        </div>
        <div style="padding:12px 32px 8px; text-align:center;">
          <div style="font-size:28px;font-weight:800;letter-spacing:0.04em;">Lunaro</div>
          <div style="color:#9ad9ec;font-size:13px;letter-spacing:0.2em;text-transform:uppercase;">Official Certified Transmission</div>
        </div>
        <div style="padding:22px 32px 8px;">
          <h2 style="margin:0 0 12px; font-size:28px; color:#f8fafc;">مرحباً ${name}</h2>
          <p style="margin:0; line-height:1.8; color:#dceaf8;">تم تسجيلك بنجاح في نظام لونارو. فريقنا جاهز للبدء في بناء تجربة رقمية احترافية مصممة خصيصاً لأهدافك.</p>
        </div>
        <div style="padding:18px 32px 32px;">
          <div style="background:rgba(94,234,212,0.08);border:1px solid rgba(94,234,212,0.2);border-radius:16px;padding:16px 18px; color:#d5f7fe;">
            <strong>البريد:</strong> ${email}<br />
            <strong>الدعم:</strong> 24/7
          </div>
        </div>
        <div style="padding:20px 32px 28px;border-top:1px solid rgba(148,163,184,0.18);font-size:12px;color:#a9b7c6;text-align:center;">
          Official Certified Transmission - Lunaro Core
        </div>
      </div>
    </div>
  `;
}

export function buildContactReceiptEmail(name: string, email: string, budget: string, scope: string) {
  return `
    <div style="font-family:Arial,sans-serif;background:#0b132b;color:#f8fafc;padding:32px;">
      <div style="max-width:640px;margin:0 auto;background:linear-gradient(135deg,#0a1020,#101b31);border:1px solid rgba(94,234,212,0.25);border-radius:24px;overflow:hidden;">
        <div style="padding:28px 28px 12px;text-align:center;">
          <div style="width:70px;height:70px;display:inline-flex;align-items:center;justify-content:center;border-radius:50%;background:linear-gradient(135deg,#5eead4,#3bc9db);color:#061118;font-size:30px;box-shadow:0 0 30px rgba(94,234,212,0.6);">✓</div>
        </div>
        <div style="padding:18px 32px 8px; text-align:center;">
          <div style="font-size:28px;font-weight:800;letter-spacing:0.04em;">Lunaro</div>
          <div style="color:#9ad9ec;font-size:13px;letter-spacing:0.2em;text-transform:uppercase;">Official Certified Transmission</div>
        </div>
        <div style="padding:20px 32px 6px;">
          <h2 style="margin:0 0 12px; font-size:28px; color:#f8fafc;">تم استلام طلبك بنجاح!</h2>
          <p style="margin:0; line-height:1.8; color:#dceaf8;">فريق لونارو الهندسي يراجع تفاصيل مشروعك حالياً وسنقوم بالرد عليك رسمياً خلال 24 ساعة فقط.</p>
        </div>
        <div style="padding:18px 32px 32px;">
          <div style="background:rgba(94,234,212,0.08);border:1px solid rgba(94,234,212,0.2);border-radius:16px;padding:18px; color:#d5f7fe; line-height:1.9;">
            <strong>الاسم:</strong> ${name}<br />
            <strong>البريد:</strong> ${email}<br />
            <strong>الميزانية:</strong> ${budget || 'غير محددة'}<br />
            <strong>نطاق المشروع:</strong> ${scope || 'غير محدد'}
          </div>
        </div>
        <div style="padding:20px 32px 28px;border-top:1px solid rgba(148,163,184,0.18);font-size:12px;color:#a9b7c6;text-align:center;">
          Official Certified Transmission - Lunaro Core
        </div>
      </div>
    </div>
  `;
}
