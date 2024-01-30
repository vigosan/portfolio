import Image from 'next/image';
import Icon from './ui/Icon';

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
          className="group inline-flex items-center gap-1 align-middle"
          title="Flywire"
        >
          <Icon name="fly" className="h-6 w-6" />
          <span className="group-hover:underline group-hover:decoration-blue-500 group-hover:decoration-wavy dark:group-hover:decoration-slate-500">
            Flywire
          </span>
        </a>
        , contributing to several projects built in React. Follow my journey as
        I continue to explore the realms of code and innovation!
      </p>
    </section>
  );
}
