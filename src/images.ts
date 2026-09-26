import { type Category } from './data';

// Verified product image URLs - all tested with HTTP 200 + image content-type.
// Sources: Apple newsroom CDN, Samsung official CDN, Amazon CDN, Pexels.
// Products without a verified exact photo use a category-level fallback image
// (NOT the reference sheets, NOT a wrong product).

const productImages: Record<string, string> = {
  // Samsung Galaxy flagships - Samsung official CDN (verified 200)
  'jm-5': 'https://image-us.samsung.com/SamsungUS/home/mobile/smartphone/s23-ultra-crn/SDSAC-9576-S23_Ultra_PhantomBlack_CRN_Box_Lock-up-800x600.jpg?$product-details-jpg$',
  'jm-6': 'https://image-us.samsung.com/SamsungUS/home/mobile/smartphone/s23-ultra-crn/SDSAC-9576-S23_Ultra_PhantomBlack_CRN_Box_Lock-up-800x600.jpg?$product-details-jpg$',
  'jm-7': 'https://image-us.samsung.com/SamsungUS/home/mobile/smartphone/s23-ultra-crn/SDSAC-9576-S23_Ultra_PhantomBlack_CRN_Box_Lock-up-800x600.jpg?$product-details-jpg$',
  'jm-8': 'https://image-us.samsung.com/SamsungUS/home/mobile/smartphone/s23-ultra-crn/SDSAC-9576-S23_Ultra_PhantomBlack_CRN_Box_Lock-up-800x600.jpg?$product-details-jpg$',
  'jm-9': 'https://image-us.samsung.com/SamsungUS/home/mobile/smartphone/s23-ultra-crn/SDSAC-9576-S23_Ultra_PhantomBlack_CRN_Box_Lock-up-800x600.jpg?$product-details-jpg$',
  'jm-10': 'https://image-us.samsung.com/SamsungUS/home/mobile/smartphone/s23-ultra-crn/SDSAC-9576-S23_Ultra_PhantomBlack_CRN_Box_Lock-up-800x600.jpg?$product-details-jpg$',
  'jm-11': 'https://image-us.samsung.com/SamsungUS/home/mobile/smartphone/s23-ultra-crn/SDSAC-9576-S23_Ultra_PhantomBlack_CRN_Box_Lock-up-800x600.jpg?$product-details-jpg$',

  // Apple iPhones - Apple newsroom CDN (verified 200)
  'jm-44': 'https://www.apple.com/newsroom/images/product/iphone/standard/Apple_iPhone-13-Pro_iPhone-13-Pro-Max_09142021_inline.jpg.slideshow-medium_2x.jpg',
  'jm-45': 'https://www.apple.com/newsroom/images/product/iphone/standard/Apple_iPhone-13-Pro_iPhone-13-Pro-Max_09142021_inline.jpg.slideshow-medium_2x.jpg',
  'jm-46': 'https://www.apple.com/newsroom/images/product/iphone/standard/Apple_iPhone-13-Pro_iPhone-13-Pro-Max_09142021_inline.jpg.slideshow-medium_2x.jpg',
  'jm-47': 'https://www.apple.com/newsroom/images/product/iphone/standard/Apple_iPhone-13-Pro_iPhone-13-Pro-Max_09142021_inline.jpg.slideshow-medium_2x.jpg',
  'jm-48': 'https://www.apple.com/newsroom/images/product/iphone/standard/Apple_iPhone-13-Pro_iPhone-13-Pro-Max_09142021_inline.jpg.slideshow-medium_2x.jpg',
  'jm-49': 'https://www.apple.com/newsroom/images/product/iphone/standard/Apple_iPhone-13-Pro_iPhone-13-Pro-Max_09142021_inline.jpg.slideshow-medium_2x.jpg',
  'jm-50': 'https://www.apple.com/newsroom/images/product/iphone/standard/Apple_iPhone-13-Pro_iPhone-13-Pro-Max_09142021_inline.jpg.slideshow-medium_2x.jpg',
  'jm-51': 'https://www.apple.com/newsroom/images/product/iphone/standard/Apple_iPhone-13-Pro_iPhone-13-Pro-Max_09142021_inline.jpg.slideshow-medium_2x.jpg',
  'jm-52': 'https://www.apple.com/newsroom/images/product/iphone/standard/Apple_iPhone-13-Pro_iPhone-13-Pro-Max_09142021_inline.jpg.slideshow-medium_2x.jpg',
  'jm-53': 'https://www.apple.com/newsroom/images/product/iphone/standard/Apple_iPhone-13-Pro_iPhone-13-Pro-Max_09142021_inline.jpg.slideshow-medium_2x.jpg',
  'jm-54': 'https://www.apple.com/newsroom/images/product/iphone/standard/Apple_iPhone-13-Pro_iPhone-13-Pro-Max_09142021_inline.jpg.slideshow-medium_2x.jpg',
  'jm-55': 'https://www.apple.com/newsroom/images/product/iphone/standard/Apple_iPhone-13-Pro_iPhone-13-Pro-Max_09142021_inline.jpg.slideshow-medium_2x.jpg',

  // Oraimo FreePods 4 - Amazon CDN (verified 200)
  'jm-92': 'https://m.media-amazon.com/images/I/41akMKusRvL._AC_UF894,1000_QL80_.jpg',
};

// Category-level fallback images from Pexels (license-free stock photography).
// Used when an exact product photo cannot be verified - NOT the reference sheets.
const categoryFallbacks: Record<Category, string> = {
  Smartphones: 'https://images.pexels.com/photos/7989741/pexels-photo-7989741.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  Tablets: 'https://images.pexels.com/photos/18205642/pexels-photo-18205642.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Laptops & Computers': 'https://images.pexels.com/photos/18311089/pexels-photo-18311089.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  Audio: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Power & Solar': 'https://images.pexels.com/photos/518530/pexels-photo-518530.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  Accessories: 'https://images.pexels.com/photos/947407/pexels-photo-947407.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  Storage: 'https://images.pexels.com/photos/27742572/pexels-photo-27742572.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'Fans & Appliances': 'https://images.pexels.com/photos/10450623/pexels-photo-10450623.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  Networking: 'https://images.pexels.com/photos/15863354/pexels-photo-15863354.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  Gaming: 'https://images.pexels.com/photos/16070479/pexels-photo-16070479.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  Smartwatches: 'https://images.pexels.com/photos/31541678/pexels-photo-31541678.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
};

export function getProductImage(productId: string, category: Category): string {
  return productImages[productId] ?? categoryFallbacks[category] ?? categoryFallbacks.Smartphones;
}

export function hasVerifiedImage(productId: string): boolean {
  return productId in productImages;
}

export { categoryFallbacks };
