"use client";

import Image from "next/image";
import { useState } from "react";

import { TMDB_IMAGE } from "@/data/constants";
import { IconStar } from "@/data/icons";
import { TPickReview } from "@/data/zod/tmdb";
import { cn, formatDate, generateAvatar } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type Props = {
  review: TPickReview;
  expanded?: boolean;
};
export const CardReview = ({ review, expanded = true }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="flex flex-row items-center gap-x-4 pb-4">
        <div>
          <Avatar className="border-primary size-16 border-2">
            <AvatarImage
              src={
                review.author_details.avatar_path
                  ? `${TMDB_IMAGE}/w500/${review.author_details.avatar_path}`
                  : generateAvatar(review.author)
              }
              alt={review.author}
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16.66vw"
            />
            <AvatarFallback>
              <Image
                src={generateAvatar(review.author)}
                alt={review.author}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16.66vw"
                className="object-cover"
              />
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-1 flex-col justify-center">
          <h3 className="text-foreground text-xl leading-tight font-extrabold">
            {review.author}
          </h3>
          <div className="mt-1 flex items-center gap-x-2">
            {review.author_details.rating !== null && (
              <div className="flex items-center gap-x-1.5 rounded-full bg-yellow-500/90 px-3 py-1 text-sm font-semibold text-white shadow-md">
                <IconStar className="text-white" size={14} />
                <span>{review.author_details.rating.toFixed(1)}</span>{" "}
              </div>
            )}
            <p className="text-muted-foreground text-sm">
              Written on {formatDate(review.created_at)}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow pt-2">
        <p
          className={cn(
            "leading-relaxed",
            isExpanded ? "line-clamp-none" : "line-clamp-5",
          )}
          onClick={() =>
            expanded ? setIsExpanded(true) : setIsExpanded(false)
          }
        >
          {review.content}
        </p>
      </CardContent>
    </Card>
  );
};
