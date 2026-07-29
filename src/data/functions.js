/** Event functions this studio handles — shown in place of a separate Projects section.
 *  Image paths: functions.{categoryId}.{itemId}
 *  e.g. functions.wedding.haldi
 */

export function slugify(label) {
  return label
    .toLowerCase()
    .replace(/[()/]/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function withIds(items) {
  return items.map((label) => ({ id: slugify(label), label }))
}

export const functionCategories = [
  {
    id: 'wedding',
    label: 'Wedding Functions',
    eyebrow: 'Celebrate Love',
    items: withIds([
      'Engagement / Ring Ceremony',
      'Mehendi & Haldi',
      'Wedding Ceremony',
      'Baraat & Reception',


    ]),
  },
  {
    id: 'baby',
    label: 'Baby & Family Functions',
    eyebrow: 'Cherished Moments',
    items: withIds([
      'Baby Shower (Godh Bharai)',
      'Naming Ceremony (Naamkaran)'     
    ]),
  },
  {
    id: 'religious',
    label: 'Religious Functions',
    eyebrow: 'Sacred Gatherings',
    items: withIds([
      'Satyanarayan Katha',
      'Bhagwat Katha',
      'Sundarkand Path'
    ]),
  },
]

/** Build Cloudinary-ready path: functions.wedding.haldi */
export function functionImagePath(categoryId, itemId) {
  return `functions.${categoryId}.${itemId}`
}
