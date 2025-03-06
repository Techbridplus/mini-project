import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { Plus } from 'lucide-react';


  function Dropdown() {
    const handleCreateServer = () => {
        console.log("Create Server clicked");
      };
    
      const handleCreateGroup = () => {
        console.log("Create Group clicked");
      };
  
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition">
                <Plus className="group-hover:text-white transition text-emerald-500" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={handleCreateServer} className="font-bold text-blue-600">
                Create Server
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleCreateGroup}>
                Create Group
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
  }
  
  export default Dropdown
  