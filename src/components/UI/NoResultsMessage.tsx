import Image from 'next/image';

export default function NoResults({message}: {message: string}) {
  return (
    <div className="text-center h-vh flex flex-col justify-center items-center">
      <Image
        src="/NoResults.png"
        width={200}
        height={200}
        alt="No results image"
        priority
        className="mt-40 w-auto h-auto"
      />
      <p className="text-3xl">
        {message}
      </p>
    </div>
  );
}