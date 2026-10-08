import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  await prisma.contactMessage.deleteMany();
  console.log('✓ Cleared contact_messages');

  await prisma.siteTestimonial.deleteMany();
  console.log('✓ Cleared site_testimonials');

  await prisma.adminUser.deleteMany();
  console.log('✓ Cleared admin_users');

  const admin = await prisma.adminUser.create({
    data: {
      fullName: 'Ahmed Mohamed',
      email: 'ahmedmohamedstoer1234@gmail.com',
      passwordHash: '$2a$10$JrTu4Wv72gU2SWUu8foHiuB4oY2T7YD0o4eM0E5g8R2qt5fU7v1wG',
      role: 'admin',
    },
  });
  console.log(`✓ Created admin user: ${admin.email}`);

  const testimonials = await prisma.siteTestimonial.createMany({
    data: [
      {
        clientName: 'سارة محمد',
        position: 'مديرة تسويق',
        rating: 5,
        message: 'فريق Lunaro فهم احتياجاتنا بعمق ونجح في تحويل الرؤية إلى متجر رقمي قوي. الأداء ممتاز!',
        approved: true,
      },
      {
        clientName: 'عبد الرحمن',
        position: 'مالك شركة',
        rating: 5,
        message: 'خلال أسابيع قليلة حصلنا على تجربة مستخدم احترافية وحل فني يبرز قوة العلامة التجارية في السوق.',
        approved: true,
      },
      {
        clientName: 'فاطمة علي',
        position: 'صاحبة متجر إلكتروني',
        rating: 5,
        message: 'الدعم المستمر والتطويرات المتكررة جعلت المنصة تنمو مع نمو أعمالي. فريق احترافي جداً.',
        approved: true,
      },
    ],
  });
  console.log(`✓ Created ${testimonials.count} testimonials`);

  const contacts = await prisma.contactMessage.createMany({
    data: [
      {
        name: 'عميل تجريبي 1',
        email: 'sample1@lunaro.com',
        phone: '+966500000001',
        budget: '25000',
        scope: 'نحتاج إلى منصة فعالة لتحسين تجربة العملاء، مع لوحة تحكم للإدارة وتقارير شاملة.',
        status: 'new',
      },
      {
        name: 'عميل تجريبي 2',
        email: 'sample2@lunaro.com',
        phone: '+966500000002',
        budget: '15000',
        scope: 'موقع عرض احترافي للشركة مع قسم خدمات ومدونة تقنية.',
        status: 'contacted',
      },
    ],
  });
  console.log(`✓ Created ${contacts.count} sample contacts`);

  console.log('\n✅ Database seeded successfully!');
}

main()
  .catch((error) => {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
