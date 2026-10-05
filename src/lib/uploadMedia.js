const MAX_BYTES = 50 * 1024 * 1024

/**
 * Handle a locally selected media file without Supabase storage dependency.
 * Converts local files to base64 Data URLs so they can be previewed or saved
 * without external storage bucket calls.
 */
export async function uploadMedia(file) {
  if (!file) throw new Error('Choose a file first.')
  if (file.size > MAX_BYTES) throw new Error('That file is larger than 50 MB.')

  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(new Error('Failed to read local file.'))
    reader.readAsDataURL(file)
  })
}
