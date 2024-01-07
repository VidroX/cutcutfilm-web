import { useMemo } from 'react';
import Link from '@/components/link/link';

export interface TextLink {
	text: string;
	link?: string;
}

type Props = {
	text: string;
	textLinks?: TextLink[];
	linkClassName?: string;
};

export default function TextLinksBuilder({
	text,
	textLinks = [],
	linkClassName = 'underline',
}: Props) {
	const textParts = useMemo<TextLink[]>(() => {
		const parts = text.split(
			new RegExp(textLinks?.map((textLink) => textLink.text).join('|'), 'g'),
		);

		for (let i = 0; i < parts.length; i++) {
			if (i % 2 === 0) {
				continue;
			}

			parts.splice(
				i,
				0,
				textLinks[Math.min((textLinks?.length - 1) % i, textLinks?.length - 1)].text,
			);
		}

		return parts
			.map<TextLink>((text) => {
				const textLink = textLinks?.find((textLink) => textLink.text.trim() === text.trim());

				return {
					text,
					link: textLink != null ? textLink.link : '',
				};
			})
			.filter((textLink) => textLink.text.trim().length > 0);
	}, [text, textLinks]);

	return (
		<p>
			{textParts.map((part, index) =>
				(part.link?.length ?? 0) > 0 ? (
					<Link key={`link-part-${index}`} className={linkClassName} href={part.link!}>
						{part.text}
					</Link>
				) : (
					<span key={`link-part-${index}`}>{part.text}</span>
				),
			)}
		</p>
	);
}
