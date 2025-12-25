import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting migration: Adding language field to all existing questions and test questions...');

  try {
    // Update all Question records
    console.log('Updating Question records...');
    const allQuestions = await prisma.question.findMany({
      select: { id: true },
    });
    console.log(`Found ${allQuestions.length} total questions in the database`);

    if (allQuestions.length > 0) {
      let updatedCount = 0;
      for (const question of allQuestions) {
        await prisma.question.update({
          where: { id: question.id },
          data: { language: 'en' },
        });
        updatedCount++;
        
        // Log progress every 100 questions
        if (updatedCount % 100 === 0) {
          console.log(`Updated ${updatedCount}/${allQuestions.length} questions...`);
        }
      }

      console.log(`Successfully updated ${updatedCount} questions with language = 'en'`);
    } else {
      console.log('No questions found.');
    }

    // Update all TestQuestion records
    console.log('Updating TestQuestion records...');
    const allTestQuestions = await prisma.testQuestion.findMany({
      select: { id: true },
    });
    console.log(`Found ${allTestQuestions.length} total test questions in the database`);

    if (allTestQuestions.length > 0) {
      let updatedCount = 0;
      for (const testQuestion of allTestQuestions) {
        await prisma.testQuestion.update({
          where: { id: testQuestion.id },
          data: { language: 'en' },
        });
        updatedCount++;
        
        // Log progress every 100 test questions
        if (updatedCount % 100 === 0) {
          console.log(`Updated ${updatedCount}/${allTestQuestions.length} test questions...`);
        }
      }

      console.log(`Successfully updated ${updatedCount} test questions with language = 'en'`);
    } else {
      console.log('No test questions found.');
    }

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

