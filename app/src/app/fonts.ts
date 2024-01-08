import { Inter, Schibsted_Grotesk } from 'next/font/google';

export const inter = Inter({
	subsets: ['latin'],
	display: 'swap',
});

export const grotesque = Schibsted_Grotesk({
	subsets: ['latin'],
	variable: '--font-grotesque',
	display: 'swap',
});
