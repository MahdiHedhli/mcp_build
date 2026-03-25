require('dotenv').config();
const CarrdAutomation = require('./carrd-automation');

async function main() {
  const email = process.env.CARRD_EMAIL;
  const password = process.env.CARRD_PASSWORD;

  if (!email || !password) {
    console.error('Error: CARRD_EMAIL and CARRD_PASSWORD environment variables required');
    process.exit(1);
  }

  const carrd = new CarrdAutomation(email, password);

  try {
    await carrd.init();
    await carrd.login();

    const command = process.argv[2];

    if (command === 'create') {
      const siteName = process.argv[3] || 'My Test Site';
      const siteUrl = await carrd.createSite(siteName);
      console.log('Site URL:', siteUrl);
    }

    await carrd.close();
  } catch (error) {
    console.error('Error:', error.message);
    await carrd.close();
    process.exit(1);
  }
}

main();
