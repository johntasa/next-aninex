import { XMarkIcon } from "@heroicons/react/24/outline"
import { clsx } from "clsx"

export default function CrossButton({ exectFunct, calledFrom }: { exectFunct: () => void, calledFrom: string }) {
  return (
    <button
      onClick={exectFunct}
      className={
        clsx("cursor-pointer absolute top-2.5 right-2.5 p-1 rounded-full bg-teal-800 text-white hover:bg-teal-600 transition-colors",
          calledFrom === "filters" && "static h-7 w-7 flex justify-center items-center"
        )
      }
      aria-label={`Close ${calledFrom} section`}
    >
      <XMarkIcon className="h-7 w-7" />
    </button>
  )
}