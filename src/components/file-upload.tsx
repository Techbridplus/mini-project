"use client";

import React from "react";

import { FileIcon, X } from "lucide-react";
import Image from "next/image";

import { UploadButton,UploadDropzone} from "@/lib/uploadthing"
import { twMerge } from 'tailwind-merge'

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "serverImage";
}

 export const FileUpload: React.FC<FileUploadProps> = ({ endpoint, onChange,value }) => {
  const fileType = value?.split(".").pop();
  console.log("file type",fileType)
  console.log("value",value)
  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image fill src={value} alt="Upload" className="rounded-full" />
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  if (value && fileType === "pdf") {
    return (
      <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
        <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
        >
          {value}
        </a>
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => console.error(error.message)}
      config={{ cn: twMerge }}
      appearance={{
        button:
          "ut-ready:bg-green-500 ut-uploading:cursor-not-allowed  bg-red-500 bg-none after:bg-green-400",
        container: "   dark:bg-zinc-600 bg-gray-100",
        allowedContent:
          "flex h-8 flex-col items-center justify-center px-2 text-white",
      }}
    />
    
  );
}
