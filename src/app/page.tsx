import Image from 'next/image';

export default function Home() {
  return (
    <section className="flex flex-col gap-10">
      <h1 className="text-2xl font-medium tracking-tighter">
        hello, I&apos;m vicent 👋
      </h1>
      <p>
        I&apos;m a full-stack developer with a specific passion for the
        frontend. I currently work at{' '}
        <a
          href="http://flywire.com"
          className="group inline-flex items-center align-middle"
        >
          <Image
            alt="Flywire icon"
            aria-hidden
            className="h-auto w-4"
            src="/fly.svg"
            height={16}
            width={16}
          />
          <span>Flywire</span>
        </a>
        , contributing to several projects built in React. Follow my journey as
        I continue to explore the realms of code and innovation!
      </p>
    </section>
  );
}
