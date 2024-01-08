'use client';

import { useTranslations } from 'next-intl';
import NotFound from '@/assets/svg/not-found.svg';
import Button from '@/components/button/button';
import { useRouter } from '@/navigation';
import {
	TRANSLATION_ERRORS_404_NOT_FOUND,
	TRANSLATION_ERRORS_404_PAGE_MOVED,
	TRANSLATION_MAIN_GO_TO_MAIN,
} from '@/translation-keys';

export default function NotFoundContent() {
	const t = useTranslations();

	const { push } = useRouter();

	return (
		<div className='flex flex-col items-center justify-center text-center'>
			<NotFound style={{ maxWidth: 420, maxHeight: 383, height: '100%', width: '100%' }} />
			<h1 className='mt-5'>{t(TRANSLATION_ERRORS_404_NOT_FOUND)}</h1>
			<p className='mt-5'>{t(TRANSLATION_ERRORS_404_PAGE_MOVED)}</p>
			<Button className='mt-5' onClick={() => push('/')}>
				{t(TRANSLATION_MAIN_GO_TO_MAIN)}
			</Button>
		</div>
	);
}
