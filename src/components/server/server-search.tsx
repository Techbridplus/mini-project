"use client";
import React, { useEffect, useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { ServerCard } from "@/components/server-card";
import { Server } from "@prisma/client";
import axios from "axios";
import { ServerCardContainer } from "@/components/card/server-card-container";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";


function ServerSearch({ profileId }: { profileId: string }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [servers, setServers] = useState<Server[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Debounced API Call
  useEffect(() => {
    if (!query) return setServers([]);

    const controller = new AbortController();
    const fetchServers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/servers?query=${query}`, {
          signal: controller.signal,
        });
        setServers(response.data);
      } catch (error) {
        if (!axios.isCancel(error))
          console.error("Error fetching servers:", error);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchServers, 300);
    return () => {
      clearTimeout(debounce);
      controller.abort();
    };
  }, [query]);

  const handleDialogOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setQuery("");
      setServers([]);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group px-5 py-2 rounded-full items-center flex gap-x-2 w-[300px] md:w-1/2 hover:bg-zinc-700/10 dark:bg-zinc-500 transition bg-zinc-100"
      >
        <Search className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
        <p className="font-semibold text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition">
          Search
        </p>
        <kbd className="ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">⌘</span>
          <span className="text-lg">K</span>
        </kbd>
      </button>
          <CommandDialog open={open} onOpenChange={handleDialogOpenChange} className="w-4/5" >
            <CommandInput
              placeholder="Search all servers"
              value={query}
              onValueChange={setQuery}
            />
            <CommandList className="h-[600px]">
              <div className="mt-8">
                <div>

                </div>
                {servers.length>0 &&<p className="text-center font-bold text-lg">Servers</p>}
                {loading ? (
                  <div className="flex flex-col items-center justify-center p-12 text-center">
                    <div className="loader"></div> {/* Add your loader component or animation here */}
                    <p className="mt-2 text-lg font-semibold">Searching...</p>
                    <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
                  </div>
                ) : !query ? (
                  <div className="flex flex-col items-center justify-center p-12 text-center">
                    <h3 className="mt-2 text-lg font-semibold">Search for servers</h3>
                    <p className="mt-1 text-muted-foreground">Enter a server name to find matching servers</p>
                  </div>
                ) : servers.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-12 text-center">
                    <h3 className="mt-2 text-lg font-semibold">No servers found</h3>
                    <p className="mt-1 text-muted-foreground">No results for "{query}"</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4 mx-3">
                    {servers.map((server) => (
                      <ServerCardContainer
                        key={server.id}
                        imageUrl={server.imageUrl}
                        title={server.name}
                        userId={profileId}
                        serverUserId={server.userId}
                        serverId={server.id}
                      />
                    ))}
                  </div>
                )}
              </div>
            </CommandList>
          </CommandDialog>
    </>
  );
}

export default ServerSearch;