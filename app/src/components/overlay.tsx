import { ReactNode, useLayoutEffect, useRef, useState } from 'react';

type Props = {
	expanded?: boolean;
	className?: string;
	children: ReactNode;
	overlayComponent: ReactNode;
	shown?: boolean;
	location?: OverlayLocation;
	zIndex?: number;
};

export enum OverlayLocation {
	Top,
	Bottom,
}

const Overlay = ({
	className = '',
	expanded = false,
	shown = false,
	children,
	overlayComponent,
	location = OverlayLocation.Bottom,
	zIndex = 10,
}: Props) => {
	const childRef = useRef<HTMLDivElement>(null);

	const [componentHeight, setComponentHeight] = useState(0);

	useLayoutEffect(() => {
		if (childRef != null && setComponentHeight != null) {
			setComponentHeight(childRef.current?.clientHeight ?? 0);
		}
	}, [childRef, setComponentHeight]);

	return (
		<div className={`relative ${expanded ? 'w-full ' : ' '}${className}`}>
			{shown && location == OverlayLocation.Top && (
				<div
					className='absolute bottom-0 origin-top'
					style={{ marginBottom: componentHeight + 8, zIndex }}>
					{overlayComponent}
				</div>
			)}
			<div className={expanded ? 'w-full' : ''} ref={childRef}>
				{children}
			</div>
			{shown && location == OverlayLocation.Bottom && (
				<div className='absolute z-10 mt-[0.5rem]'>{overlayComponent}</div>
			)}
		</div>
	);
};

export default Overlay;
