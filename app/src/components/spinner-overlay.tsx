import { ReactNode } from 'react';
import Spinner from '@/components/spinner';

type Props = {
	loading?: boolean;
	spinnerSize?: number;
	spinnerColor?: string;
	spinnerBackgroundColor?: string;
	overlayBackgroundColor?: string;
	children: ReactNode;
	className?: string;
};

export default function SpinnerOverlay({
	loading = false,
	spinnerSize = 64,
	spinnerBackgroundColor = 'transparent',
	spinnerColor = 'hsl(var(--twc-secondary))',
	overlayBackgroundColor = 'hsl(var(--twc-background))',
	className = '',
	children,
}: Props) {
	return (
		<div className={className}>
			{loading && (
				<div
					className='absolute bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center'
					style={{ backgroundColor: overlayBackgroundColor }}>
					<Spinner
						size={spinnerSize}
						color={spinnerColor}
						backgroundColor={spinnerBackgroundColor}
					/>
				</div>
			)}
			{children}
		</div>
	);
}
