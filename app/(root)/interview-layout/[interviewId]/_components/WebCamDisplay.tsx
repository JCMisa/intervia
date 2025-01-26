"use client";

import { Button } from "@/components/ui/button";
import { WebcamIcon } from "lucide-react";
import { useState } from "react";
import Webcam from "react-webcam";

const WebCamDisplay = () => {
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  return (
    <div>
      <h2 className="font-bold text-2xl">Let&apos;s Get Started</h2>
      {webCamEnabled ? (
        <div className="flex flex-col items-center gap-2">
          <Webcam
            onUserMedia={() => setWebCamEnabled(true)}
            onUserMediaError={() => setWebCamEnabled(false)}
            mirrored={true}
            imageSmoothing={true}
            style={{
              height: 600,
              width: 1000,
            }}
          />

          <Button
            variant={"outline"}
            className="shadow-lg w-full"
            onClick={() => setWebCamEnabled(false)}
          >
            Disable Web Cam and Microphone
          </Button>
        </div>
      ) : (
        <>
          <WebcamIcon className="h-96 w-full my-7 p-20 bg-light-100 dark:bg-dark-100 rounded-lg border cursor-pointer" />
          <Button
            className="shadow-lg w-full"
            onClick={() => setWebCamEnabled(true)}
          >
            Enable Web Cam and Microphone
          </Button>
        </>
      )}
    </div>
  );
};

export default WebCamDisplay;
