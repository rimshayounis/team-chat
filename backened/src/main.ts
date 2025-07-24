;


import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Enable CORS so frontend (like Expo app) can access backend
  app.enableCors();

  // ✅ Listen on all interfaces, so your phone on same WiFi can access it
  const port = process.env.PORT ?? 3000;
  await app.listen(port, '0.0.0.0');

  console.log(`🚀 Server running on http://localhost:${port}`);
}
bootstrap();
