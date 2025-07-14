import Link from "next/link";

import {
  IconFacebook,
  IconImdb,
  IconInstagram,
  IconTiktok,
  IconTwitter,
  IconYouTube,
} from "@/data/icons";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const SocialIcon = ({
  platform,
  url,
  className,
}: {
  platform: string;
  url: string;
  className?: string;
}) => {
  const socialIcons = {
    Facebook: <IconFacebook className={className} />,
    Instagram: <IconInstagram className={className} />,
    Twitter: <IconTwitter className={className} />,
    Tiktok: <IconTiktok className={className} />,
    Youtube: <IconYouTube className={className} />,
    Imdb: <IconImdb className={className} />,
  };

  const icon = socialIcons[platform as keyof typeof socialIcons] || null;

  if (!icon || !url) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors duration-150 ease-in-out"
        >
          {icon}
        </Link>
      </TooltipTrigger>
      <TooltipContent className="bg-background border-primary border">
        <p>Visit {platform}</p>
      </TooltipContent>
    </Tooltip>
  );
};