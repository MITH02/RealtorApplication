import { Moon, Sun } from "lucide-react";
import styled from "@emotion/styled";
import { Button } from "@/components/ui/button";
import { useTheme } from "./theme-provider";

const StyledThemeButton = styled(Button)`
  height: 3rem !important;
  width: 3rem !important;
  border-radius: 50% !important;
  background: rgba(255, 255, 255, 0.8) !important;
  backdrop-filter: blur(8px) !important;
  border: 1px solid rgba(255, 255, 255, 0.5) !important;
  box-shadow:
    0 10px 15px -3px rgb(0 0 0 / 0.1),
    0 4px 6px -4px rgb(0 0 0 / 0.1) !important;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) !important;

  .dark & {
    background: rgba(51, 65, 85, 0.8) !important;
    border-color: rgba(51, 65, 85, 0.5) !important;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.95) !important;
    box-shadow:
      0 20px 25px -5px rgb(0 0 0 / 0.1),
      0 8px 10px -6px rgb(0 0 0 / 0.1) !important;
    transform: scale(1.1) !important;

    .dark & {
      background: rgba(51, 65, 85, 0.95) !important;
    }
  }

  .sun-icon {
    height: 1.4rem;
    width: 1.4rem;
    transform: rotate(0deg) scale(1);
    transition: all 500ms cubic-bezier(0.4, 0, 0.2, 1);
    color: hsl(45 93% 47%);

    .dark & {
      transform: rotate(-90deg) scale(0);
    }

    &:hover {
      color: hsl(45 93% 42%);
    }
  }

  .moon-icon {
    position: absolute;
    height: 1.4rem;
    width: 1.4rem;
    transform: rotate(90deg) scale(0);
    transition: all 500ms cubic-bezier(0.4, 0, 0.2, 1);
    color: hsl(217 91% 60%);

    .dark & {
      transform: rotate(0deg) scale(1);
    }

    &:hover {
      color: hsl(217 91% 65%);
    }
  }
`;

const ScreenReaderOnly = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

export function ThemeToggle() {
  // For now, just return the SimpleThemeToggle since we haven't converted DropdownMenu yet
  return <SimpleThemeToggle />;
}

export function SimpleThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("light");
    } else {
      // If system, toggle to light
      setTheme("light");
    }
  };

  return (
    <StyledThemeButton variant="ghost" size="icon" onClick={toggleTheme}>
      <Sun className="sun-icon" />
      <Moon className="moon-icon" />
      <ScreenReaderOnly>Toggle theme</ScreenReaderOnly>
    </StyledThemeButton>
  );
}
