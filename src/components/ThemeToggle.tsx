import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ui } from '@/data/site'
import { useTheme } from '@/hooks/useTheme'

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme()
  const label = theme === 'dark' ? ui.header.themeToLight : ui.header.themeToDark

  return (
    <Button variant="ghost" size="icon" className={className} onClick={toggleTheme} aria-label={label} title={label}>
      {theme === 'dark' ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
    </Button>
  )
}
