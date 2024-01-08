'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import IcCheck from '@/assets/svg/icons/ic_check.svg';
import {
	TRANSLATION_AUTH_SIDEBAR_POINT1_DESCRIPTION,
	TRANSLATION_AUTH_SIDEBAR_POINT1_TITLE,
	TRANSLATION_AUTH_SIDEBAR_POINT2_DESCRIPTION,
	TRANSLATION_AUTH_SIDEBAR_POINT2_TITLE,
	TRANSLATION_AUTH_SIDEBAR_POINT3_DESCRIPTION,
	TRANSLATION_AUTH_SIDEBAR_POINT3_TITLE,
} from '@/translation-keys';

type Props = {
	title: string;
};

interface KeyPoint {
	title: string;
	description: string;
}

export default function AuthSidebarContent({ title }: Props) {
	const t = useTranslations();

	const keyPoints = useMemo<KeyPoint[]>(
		() => [
			{
				title: t(TRANSLATION_AUTH_SIDEBAR_POINT1_TITLE),
				description: t(TRANSLATION_AUTH_SIDEBAR_POINT1_DESCRIPTION),
			},
			{
				title: t(TRANSLATION_AUTH_SIDEBAR_POINT2_TITLE),
				description: t(TRANSLATION_AUTH_SIDEBAR_POINT2_DESCRIPTION),
			},
			{
				title: t(TRANSLATION_AUTH_SIDEBAR_POINT3_TITLE),
				description: t(TRANSLATION_AUTH_SIDEBAR_POINT3_DESCRIPTION),
			},
		],
		[t],
	);

	return (
		<div className='flex flex-col'>
			<h1 className='mb-[1.56rem] text-[2.375rem]'>{title}</h1>
			{keyPoints.map((point, index) => (
				<div key={`point-${index}`} className='mb-4 flex flex-row'>
					<IcCheck />
					<div className='ms-3 flex-1'>
						<h5>{point.title}</h5>
						<p>{point.description}</p>
					</div>
				</div>
			))}
		</div>
	);
}
