import { spawnSync, write } from 'bun'


export const resize_image = async (blob: ArrayBuffer, id: string) => {
  // Write uploaded image into tmp/.
  await write(`datastore/tmp/${id}`, blob)

  // Save uploaded kind-of HD image into originals/.
  // (This version is resized, converted to .avif and exif metadata removed.)
  // eslint-disable-next-line no-useless-escape
  spawnSync([
    'convert',
    `datastore/tmp/${id}`,
    '-resize',
    '2000x1600>',
    '-strip',
    `datastore/${id}.avif`
  ])

  // Transform original image into a .webp thumbnail without exif metadata.
  spawnSync([
    'convert',
    `datastore/tmp/${id}`,
    '-thumbnail',
    '636x340^',
    '-gravity',
    'center',
    '-extent',
    '636x340',
    '-strip',
    `datastore/${id}.webp`
  ])

  // Delete image from tmp/ folder
  spawnSync(['rm', `datastore/tmp/${id}`])

  return 'image_ok'
}
