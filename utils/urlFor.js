import sanityClient from '../client'
import imageUrlBuilder from '@sanity/image-url'

// Sanity URL Builder
const builder = imageUrlBuilder(sanityClient)

/**
 * Cloudinary URL Builder
 * @param {Object} source - The source object
 * @returns {Object} - The chain object
 */
function emptyUrlBuilder() {
  const chain = () => chain
  chain.url = () => null
  chain.width = chain
  chain.height = chain
  chain.quality = chain
  chain.fit = chain
  chain.format = chain
  chain.auto = chain
  chain.crop = chain
  return chain
}

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

function canBuildImageUrl(source) {
  if (!source) return false
  if (typeof source === 'string') return true
  if (source._type === 'cloudinary.asset') {
    return Boolean(source.secure_url || source.url)
  }
  if (source.asset) return Boolean(source.asset._ref || source.asset.url)
  if (source._ref || source.url || source.secure_url) return true
  return false
}

/**
 * URL Builder
 * @param {Object} source - The source object
 * @returns {Object} - The chain object
 */
export default function urlFor(source) {
  if (!canBuildImageUrl(source)) {
    return emptyUrlBuilder()
  }
  if (source?._type === 'cloudinary.asset') {
    return cloudinaryUrlBuilder(source)
  }
  return builder.image(source)
}