import Script from 'next/script';

export default function Analytics() {
  return (
    <Script
      src="https://www.googletagmanager.com/gtag/js?id=G-11197KZXNE"
      strategy="worker"
    />
  );
}
