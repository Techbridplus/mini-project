"use client";

import React from "react";
import Image from "next/image";


import { cn } from "@/lib/utils";
import { ActionTooltip } from "@/components/action-tooltip";

interface NavigationItemProps {

  imageUrl: string;
  name: string;
}

export default function ServerNavigationItem({imageUrl, name }: NavigationItemProps) {

  const onClick = () => {

  };

  return (
    <ActionTooltip side="right" align="center" label={name}>
      <button onClick={onClick} className="group relative flex items-center">
        <div
          className={cn(
            "absolute left-0 bg-white rounded-full transition-all w-[4px]",
          )}
        />
        <div
          className={cn(
            "relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
          )}
        >
          <Image fill src={imageUrl} alt="Channel" />
        </div>
      </button>
    </ActionTooltip>
  );
}
