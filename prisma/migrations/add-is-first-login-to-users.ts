import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting migration: Adding isFirstLogin field to all existing users...');

  try {
    // Get all users
    const allUsers = await prisma.user.findMany({
      select: { id: true },
    });
    console.log(`Found ${allUsers.length} total users in the database`);

    if (allUsers.length === 0) {
      console.log('No users found. Migration completed.');
      return;
    }

    // Update all users to set isFirstLogin to true
    // Using individual updates to ensure reliability with MongoDB
    let updatedCount = 0;
    for (const user of allUsers) {
      await prisma.user.update({
        where: { id: user.id },
        data: { isFirstLogin: true },
      });
      updatedCount++;
      
      // Log progress every 100 users
      if (updatedCount % 100 === 0) {
        console.log(`Updated ${updatedCount}/${allUsers.length} users...`);
      }
    }

    console.log(`Successfully updated ${updatedCount} users with isFirstLogin = true`);
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

