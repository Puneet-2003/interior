import { MEDIA_BUCKET, isSupabaseConfigured, supabase } from './supabaseClient'

const MAX_BYTES = 50 * 1024 * 1024

function safeName(name) {
  const dot = name.lastIndexOf('.')
  const base = dot > 0 ? name.slice(0, dot) : name
  const ext = dot > 0 ? name.slice(dot + 1).toLowerCase() : 'bin'
  const slug =
    base
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60) || 'file'
  return `${slug}.${ext.replace(/[^a-z0-9]/g, '')}`
}

/**
 * Upload a picked file to the public bucket and return its permanent URL.
 * The section path becomes the folder so the bucket stays browsable.
 */
export async function uploadMedia(file, folder = 'uploads') {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase keys are missing, so uploads are disabled.')
  }
  if (!file) throw new Error('Choose a file first.')
  if (file.size > MAX_BYTES) throw new Error('That file is larger than 50 MB.')

  const key = `${folder.replace(/[^a-zA-Z0-9._-]+/g, '-')}/${Date.now()}-${safeName(file.name)}`

  const { error } = await supabase.storage.from(MEDIA_BUCKET).upload(key, file, {
    cacheControl: '31536000',
    contentType: file.type || undefined,
  })
  if (error) throw new Error(`Upload failed: ${error.message}`)

  const { data } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(key)
  if (!data?.publicUrl) throw new Error('Upload finished but no public URL was returned.')
  return data.publicUrl
}
