import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.contactMessage.deleteMany();
  await prisma.siteTestimonial.deleteMany();
  await prisma.adminUser.deleteMany();

  await prisma.adminUser.createMany({
    data: [
      {
        fullName: 'Ahmed Mohamed',
        email: 'ahmedmohamedstoer1234@gmail.com',
        passwordHash: '$2a$10$JrTu4Wv72gU2SWUu8foHiuB4oY2T7YD0o4eM0E5g8R2qt5fU7v1wG',
        role: 'admin',
      },
    ],
  });

  await prisma.siteTestimonial.createMany({
    data: [
      {
        clientName: 'سارة محمد',
        position: 'مديرة تسويق',
        rating: 5,
        message: 'الفريق فهم احتياجاتنا بعمق ونجح في تحويل الرؤية إلى متجر رقمي قوي.',
        approved: true,
      },
      {
        clientName: 'عبد الرحمن',
        position: 'مالك شركة',
        rating: 5,
        message: 'مستوى التنفيذ كبير جداً، والنتائج كانت أسرع من المتوقع.',
        approved: true,
      },
    ],
  });

  await prisma.contactMessage.createMany({
    data: [
      {
        name: 'عميل تجريبي',
        email: 'sample@lunaro.com',
        phone: '+966500000000',
        budget: '10000',
        scope: 'نحتاج إلى منصة فعالة لتحسين تجربة العملاء، مع لوحة تحكم للإدارة.',
        status: 'new',
      },
    ],
  });

  console.log('Seed data inserted successfully');
}

main()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
