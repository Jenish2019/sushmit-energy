const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
const path = require('path');

if (process.loadEnvFile) {
  try {
    process.loadEnvFile(path.join(__dirname, '..', '.env.local'));
  } catch (e) {
    console.error('Could not load .env.local:', e.message);
    process.exit(1);
  }
}

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'sushmit_energy';

if (!uri) {
  console.error('MONGODB_URI not set in .env.local');
  process.exit(1);
}

const email = (process.argv[2] || 'admin@gmail.com').toLowerCase();
const password = process.argv[3] || 'admin123';
const name = process.argv[4] || 'Super Admin';

(async () => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const passwordHash = await bcrypt.hash(password, 10);

    const existing = await db.collection('admins').findOne({ email });
    if (existing) {
      await db.collection('admins').updateOne(
        { _id: existing._id },
        { $set: { email, passwordHash, name, role: 'superadmin' } }
      );
      console.log(`Updated admin ${email}`);
    } else {
      await db.collection('admins').insertOne({
        name,
        email,
        passwordHash,
        role: 'superadmin',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      console.log(`Created admin ${email}`);
    }
    console.log('Admin login:');
    console.log(`  email:    ${email}`);
    console.log(`  password: ${password}`);
  } catch (e) {
    console.error('Failed:', e.message);
    process.exit(1);
  } finally {
    await client.close();
  }
})();
