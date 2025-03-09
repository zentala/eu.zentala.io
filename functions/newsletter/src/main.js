import { Client, Databases, ID, Mail, Users } from 'node-appwrite';

// 📌 Konfiguracja debugowania - sterowanie przez zmienną APPWRITE_DEBUG_MODE
const DEBUG_MODE = process.env.APPWRITE_DEBUG_MODE === 'true';

// 📌 Maskowanie e-maili
function maskEmail(email) {
  const [name, domain] = email.split('@');
  return `${name.charAt(0)}***@${domain.replace(/\w/g, '*')}`;
}

// 📌 Maskowanie tokenów
function maskToken(token) {
  return token.length > 5 ? `${token.substring(0, 3)}*******` : '***';
}

// 📌 Maskowanie zmiennych środowiskowych (Zawsze maskowane!)
function maskEnv(env) {
  return env ? env.replace(/./g, '*') : '***';
}

// 📌 Główna funkcja Appwrite
export default async ({ req, res, log, error }) => {
  log("🛠 Newsletter Function Triggered");

  if (DEBUG_MODE) {
    log("🛠 DEBUG MODE: Enabled");
    log(`📌 Request Path: ${req.path}`);
    log(`📌 Request Method: ${req.method}`);
  }

  log(`📌 Masked Env Vars:`);
  log({
    APPWRITE_PROJECT_ID: maskEnv(process.env.APPWRITE_PROJECT_ID),
    APPWRITE_DATABASE_ID: maskEnv(process.env.APPWRITE_DATABASE_ID),
    APPWRITE_COLLECTION_ID: maskEnv(process.env.APPWRITE_COLLECTION_ID),
  });

  if (req.method === 'POST' && req.path === '/subscribe') {
    return await handleSubscription(req, res, log, error);
  }

  if (req.method === 'GET' && req.path === '/confirm') {
    return await handleConfirmation(req, res, log, error);
  }

  if (req.method === 'POST' && req.path === '/unsubscribe') {
    return await handleUnsubscribe(req, res, log, error);
  }

  if (req.path === "/ping") {
    return res.text("Pong");
  }

  return res.json({
    motto: "Build like a team of hundreds_",
    learn: "https://appwrite.io/docs",
    connect: "https://appwrite.io/discord",
    getInspired: "https://builtwith.appwrite.io",
  });
};

// 📌 Obsługa subskrypcji
async function handleSubscription(req, res, log, error) {
  try {
    const { email } = JSON.parse(req.body);
    if (!email) return res.json({ error: 'Email is required' }, 400);

    const client = new Client()
      .setEndpoint(process.env.APPWRITE_API_ENDPOINT)
      .setProject(process.env.APPWRITE_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY);

    const db = new Databases(client);
    const mail = new Mail(client);

    const existingUsers = await db.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_COLLECTION_ID,
      [`equal("email", "${email}")`]
    );

    if (existingUsers.total > 0) {
      log(`📩 Email ${maskEmail(email)} already subscribed`);
      return res.json({ message: 'Already subscribed!' });
    }

    const token = ID.unique();
    await db.createDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_COLLECTION_ID,
      ID.unique(),
      { email, confirmed: false, unsubscribed: false, token, createdAt: new Date().toISOString() }
    );

    await mail.createEmail(
      process.env.SENDER_EMAIL || 'newsletter@yourdomain.com',
      email,
      'Confirm your subscription',
      `Click to confirm: ${process.env.WEBSITE_URL}/confirm?token=${token}`
    );

    log(`✅ New subscription request from ${maskEmail(email)} with token ${maskToken(token)}`);
    return res.json({ message: 'Check your inbox!' });

  } catch (err) {
    error(`❌ Subscription error: ${err.message}`);
    return res.json({ error: 'Subscription failed' }, 500);
  }
}

// 📌 Obsługa potwierdzenia subskrypcji + autorespondery
async function handleConfirmation(req, res, log, error) {
  try {
    const token = req.query.token;
    if (!token) return res.json({ error: 'Token is required' }, 400);

    const client = new Client()
      .setEndpoint(process.env.APPWRITE_API_ENDPOINT)
      .setProject(process.env.APPWRITE_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY);

    const db = new Databases(client);
    const mail = new Mail(client);

    const existingUser = await db.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_COLLECTION_ID,
      [`equal("token", "${token}")`]
    );

    if (existingUser.total === 0) {
      return res.json({ error: 'Invalid token' }, 400);
    }

    const user = existingUser.documents[0];

    await db.updateDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_COLLECTION_ID,
      user.$id,
      { confirmed: true }
    );

    log(`✅ Subscription confirmed for ${maskEmail(user.email)}`);

    // 📌 Autoresponder 1: Wesprzyj nas
    await mail.createEmail(
      process.env.SENDER_EMAIL || 'newsletter@yourdomain.com',
      user.email,
      'Dziękujemy za subskrypcję!',
      `Dziękujemy za dołączenie do naszego newslettera! Jeśli chcesz nas wesprzeć, możesz to zrobić tutaj: https://wsparcie.example.com`
    );

    // 📌 Planowanie autorespondera 2 na 7 dni
    await db.createDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_COLLECTION_ID,
      ID.unique(),
      { type: 'autoresponder', email: user.email, sendAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() }
    );

    return res.json({ message: 'Subscription confirmed!' });

  } catch (err) {
    error(`❌ Confirmation error: ${err.message}`);
    return res.json({ error: 'Confirmation failed' }, 500);
  }
}

// 📌 Obsługa wypisania (unsubscribe)
async function handleUnsubscribe(req, res, log, error) {
  try {
    const { email } = JSON.parse(req.body);
    if (!email) return res.json({ error: 'Email is required' }, 400);

    const client = new Client()
      .setEndpoint(process.env.APPWRITE_API_ENDPOINT)
      .setProject(process.env.APPWRITE_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY);

    const db = new Databases(client);

    const existingUser = await db.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_COLLECTION_ID,
      [`equal("email", "${email}")`]
    );

    if (existingUser.total === 0) {
      return res.json({ error: 'User not found' }, 400);
    }

    const user = existingUser.documents[0];

    await db.updateDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_COLLECTION_ID,
      user.$id,
      { unsubscribed: true }
    );

    log(`🔕 User ${maskEmail(user.email)} unsubscribed`);
    return res.json({ message: 'Unsubscribed successfully!' });

  } catch (err) {
    error(`❌ Unsubscribe error: ${err.message}`);
    return res.json({ error: 'Unsubscribe failed' }, 500);
  }
}
