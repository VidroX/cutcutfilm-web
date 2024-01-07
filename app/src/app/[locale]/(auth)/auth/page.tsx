import { RedirectType } from 'next/dist/client/components/redirect';
import { redirect } from '@/navigation';

export default async function AuthPage() {
	redirect('/auth/login', RedirectType.replace);
}
