import { functionCategories } from './functions'
import { destinations, honeymoonPackages } from './siteContent'

/** Section paths owners can attach Cloudinary images to, grouped for the picker. */
export const imageSectionGroups = [
  {
    label: 'Home',
    options: [
      { path: 'home.hero', label: 'Hero' },
      { path: 'home.about', label: 'About' },
    ],
  },
  {
    label: 'Destination Weddings',
    options: [
      { path: 'destinations', label: 'All Destination Weddings — overview' },
      ...destinations.map((dest) => ({
        path: `destinations.${dest.id}`,
        label: `Destination — ${dest.name}`,
      })),
    ],
  },
  {
    label: 'Honeymoon Packages',
    options: [
      { path: 'honeymoon', label: 'All Honeymoon Packages — overview' },
      ...honeymoonPackages.map((pkg) => ({
        path: `honeymoon.${pkg.id}`,
        label: `Honeymoon — ${pkg.name}`,
      })),
    ],
  },
  ...functionCategories.map((cat) => ({
    label: cat.label,
    options: [
      { path: `functions.${cat.id}`, label: `${cat.label} — overview` },
      ...cat.items.map((item) => ({
        path: `functions.${cat.id}.${item.id}`,
        label: item.label,
      })),
    ],
  })),
  {
    label: 'Other sections',
    options: [
      { path: 'stories', label: 'Stories gallery' },
      { path: 'testimonials', label: 'Testimonials photo' },
    ],
  },
]

/** Flat list of every selectable path. */
export const imageSectionOptions = imageSectionGroups.flatMap((g) => g.options)
