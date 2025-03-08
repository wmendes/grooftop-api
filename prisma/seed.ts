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
const samplePrivacyPoliciesMetadata = [
  {
    name: 'Commercial'
  },
  {
    name: 'Private'
  },
  {
    name: 'Public space'
  }
]

const sampleActivitiesMetadata = [
  {
    name: 'Visitation'
  },
  {
    name: 'Events'
  },
  {
    name: 'Custom event'
  },
  {
    name: 'Photoshoot or a film set'
  },
  {
    name: 'Birthday party'
  },
  {
    name: 'Music'
  },
  {
    name: 'Event'
  },
  {
    name: 'Theater'
  },
  {
    name: 'Pop-up store'
  },
  {
    name: 'Conference'
  },
  {
    name: 'Religious event'
  }
]

const sampleRentalTypesMetadata = [
  {
    id: 'asbdoasihdoasdoasdas',
    name: 'Free',
    valueField: false,
  },
  {
    id: 'asbdoasihdoasdoasdasas',
    name: 'Hourly',
    valueField: true,
  },
  {
    id: 'asadsadasasasdasdasdas',
    name: 'By period',
    valueField: true,
  }
]

const sampleFeaturesMetadata = [
  {
    id: 'bsijbaiudhoasda',
    name: 'Max number of guests',
    valueField: true,
    category: 'guests',
  },
  {
    id: 'bsijbaiudhosadasasdas',
    name: 'Has parking',
    category: 'parking',
    valueField: false
  },
  {
    id: 'bsijbaiudhosadasasdasasdas',
    name: 'Nearby parking',
    category: 'parking',
    valueField: false
  },
  {
    id: 'bsij341asdasasdas',
    name: 'Max number of spots',
    category: 'parking',
    valueField: true,
  },
  {
    id: 'nasidoabodasdboai',
    name: 'Bar',
    category: 'service',
    valueField: false
  },
  {
    id: 'nasidoabdasd34odasdboai',
    name: 'Restaurant',
    category: 'service',
    valueField: false
  },
  {
    id: 'nasidoabsadasodasdboai',
    name: 'Coffee shop',
    category: 'service',
    valueField: false
  },
  {
    id: 'nasidoabsadasodasdboai',
    name: 'Pool',
    category: 'facilities',
    valueField: false
  },
  {
    id: 'nasidoabsadasodasdboai',
    name: 'Shower',
    category: 'facilities',
    valueField: false
  },
  {
    id: 'nasidoabsadasodasdboai',
    name: 'Jacuzzi',
    category: 'facilities',
    valueField: false
  },
  {
    id: 'nasidoabsadasodasdboai',
    name: 'Air conditioning',
    category: 'facilities',
    valueField: false
  },
  {
    id: 'nasidoabsadasodasdboai',
    name: 'Skyline',
    category: 'view_types',
    valueField: false
  },
  {
    id: 'nasidoabsadasodasdboai',
    name: 'Lake',
    category: 'view_types',
    valueField: false
  },
  {
    id: 'nasidoabsadasodasdboai',
    name: 'River',
    category: 'view_types',
    valueField: false
  },
  {
    id: 'nasidoabsadasodasdboai',
    name: 'Beach',
    category: 'view_types',
    valueField: false
  },
]

const sampleAccessibilityInfraMetadata = [
  {
    id: 'aoishdaiodhasyiuasbd',
    name: 'Wheelchair access'
  },
  {
    id: 'aoishdaiodhasyiuasbd',
    name: 'Accessible restroom'
  },
  {
    id: 'isahdas89daisudasd',
    name: 'Wide aisles for easy movement'
  },
  {
    id: 'isahdas89sdasdsadaisudasd',
    name: 'Braille signs'
  },
  {
    id: 'isahdas89daisudasd',
    name: 'Visual/sound indicators'
  },
  {
    id: 'asodisahodhasdaasda',
    name: 'Reserved seating'
  }
]

const sampleGuidelinesMetadata = [
  {
    id: 'saodihasodasd',
    guideline: 'Alcohol allowed'
  },
  {
    id: 'saodihasodasdsaasd',
    guideline: 'No outside alcohol'
  },
  {
    id: 'saodihasodasdsaasd',
    guideline: 'No smoking indoors'
  },
  {
    id: 'saodihasodasdsaas123123',
    guideline: 'Live events allowed'
  },
  {
    id: 'saodihasodasdsaas123123',
    guideline: 'No loud noise'
  }
]

const sampleCancellationPoliciesMetadata = [
  {
    id: 'aoidjasoidjsaodaso',
    policyName: 'No refund'
  },
  {
    id: 'aoidjasoidjsaodaso',
    policyName: 'Refundable'
  }
]

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

  // Create metadata
  for (const privacyPolicy of samplePrivacyPoliciesMetadata) {
    const metadata = await prisma.privacyPolicy.create({
      data: privacyPolicy,
    });

    console.log('Created privacy policy:', metadata.name);
  }

  for (const activity of sampleActivitiesMetadata) {
    const metadata = await prisma.rooftopActivity.create({
      data: activity,
    });

    console.log('Created activity:', metadata.name);
  }

  for (const rentalType of sampleRentalTypesMetadata) {
    const metadata = await prisma.rentalType.create({
      data: rentalType,
    });

    console.log('Created rental type:', metadata.name);
  }

  for (const feature of sampleFeaturesMetadata) {
    const metadata = await prisma.rooftopFeature.create({
      data: feature,
    });

    console.log('Created feature:', metadata.name);
  }

  for (const accessibilityInfra of sampleAccessibilityInfraMetadata) {
    const metadata = await prisma.accessibilityInfra.create({
      data: accessibilityInfra,
    });

    console.log('Created accessibility infra:', metadata.name);
  }

  for (const cancellationPolicy of sampleCancellationPoliciesMetadata) {
    const metadata = await prisma.cancellationPolicy.create({
      data: cancellationPolicy,
    });

    console.log('Created cancellation policy:', metadata.policyName);
  }

  for (const guideline of sampleGuidelinesMetadata) {
    const metadata = await prisma.rooftopGuideline.create({
      data: guideline,
    });

    console.log('Created guideline:', metadata.guideline);
    
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