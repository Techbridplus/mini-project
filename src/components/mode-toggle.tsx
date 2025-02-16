"use client"
import React from 'react'
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button" 
import { useTheme } from "next-themes"

function ModeToggle() {
    const { theme, setTheme } = useTheme();
    return (
        <div>
            <Button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="bg-transparent border-0" variant="custom" size="icon"
        >
            {theme === 'dark' ? (
                <Sun className="text-white "  size={30}/>
            ) : (
                <Moon  className="  text-white"  size={30}/>
            )}
        </Button>
        </div>
    )
}

export default ModeToggle
