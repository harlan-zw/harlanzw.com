interface ContentImageDimensionInput {
  width?: number | string
  height?: number | string
  maxHeight?: number | string
}

function dimension(value: number | string | undefined) {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined
}

export function resolveContentImageDimensions(input: ContentImageDimensionInput) {
  const maxHeight = dimension(input.maxHeight)
  return {
    width: dimension(input.width),
    height: dimension(input.height),
    style: maxHeight ? { maxHeight: `${maxHeight}px` } : undefined,
  }
}
