import { ReactNode, useMemo } from 'react';
import { CheckboxSize, CheckboxStyle, CheckboxStyles } from '@/components/checkbox/checkbox.styles';

type Props = {
	id: string;
	checkboxStyle?: CheckboxStyle;
	checkboxSize?: CheckboxSize;
	textChild?: ReactNode;
	className?: string;
	disabled?: boolean;
	onClick?(): void;
	value?: boolean;
	onValueChange?(newValue: boolean): void;
	required?: boolean;
	error?: string;
};

const Checkbox = ({
	id,
	textChild,
	value,
	onValueChange,
	className = '',
	disabled = false,
	checkboxStyle = CheckboxStyle.Primary,
	checkboxSize = CheckboxSize.Medium,
	onClick,
	required,
	error,
}: Props) => {
	const styles = useMemo(
		() => CheckboxStyles.composeStyles(checkboxStyle, checkboxSize),
		[checkboxSize, checkboxStyle],
	);

	return (
		<div className={`flex flex-col ${className ? ` ${className}` : ''}`}>
			<div className='flex w-full flex-row items-start'>
				<input
					id={id}
					checked={value}
					onClick={!disabled ? onClick : undefined}
					disabled={disabled}
					className={`${styles}${textChild != null ? ' mt-1' : ''}`}
					onChange={!disabled ? (e) => onValueChange?.(e.target.checked ?? false) : undefined}
					type='checkbox'
					required={required}
				/>
				{textChild && (
					<label className='cursor-pointer select-none ps-4' htmlFor={id}>
						{textChild}
					</label>
				)}
			</div>
			{error && <div className='mx-4 mt-1 text-error'>{error}</div>}
		</div>
	);
};

export default Checkbox;
