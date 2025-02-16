"useclient"
import React from 'react'
import { Search } from "lucide-react";


function ServerSearch() {
   

    return (
        <>
            <button 
                className="group px-5 py-2 rounded-full items-center flex gap-x-2 w-[300px] md:w-1/2   hover:bg-zinc-700/10 dark:bg-zinc-500 transition bg-zinc-100"
            >
                <Search className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                <p className="font-semibold text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition">
                Search
                </p>
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto">
                    <span className="text-xs">⌘</span>
                    <span className="text-lg">K</span>
                </kbd>
                
            </button>
        </>
    )
}

export default ServerSearch
