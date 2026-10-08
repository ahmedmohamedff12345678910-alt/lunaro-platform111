import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { buildWelcomeEmail, sendTransactionalMail } from '../lib/mail.js';
import { hash } from 'bcryptjs';

const router = Router();

const registerSchema = z.object({
  fullName: z.string().min(2, 'اسمك الكامل مطلوب'),
  email: z.string().email('البريد الإلكتروني غير صحيح'),
  password: z.string().min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل'),
});

router.post('/register', async (req, res, next) => {
  try {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.errors[0]?.message ?? 'بيانات التسجيل غير صالحة' });
    }

    const { fullName, email, password } = parsed.data;
    const existingUser = await prisma.adminUser.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'هذا البريد مستخدم بالفعل' });
    }

    const passwordHash = await hash(password, 10);
    const user = await prisma.adminUser.create({
      data: {
        fullName,
        email,
        passwordHash,
      },
    });

    await sendTransactionalMail({
      to: email,
      subject: 'مرحباً بك في Lunaro',
      html: buildWelcomeEmail(fullName, email),
    });

    res.status(201).json({
      message: 'تم إنشاء الحساب بنجاح',
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
