type Props = {
	color?: string;
	className?: string;
};

const Divider = ({ className, color = 'hsl(var(--twc-black))' }: Props) => {
	return (
		<div
			className={`h-[1px] w-full${className ? ` ${className}` : ''}`}
			style={{ background: color }}
		/>
	);
};

export default Divider;
