import imageUrlBuilder from '@sanity/image-url'
import client from '../client'

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}

// Helper function for responsive images
export function urlForWithOptions(source, options = {}) {
  let imageBuilder = builder.image(source)
  
  if (options.width) imageBuilder = imageBuilder.width(options.width)
  if (options.height) imageBuilder = imageBuilder.height(options.height)
  if (options.quality) imageBuilder = imageBuilder.quality(options.quality)
  if (options.fit) imageBuilder = imageBuilder.fit(options.fit)
  if (options.format) imageBuilder = imageBuilder.format(options.format)
  
  return imageBuilder
}

// Common image sizes for the website
export const imageSizes = {
  thumbnail: { width: 150, height: 150, quality: 80 },
  small: { width: 400, height: 300, quality: 85 },
  medium: { width: 800, height: 600, quality: 90 },
  large: { width: 1200, height: 900, quality: 95 },
  hero: { width: 1920, height: 1080, quality: 95 }
}
