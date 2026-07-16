import ConnectStatus from '@/components/ConnectStatus';
import { CONNECT_APPS } from '@/lib/connectApps';

export default function JiraCallbackPage() {
  return <ConnectStatus app={CONNECT_APPS.jira} />;
}
