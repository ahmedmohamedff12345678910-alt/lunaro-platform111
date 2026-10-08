import app from './app.js';
import { env } from './config/env.js';
import { prisma } from './lib/prisma.js';

const PORT = env.PORT;

app.listen(PORT, async () => {
  try {
    await prisma.$connect();
    console.log(`✓ Database connected`);
  } catch (error) {
    console.error('✗ Database connection failed:', error);
    process.exit(1);
  }

  console.log(`✓ Backend listening on http://localhost:${PORT}`);
  console.log(`✓ Environment: ${env.NODE_ENV}`);
  console.log(`✓ Frontend URL: ${env.PUBLIC_SITE_URL}`);
});

process.on('SIGINT', async () => {
  console.log('\n✓ Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});
