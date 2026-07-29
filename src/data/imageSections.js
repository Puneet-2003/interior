import { functionCategories } from './functions'

/** Section paths owners can attach Cloudinary images to, grouped for the picker. */
export const imageSectionGroups = [
  {
    label: 'Home',
    options: [
      { path: 'home.hero', label: 'Hero' },
      { path: 'home.about', label: 'About' },
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
