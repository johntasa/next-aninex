import Link from "next/link";
import { HeartIcon, HomeIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";

export default function GoToFavsButton () {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  
  return (
    <Link href={ isHomePage ? "/favorites" : "/" }>
      <button className="fixed cursor-pointer bottom-6 right-6 bg-teal-700 hover:bg-teal-500 text-white rounded-full p-4 shadow-lg transition-all duration-300 flex items-center justify-center">
        { isHomePage ? <HeartIcon className="size-8" /> : <HomeIcon className="size-8" /> }
      </button>
    </Link>
  );
}