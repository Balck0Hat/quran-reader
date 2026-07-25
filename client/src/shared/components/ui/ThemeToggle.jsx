import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme.js';
import IconButton from './IconButton.jsx';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <IconButton
      label={isDark ? 'الوضع النهاري' : 'الوضع الليلي'}
      onClick={toggleTheme}
    >
      {isDark ? (
        <Sun className="h-5 w-5" aria-hidden="true" />
      ) : (
        <Moon className="h-5 w-5" aria-hidden="true" />
      )}
    </IconButton>
  );
};

export default ThemeToggle;
