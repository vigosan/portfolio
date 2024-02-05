import { GoogleAnalytics } from '@next/third-parties/google';

export default function Page({ gaId }: { gaId: string }) {
  return <GoogleAnalytics gaId={gaId} />;
}
