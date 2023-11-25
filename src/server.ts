/* eslint-disable @typescript-eslint/no-explicit-any */
import app from './app';
import config from './app/config';
import mongoose from 'mongoose';

async function connect() {
  try {
    await mongoose.connect(config.connection_string as string);
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  } catch (err: any) {
    console.log(err.message);
  }
}

connect();
