/** Shared focus ring for custom links (shadcn primitives ship their own). */
export const focusRing =
  'outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'

/** Small fade-in delay for card `index` in a grid of `columns`, so a row appears left to right (max ~120ms). */
export const revealStagger = (index: number, columns: number): number => (index % columns) * 60
