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

async function main() {
  console.log('Starting seeding...');

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

  // Create rooftops
  for (const rooftopData of sampleRooftops) {
    const rooftop = await prisma.rooftop.create({
      data: {
        ...rooftopData,
        ownerId: user.id,
      },
    });
    console.log('Created rooftop:', rooftop.title);
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