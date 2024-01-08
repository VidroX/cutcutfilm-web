import { ReactNode, useMemo } from 'react';
import { grotesque } from '@/app/fonts';

type Props = {
	id?: string;
	label?: string;
	hint?: string;
	type?: 'text' | 'password' | 'number' | 'email';
	prefix?: ReactNode;
	alternativeShadow?: boolean;
	className?: string;
	required?: boolean;
	error?: string;
	value?: string;
	onValueChange?(newValue: string): void;
};

const TextField = ({
	id,
	label,
	value,
	onValueChange,
	hint = '',
	type = 'text',
	alternativeShadow = false,
	prefix,
	className,
	required,
	error,
}: Props) => {
	const startPadding = useMemo(() => {
		if (prefix == null) {
			return '1.25rem';
		}

		return '3.12rem';
	}, [prefix]);

	const borderClass = useMemo(() => {
		if (error == null) {
			return 'border-black';
		}

		return 'border-error';
	}, [error]);

	return (
		<>
			<div className={`flex flex-col w-full${className ? ` ${className}` : ''}`}>
				{label && <label htmlFor={id}>{label}</label>}
				<div className='relative flex w-full'>
					{prefix && (
						<div className='absolute bottom-0 start-0 top-0 ms-[1.25rem] flex h-full max-w-[1.25rem] flex-col items-center justify-center overflow-hidden'>
							{prefix}
						</div>
					)}
					<input
						id={id}
						value={value}
						onChange={(e) => onValueChange?.(e.target.value ?? '')}
						className={`${
							grotesque.className
						} transition-150 w-full appearance-none rounded-input ${borderClass} py-[0.8125rem] pe-[1.25rem] placeholder-black-400 outline-none !ring-0 transition-shadow focus:border-black focus:shadow-input ${
							alternativeShadow ? 'focus:shadow-secondary-400' : 'focus:shadow-blue'
						}`}
						style={{
							paddingInlineStart: startPadding,
						}}
						type={type}
						placeholder={hint}
						required={required}
					/>
				</div>
				{error && <div className='mx-4 mt-1 text-error'>{error}</div>}
			</div>
		</>
	);
};

export default TextField;
