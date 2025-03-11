"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { TABS } from "@/utils/constants";

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <div className="flex justify-center gap-8">
      {TABS.map((tab) => {
        return (
          <Link
            key={tab.name}
            href={tab.href}
            className="relative p-1"
          >
            <p className={clsx(
              " text-gray-300 hover:text-white sm:text-2xl",
              {
                "text-white after:absolute after:bottom-0 after:left-0 after:w-full after:h-[5px] after:bg-pink-500":
                  pathname === tab.href,
              },
            )}>
              {tab.name}
            </p>
          </Link>
        );
      })}
    </div>
  );
}