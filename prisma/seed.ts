import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const sampleRooftops = [
  {
    title: 'Sunset Terrace',
    description: 'Beautiful rooftop with amazing sunset views over the city skyline. Perfect for romantic dinners and small gatherings.',
    city: 'New York',
    capacity: 20,
    pricePerHour: 100,
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      'https://images.unsplash.com/photo-1561501878-aabd62634533',
    ],
  },
  {
    title: 'Sky Garden',
    description: 'Lush green space with panoramic views. Ideal for cocktail parties and corporate events.',
    city: 'Los Angeles',
    capacity: 50,
    pricePerHour: 200,
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
      'https://images.unsplash.com/photo-1533044309907-0fa3413da946',
    ],
  },
  {
    title: 'Urban Oasis',
    description: 'Modern rooftop pool and lounge area. Perfect for summer parties and photoshoots.',
    city: 'Miami',
    capacity: 30,
    pricePerHour: 150,
    images: [
      'https://images.unsplash.com/photo-1565538810643-b5bdb714032a',
      'https://images.unsplash.com/photo-1563911302283-d2bc129e7570',
    ],
  },
  {
    title: 'Downtown View',
    description: 'Sophisticated space with city views. Great for business meetings and networking events.',
    city: 'Chicago',
    capacity: 25,
    pricePerHour: 120,
    images: [
      'https://images.unsplash.com/photo-1519642918688-7e43b19245d8',
      'https://images.unsplash.com/photo-1533044309907-0fa3413da946',
    ],
  },
  {
    title: 'Harbor Deck',
    description: 'Waterfront rooftop with harbor views. Perfect for weddings and special occasions.',
    city: 'San Francisco',
    capacity: 40,
    pricePerHour: 180,
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85',
      'https://images.unsplash.com/photo-1516571748831-5d81767b044d',
    ],
  },
];

// Sample reviews data
const sampleReviews = [
  {
    rating: 5,
    comment: "Absolutely stunning views! The space was perfect for our anniversary dinner. Highly recommend for special occasions.",
  },
  {
    rating: 4,
    comment: "Great location and amenities. Staff was very helpful. Only giving 4 stars because it was a bit windy that day.",
  },
  {
    rating: 5,
    comment: "Perfect venue for our corporate event. Everyone was impressed with the views and setup.",
  },
  {
    rating: 4,
    comment: "Beautiful space with excellent facilities. The sunset view was breathtaking.",
  },
  {
    rating: 3,
    comment: "Nice place but a bit overpriced for what you get. The staff was friendly though.",
  },
];

/**
 * Clean the database by deleting all records from all tables
 * in the correct order to respect foreign key constraints
 */
async function cleanDatabase() {
  console.log('Cleaning database...');
  
  // Delete in reverse order of dependencies
  await prisma.review.deleteMany({});
  console.log('Deleted all reviews');
  
  await prisma.booking.deleteMany({});
  console.log('Deleted all bookings');
  
  await prisma.bookmark.deleteMany({});
  console.log('Deleted all bookmarks');
  
  await prisma.rooftop.deleteMany({});
  console.log('Deleted all rooftops');
  
  await prisma.user.deleteMany({});
  console.log('Deleted all users');
  
  // Delete reference tables if needed
  await prisma.rooftopActivity.deleteMany({});
  await prisma.rentalType.deleteMany({});
  await prisma.accessibilityInfra.deleteMany({});
  await prisma.rooftopFeature.deleteMany({});
  await prisma.rooftopFacility.deleteMany({});
  await prisma.rooftopViewType.deleteMany({});
  await prisma.rooftopGuideline.deleteMany({});
  await prisma.cancellationPolicy.deleteMany({});
  console.log('Deleted all reference data');
  
  console.log('Database cleaned successfully');
}

async function main() {
  console.log('Starting seeding...');
  
  // Clean the database before seeding
  await cleanDatabase();

  // Create test user
  const hashedPassword = await bcrypt.hash('password123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
      password: hashedPassword,
    },
  });

  console.log('Created test user:', user.email);

  // Create additional users for reviews
  const reviewers = [];
  for (let i = 1; i <= 3; i++) {
    const reviewer = await prisma.user.upsert({
      where: { email: `reviewer${i}@example.com` },
      update: {},
      create: {
        email: `reviewer${i}@example.com`,
        name: `Reviewer ${i}`,
        password: hashedPassword,
      },
    });
    reviewers.push(reviewer);
    console.log('Created reviewer:', reviewer.email);
  }

  // Create rooftops
  for (const rooftopData of sampleRooftops) {
    const rooftop = await prisma.rooftop.create({
      data: {
        ...rooftopData,
        ownerId: user.id,
      },
    });
    console.log('Created rooftop:', rooftop.title);
    
    // Add reviews for each rooftop
    for (let i = 0; i < Math.min(3, sampleReviews.length); i++) {
      const reviewData = sampleReviews[i];
      const reviewer = reviewers[i % reviewers.length];
      
      const review = await prisma.review.create({
        data: {
          ...reviewData,
          userId: reviewer.id,
          rooftopId: rooftop.id,
        },
      });
      console.log(`Created review for ${rooftop.title} by ${reviewer.name}: ${review.rating} stars`);
    }
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 