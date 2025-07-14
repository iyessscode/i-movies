"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface YouTubePlayer {
  playVideo(): void;
  stopVideo(): void;
  destroy(): void;
}

interface YouTubePlayerOptions {
  videoId: string;
  playerVars?: {
    autoplay?: 0 | 1;
    controls?: 0 | 1;
    modestbranding?: 0 | 1;
    rel?: 0 | 1;
    enablejsapi?: 0 | 1;
  };
  events?: {
    onReady?(event: { target: YouTubePlayer }): void;
    onStateChange?(event: { data: number }): void;
  };
}

declare global {
  interface Window {
    YT: {
      Player: new (
        elementId: string | HTMLElement,
        options: YouTubePlayerOptions,
      ) => YouTubePlayer;
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

type Props = {
  children: React.ReactNode;
  trailerKey: string;
  isOpen: boolean;
  setIsOpenAction: (open: boolean) => void;
};

export const ModalTrailer = ({
  children,
  trailerKey,
  isOpen,
  setIsOpenAction,
}: Props) => {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setIframeLoaded(false);
      if (playerRef.current) {
        playerRef.current.stopVideo();
        playerRef.current.destroy();
        playerRef.current = null;
      }
    } else {
      const timeout = setTimeout(() => {
        setIframeLoaded(true);
        if (window.YT && iframeRef.current) {
          playerRef.current = new window.YT.Player(iframeRef.current, {
            videoId: trailerKey,
            playerVars: {
              autoplay: 1,
              controls: 1,
              modestbranding: 1,
              rel: 0,
              enablejsapi: 1,
            },
            events: {
              onReady: (event) => {
                event.target.playVideo();
              },
            },
          });
        }
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen, trailerKey]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpenAction}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      {isOpen && (
        <DialogContent className="max-w-5xl overflow-hidden border-none bg-black p-0">
          <DialogHeader className="sr-only p-4">
            <DialogTitle>Watch Trailer</DialogTitle>
            <DialogDescription>Trailer</DialogDescription>
          </DialogHeader>
          <div className="aspect-video w-full">
            {iframeLoaded ? (
              <iframe
                ref={iframeRef}
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&controls=1&modestbranding=1&rel=0&enablejsapi=1`}
                title="Trailer"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full rounded-lg"
              />
            ) : (
              <Image
                src={`https://img.youtube.com/vi/${trailerKey}/hqdefault.jpg`}
                alt="Trailer thumbnail"
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16.66vw"
                className="size-full rounded-lg object-cover"
              />
            )}
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
};
