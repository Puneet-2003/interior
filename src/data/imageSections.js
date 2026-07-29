import { pageImages } from '../data/images'

/** Flat list of section paths owners can attach Cloudinary images to. */
export const imageSectionOptions = [
  { path: 'home.hero', label: 'Hero' },
  { path: 'home.about', label: 'About' },
  { path: 'functions.wedding', label: 'Functions — Wedding' },
  { path: 'functions.baby', label: 'Functions — Baby & Family' },
  { path: 'functions.religious', label: 'Functions — Religious' },
  { path: 'stories', label: 'Stories gallery' },
  { path: 'testimonials', label: 'Testimonials photo' },
]

// Keep pageImages imported so tree-shaking doesn't drop the data module reference
void pageImages
