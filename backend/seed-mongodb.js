const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const packageSchema = new mongoose.Schema({
  name: String,
  description: String,
  destination: String,
  price: Number,
  duration: String,
  image: String,
  highlights: [String],
  accommodation: String,
  meals: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Package = mongoose.model('Package', packageSchema);

const samplePackages = [
  {
    name: 'Bangkok City Explorer',
    description: 'Experience the vibrant energy of Bangkok with this 3-day city tour.',
    destination: 'Bangkok',
    price: 599,
    duration: '3 days',
    highlights: ['Grand Palace', 'Floating Markets', 'Wat Pho', 'Chao Phraya Cruise'],
    accommodation: '4-star Hotel',
    meals: 'Breakfast & Dinner included'
  },
  {
    name: 'Phuket Beach Paradise',
    description: 'Relax on pristine beaches and enjoy island activities in Phuket.',
    destination: 'Phuket',
    price: 799,
    duration: '5 days',
    highlights: ['Kata Beach', 'Phi Phi Islands', 'Snorkeling', 'Sunset Cruise'],
    accommodation: 'Beachfront Resort',
    meals: 'All meals included'
  },
  {
    name: 'Chiang Mai Cultural Adventure',
    description: 'Discover the ancient temples and culture of Northern Thailand.',
    destination: 'Chiang Mai',
    price: 649,
    duration: '4 days',
    highlights: ['Doi Suthep Temple', 'Night Bazaar', 'Elephant Sanctuary', 'Local Crafts'],
    accommodation: '3-star Hotel',
    meals: 'Breakfast & Lunch included'
  },
  {
    name: 'Krabi Rock Climbing & Beaches',
    description: 'Adventure sports combined with beautiful beach relaxation.',
    destination: 'Krabi',
    price: 749,
    duration: '4 days',
    highlights: ['Rock Climbing', 'Railay Beach', 'Emerald Pool', 'Four Islands Tour'],
    accommodation: 'Resort with Beach Access',
    meals: 'Breakfast included'
  }
];

async function seedDatabase() {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/thaigger_travel';
    
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing packages
    await Package.deleteMany({});
    console.log('Cleared existing packages');

    // Insert sample packages
    const result = await Package.insertMany(samplePackages);
    console.log(`Successfully inserted ${result.length} packages`);

    console.log('\nSample packages added:');
    result.forEach((pkg, index) => {
      console.log(`${index + 1}. ${pkg.name} - ${pkg.destination} (₹${pkg.price})`);
    });

    await mongoose.connection.close();
    console.log('\nMongoDB connection closed');

  } catch (error) {
    console.error('Seeding error:', error.message);
    process.exit(1);
  }
}

seedDatabase();
