import { RedirectType } from 'next/dist/client/components/redirect';
import { redirect } from '@/navigation';

export default async function ResetPasswordPage() {
	redirect('/auth/login', RedirectType.replace);
}
