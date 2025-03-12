"use client";

import React, { useState } from "react";
import { Camera } from "lucide-react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useEffect, useRef } from "react";
import {ScanQrCode} from 'lucide-react';
const QRCodeScanner = () => {
  const [data, setData] = useState<string | null>(null);
  const [scan, setScan] = useState(false);
  const scannerRef = useRef<any>(null);

  useEffect(() => {
    if (scan) {
      scannerRef.current = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      );

      scannerRef.current.render(
        (result: any) => {
          setData(result);
          setScan(false);
        },
        (error: any) => {
          console.log("QR Code Error:", error);
        }
      );
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear();
      }
    };
  }, [scan]);

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleCloseDropdown = () => {
    setData(null);
  };

  return (
    <div className="flex justify-center items-center h-screen z-50">
        {scan && (
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md z-10" />
      )}
      {data && (
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md z-10" />
      )}

    <div className={scan ? "z-20" : "z-0"}>
      {!scan ? (
        <button onClick={() => setScan(true)} >
            <ScanQrCode />
        </button>
      ) : (
        <Card className="w-[400px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-50">
          <CardHeader>
            <CardTitle className="text-center">QR Code Scanner</CardTitle>
          </CardHeader>
          <CardContent>
            <div id="reader" style={{ width: "100%" }}></div>
            <Button
              onClick={() => setScan(false)}
              className="mt-4 w-full"
              variant="destructive"
            >
              Close Scanner
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
      {data && (
        <Card className="w-[400px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-50">
          <CardHeader>
            <CardTitle className="text-center">Scanned Data</CardTitle>
          </CardHeader>
          <CardContent>
            {isValidUrl(data) ? (
              <a
            href={data}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
              >
            Open Link
              </a>
            ) : (
              <p className="break-words">{data}</p>
            )}
            <Button
              onClick={handleCloseDropdown}
              className="mt-4 w-full"
              variant="destructive"
            >
              Close
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default QRCodeScanner;
