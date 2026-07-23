import Redis from "ioredis";
import { env } from "./env";
import { logger } from "../utils/logger";

class MemoryCacheFallback {
  private cache = new Map<string, string>();

  async get(key: string): Promise<string | null> {
    return this.cache.get(key) || null;
  }

  async set(key: string, value: string, mode?: string, duration?: number): Promise<"OK"> {
    this.cache.set(key, value);
    if (mode === "EX" && duration) {
      setTimeout(() => this.cache.delete(key), duration * 1000);
    }
    return "OK";
  }

  async del(key: string): Promise<number> {
    return this.cache.delete(key) ? 1 : 0;
  }
}

let redisClient: Redis | MemoryCacheFallback;

try {
  const redis = new Redis(env.REDIS_URL, {
    lazyConnect: true,
    maxRetriesPerRequest: 1
  });

  redis.connect().then(() => {
    logger.info("Connected to Redis Cache Server");
  }).catch((err) => {
    logger.warn("Redis connection unavailable, switching to internal memory fallback", err?.message);
    redisClient = new MemoryCacheFallback();
  });

  redisClient = redis;
} catch (e) {
  logger.warn("Redis initialization failed, fallback activated");
  redisClient = new MemoryCacheFallback();
}

export const redis = redisClient;
