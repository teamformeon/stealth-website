import ConnectStatus from '@/components/ConnectStatus';
import { CONNECT_APPS } from '@/lib/connectApps';

export default function LinearCallbackPage() {
  return <ConnectStatus app={CONNECT_APPS.linear} />;
}
