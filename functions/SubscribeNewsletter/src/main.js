import { Client, Databases, ID, Mail } from 'node-appwrite';

// This Appwrite function handles newsletter subscription
export default async ({ req, res, log, error }) => {
  // Only process POST requests with JSON body
  if (req.method !== 'POST') {
    return res.json({ error: 'Method not allowed' }, 405);
  }

  try {
    const { email } = JSON.parse(req.body);
    
    if (!email) {
      return res.json({ error: 'Email is required' }, 400);
    }

    const client = new Client()
      .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
      .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY);

    const db = new Databases(client);
    const mail = new Mail(client);

    // Check if email already exists
    const existingUsers = await db.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_COLLECTION_ID,
      [
        `equal("email", "${email}")`
      ]
    );

    if (existingUsers.total > 0) {
      log(`Email ${email} already subscribed`);
      return res.json({ message: 'Already subscribed!' });
    }

    // Create new subscriber with token
    const token = ID.unique();
    await db.createDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_COLLECTION_ID,
      ID.unique(),
      { 
        email, 
        confirmed: false, 
        token,
        createdAt: new Date().toISOString()
      }
    );

    // Send confirmation email
    await mail.createEmail(
      process.env.SENDER_EMAIL || 'newsletter@yourdomain.com',
      email,
      'Confirm your subscription',
      `Click to confirm: ${process.env.WEBSITE_URL}/confirm?token=${token}`
    );

    log(`New subscription request from ${email}`);
    return res.json({ message: 'Check your inbox!' });

  } catch (err) {
    error(`Subscription error: ${err.message}`);
    return res.json({ error: 'Subscription failed' }, 500);
  }
};
