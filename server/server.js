import { app } from './app.js';
import { env } from './shared/config/env.js';
import { connectDatabase } from './shared/database/connect.js';

const start = async () => {
  try {
    await connectDatabase();
    app.listen(env.port, () => {
      console.log(`Server running on http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

start();
