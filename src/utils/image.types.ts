interface UnsplashImage {
  id: string
  slug: string
  alternative_slugs: Record<string, string> // Key is language code (e.g., "en", "es"), value is slug in that language
  created_at: string // Date in ISO 8601 format
  updated_at: string // Date in ISO 8601 format
  promoted_at: null | string // Date in ISO 8601 format or null
  width: number
  height: number
  color: string
  blur_hash: string
  description: string
  alt_description: string
  breadcrumbs: any[]
  // Likely an array of objects representing breadcrumb navigation
  urls: {
    raw: string
    full: string
    regular: string
    small: string
    thumb: string
    small_s3: string
  }
  links: {
    self: string
    html: string
    download: string
    download_location: string
  }
  likes: number
  liked_by_user: boolean
  current_user_collections: any[] // Likely an array of objects representing user collections
  sponsorship: null | any // Likely an object representing sponsorship details (null if not sponsored)
  topic_submissions: { [topic: string]: { status: string; approved_on: string } }
  asset_type: string // Likely "photo" or other supported asset type
  user: UnsplashUser
}

interface UnsplashUser {
  id: string
  updated_at: string // Date in ISO 8601 format
  username: string
  name: string
  first_name: string
  last_name: string
  twitter_username: string
  portfolio_url: string
  bio: string
  location: string
  links: {
    self: string
    html: string
    photos: string
    likes: string
    portfolio: string
    following: string
    followers: string
  }
  profile_image: {
    small: string
    medium: string
    large: string
  }
  instagram_username: string
  total_collections: number
  total_likes: number
  total_photos: number
  total_promoted_photos: number
  total_illustrations: number
  total_promoted_illustrations: number
  accepted_tos: boolean
  for_hire: boolean
  social: {
    instagram_username: string
    portfolio_url: string
    twitter_username: string
    paypal_email: null | string
  }
}

export type { UnsplashImage, UnsplashUser }
