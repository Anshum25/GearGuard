import { redisClient } from "../db/redis.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const cacheMiddleware = (keyPrefix, ttl = 3600) => {
    return asyncHandler(async (req, res, next) => {
        // Use username or user ID as a unique identifier for the cache key
        const identifier = req.params.username || req.user?.id || "default";
        const key = `${keyPrefix}:${identifier}`;

        const cachedData = await redisClient.get(key);

        if (cachedData) {
            return res
                .status(200)
                .json(new ApiResponse(200, JSON.parse(cachedData), "Data fetched from cache"));
        }

        // Attach cache info to req for the controller to use
        req.cacheKey = key;
        req.cacheTTL = ttl;
        next();
    });
};