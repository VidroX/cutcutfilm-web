import { Constants } from '@/constants';
import { useMediaQuery } from 'usehooks-ts';

export enum ScreenSize {
	Small = Constants.breakpoints.small,
	Medium = Constants.breakpoints.medium,
	Large = Constants.breakpoints.large,
	ExtraLarge = Constants.breakpoints.extraLarge,
	DoubleExtraLarge = Constants.breakpoints['2xl'],
}

export default function useBreakpoints(
	screenSize: ScreenSize = ScreenSize.Medium,
	minWidthMode = true,
): boolean {
	return useMediaQuery(
		`(${minWidthMode ? 'min-width' : 'max-width'}: ${screenSize - (minWidthMode ? 0 : 1)}px)`,
	);
}
