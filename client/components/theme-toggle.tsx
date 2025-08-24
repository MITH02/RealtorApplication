import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/50 dark:border-slate-700/50 hover:bg-white/95 dark:hover:bg-slate-800/95 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-500" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-blue-500" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border-white/50 dark:border-slate-700/50 shadow-2xl"
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="hover:bg-white/80 dark:hover:bg-slate-700/80 focus:bg-white/80 dark:focus:bg-slate-700/80"
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="hover:bg-white/80 dark:hover:bg-slate-700/80 focus:bg-white/80 dark:focus:bg-slate-700/80"
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="hover:bg-white/80 dark:hover:bg-slate-700/80 focus:bg-white/80 dark:focus:bg-slate-700/80"
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
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
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="h-12 w-12 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/50 dark:border-slate-700/50 hover:bg-white/95 dark:hover:bg-slate-800/95 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
    >
      <Sun className="h-[1.4rem] w-[1.4rem] rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0 text-amber-500 group-hover:text-amber-600" />
      <Moon className="absolute h-[1.4rem] w-[1.4rem] rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100 text-blue-500 group-hover:text-blue-400" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
