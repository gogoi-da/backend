// Standard packages
import { SetMetadata } from '@nestjs/common';

/**
 * Marks a route as public, bypassing authentication guards.
 *
 * Usage: @Public() on a controller or route handler.
 */
export const Public = () => {
  // Marks a route as public, bypassing authentication guards
  return SetMetadata('isPublic', true);
};
