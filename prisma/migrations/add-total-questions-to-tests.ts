import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting migration: Adding totalQuestions to all existing tests...');

  try {
    // Get all tests
    const allTests = await prisma.test.findMany({
      select: { id: true },
    });
    console.log(`Found ${allTests.length} total tests in the database`);

    if (allTests.length === 0) {
      console.log('No tests found. Migration completed.');
      return;
    }

    // Update all tests to set totalQuestions to 0
    // Using individual updates to ensure reliability with MongoDB
    let updatedCount = 0;
    for (const test of allTests) {
      await prisma.test.update({
        where: { id: test.id },
        data: { totalQuestions: 0 },
      });
      updatedCount++;
      
      // Log progress every 100 tests
      if (updatedCount % 100 === 0) {
        console.log(`Updated ${updatedCount}/${allTests.length} tests...`);
      }
    }

    console.log(`Successfully updated ${updatedCount} tests with totalQuestions = 0`);
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Error during migration:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('Migration failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
