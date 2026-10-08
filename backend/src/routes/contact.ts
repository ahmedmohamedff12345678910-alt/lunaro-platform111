import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { sendTransactionalMail, buildWelcomeEmail, buildContactReceiptEmail } from '../lib/mail.js';

const router = Router();

const contactSchema = z.object({
  name: z.string().min(2, 'الاسم قصير جدا'),
  email: z.string().email('البريد الإلكتروني غير صحيح'),
  phone: z.string().min(8, 'رقم الهاتف غير صحيح'),
  budget: z.string().optional().or(z.literal('')),
  scope: z.string().min(10, 'يرجى كتابة تفاصيل المشروع'),
});

router.post('/', async (req, res, next) => {
  try {
    const parsed = contactSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: parsed.error.errors[0]?.message ?? 'بيانات النموذج غير صالحة',
      });
    }

    const { name, email, phone, budget, scope } = parsed.data;

    await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone,
        budget: budget ?? '',
        scope,
      },
    });

    const adminEmail = process.env.CONTACT_TO_EMAIL ?? 'ahmedmohamedstoer1234@gmail.com';
    const html = buildContactReceiptEmail(name, email, budget ?? 'غير محددة', scope);

    await sendTransactionalMail({
      to: adminEmail,
      subject: 'تم استلام طلب جديد من Lunaro',
      html,
    });

    res.status(201).json({
      message: 'تم استلام طلبك بنجاح! فريق لونارو الهندسي يراجع تفاصيل مشروعك حاليا وسنقوم بالرد عليك رسميا خلال 24 ساعة فقط.',
      success: true,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/', async (_req, res, next) => {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
    res.json({ data: messages });
  } catch (error) {
    next(error);
  }
});

export default router;
