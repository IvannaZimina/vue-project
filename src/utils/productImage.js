import defaultProductImage from '@/assets/img/default_image.jpg';

const IMAGE_EXTENSION_REGEX = /\.(jpe?g|png|webp|gif|bmp|svg|avif)(\?.*)?(#.*)?$/i;

export const normalizeProductImage = (imageUrl) => {
  const normalized = (imageUrl || '').trim();

  if (!normalized || !IMAGE_EXTENSION_REGEX.test(normalized)) {
    return defaultProductImage;
  }

  return normalized;
};

export const DEFAULT_PRODUCT_IMAGE = defaultProductImage;
