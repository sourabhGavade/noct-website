import sanityClient from '../client'
import imageUrlBuilder from '@sanity/image-url'

// Sanity URL Builder
const builder = imageUrlBuilder(sanityClient)

/**
 * Cloudinary URL Builder
 * @param {Object} source - The source object
 * @returns {Object} - The chain object
 */
function cloudinaryUrlBuilder(source) {
  const url = source.secure_url || source.url
  const chain = () => chain
  chain.url = () => url
  chain.width = chain
  chain.height = chain
  chain.quality = chain
  chain.fit = chain
  chain.format = chain
  chain.auto = chain
  chain.crop = chain
  return chain
}

/**
 * URL Builder
 * @param {Object} source - The source object
 * @returns {Object} - The chain object
 */
export default function urlFor(source) {
  if (source?._type === 'cloudinary.asset') {
    return cloudinaryUrlBuilder(source)
  }
  return builder.image(source)
}