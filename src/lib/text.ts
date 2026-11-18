// Dependency-free text helpers. Kept import-free so vite.config.ts can use them at build time.

/** "Ezekiel A. Bermudez" -> "Ezekiel Bermudez" (drops middle initials) for page titles. */
export function getWordmark(name: string): string {
  return name
    .split(/\s+/)
    .filter((part) => !/^[A-Z]\.$/.test(part))
    .join(' ')
}
