import { Tektur } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import {
  IconFacebook,
  IconGithub,
  IconInstagram,
  IconTwitter,
} from "@/data/icons";

const tekur = Tektur({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const sections = [
  {
    label: "Explore",
    items: [
      {
        label: "Popular Movies",
        href: "/movie/popular",
      },
      {
        label: "Now Playing Movies",
        href: "/movie/popular",
      },
      {
        label: "Top Rated Movies",
        href: "/movie/top-rated",
      },
      {
        label: "Upcoming Movies",
        href: "/movie/upcoming",
      },
      {
        label: "Popular TV Series",
        href: "/tv/popular",
      },
      {
        label: "TV Series Airing Today",
        href: "/tv/airing-today",
      },
      {
        label: "TV Series On The Air",
        href: "/tv/on-the-air",
      },
      {
        label: "Top Rated TV Series",
        href: "/tv/top-rated",
      },
      {
        label: "People",
        href: "/people",
      },
    ],
  },
  {
    label: "Account & Support",
    items: [
      {
        label: "Sign In / Sign Up",
        href: "/sign-in",
      },
      {
        label: "My List",
        href: "/my-list",
      },
      {
        label: "Favorites",
        href: "/favorites",
      },
      {
        label: "Liked",
        href: "/liked",
      },
      {
        label: "Contact Us",
        href: "/contact-us",
      },
      {
        label: "FAW",
        href: "/faq",
      },
    ],
  },
  {
    label: "Information",
    items: [
      {
        label: "Privacy Policy",
        href: "/privacy-policy",
      },
      {
        label: "Terms of Service",
        href: "/terms-of-service",
      },
      {
        label: "About I Movies",
        href: "/about",
      },
    ],
  },
];

const social = [
  {
    name: "Facebook",
    href: "https://web.facebook.com/profile.php?id=61577568355504",
    icon: IconFacebook,
  },
  {
    label: "Twitter",
    href: "https://x.com/iyessscode",
    icon: IconTwitter,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/aldiyes_p.b/#",
    icon: IconInstagram,
  },
  {
    label: "Github",
    href: "https://github.com/iyessscode",
    icon: IconGithub,
  },
];

export const Footer = () => {
  return (
    <footer className="border-t-muted bg-background z-30 mt-16 border-t-2 py-10">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="col-span-1 text-center md:text-left">
          <Link
            href="/"
            className={`flex items-center justify-center text-4xl font-bold ${tekur.className} `}
          >
            <Image src="/logo.svg" alt="logo" height={72} width={72} priority />
            I MOVIES
          </Link>
          <p className="mt-4 text-sm leading-relaxed">
            &copy; {new Date().getFullYear()} I Movies. All rights reserved.
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Powered by{" "}
            <Link
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors duration-200"
            >
              TMDB API
            </Link>
            .
          </p>
        </div>

        {sections.map((section, index) => (
          <div
            key={`${section.label} - ${index}`}
            className="text-muted-foreground col-span-1 text-center md:text-left"
          >
            <h3 className="text-foreground mb-4 text-lg font-semibold">
              {section.label}
            </h3>
            <ul className="mb-6 space-y-2">
              {section.items.map((item, index) => (
                <li key={`${item.href} - ${index}`}>
                  <Link
                    prefetch
                    href={item.href}
                    className="hover:text-primary transition-colors duration-150"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            {index === sections.length - 1 && (
              <>
                <h3 className="mb-4 text-lg font-semibold text-white">
                  Follow Us
                </h3>
                <div className="flex justify-center space-x-4 md:justify-start">
                  {social.map((item, index) => (
                    <Link
                      key={`${item.label} - ${index}`}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors duration-200"
                    >
                      <item.icon className="size-6" />
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </footer>
  );
};
