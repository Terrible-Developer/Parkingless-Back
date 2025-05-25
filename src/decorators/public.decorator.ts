import { SetMetadata } from '@nestjs/common';

/**
 * Public decorator to mark a route as public.
 * This is used to skip authentication for specific routes.
 * @returns {Function} A function that sets the metadata for the route.
 */
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata('isPublic', true);
