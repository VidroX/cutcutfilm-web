export enum LogoStyle {
	Primary,
}

interface LogoStyleColors {
	iconColor: string;
	textColor: string;
	outlineColor: string;
}

const styleMap: Record<LogoStyle, LogoStyleColors> = {
	[LogoStyle.Primary]: {
		textColor: 'hsl(var(--twc-text-primary))',
		iconColor: 'hsl(var(--twc-secondary))',
		outlineColor: 'hsl(var(--twc-primary))',
	},
};

const getStyle = (logoStyle: LogoStyle): LogoStyleColors => styleMap[logoStyle];

export const LogoStyles = {
	getStyle,
};
