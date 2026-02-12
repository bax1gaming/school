import express from 'express';
import cors from 'cors';
import dbConnect from './db';

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true
}));
// Fix: Use 'as any' to avoid type mismatch between NextHandleFunction and PathParams/RequestHandler
// This happens due to subtle differences in Request/Response types across middleware packages.
app.use(express.json() as any);

// Base API route for health check
app.get('/api/health', async (req, res) => {
  try {
    await dbConnect();
    res.status(200).json({ status: 'Connected', service: 'Qena Water API' });
  } catch (error) {
    res.status(500).json({ status: 'Error', message: 'Database Connection Failed' });
  }
});

// Example Auth Endpoint
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  // logic here...
  res.status(200).json({ message: "Login logic triggered" });
});

// Vercel requires the app to be exported as a handler
export default app;