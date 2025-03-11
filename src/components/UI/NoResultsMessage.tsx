import Image from 'next/image';

export default function NoResults({message}: {message: string}) {
  return (
    <div className="text-center h-vh flex flex-col justify-center items-center">
      <Image
        src="/NoResults.png"
        width={100}
        height={100}
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