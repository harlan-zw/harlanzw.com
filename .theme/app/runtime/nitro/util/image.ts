export const MaxWidth = 900
export const MaxHeight = 700
export const defaultAspectRatio = 16 / 9

export const computeSizes = (width: number, height: number, maxHeight?: number) => {
  maxHeight = maxHeight || (height > MaxHeight ? MaxHeight : height)
  // figure out aspect ratio
  const ar = width / height
  // 0.625

  if (width > MaxWidth) {
    width = MaxWidth
    height = Math.round(width / ar)
  }

  if (height > maxHeight) {
    height = maxHeight
    width = Math.round(height * ar)
  }

  const px = (size: number) => `${size}px`

  const sizes = [
    `md:${px(width)}`,
    'sm:95vw',
    'xs:95vw',
  ].join(' ')

  return {
    height,
    width,
    sizes,
  }
}
