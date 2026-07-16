import ConnectStatus from '@/components/ConnectStatus';
import { CONNECT_APPS } from '@/lib/connectApps';

export default function ConfluenceCallbackPage() {
  return <ConnectStatus app={CONNECT_APPS.confluence} />;
}
