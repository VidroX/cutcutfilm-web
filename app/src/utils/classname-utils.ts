import { twJoin, twMerge } from 'tailwind-merge';
import { ClassArray, clsx } from 'clsx';

export const mergeClasses = (...input: ClassArray) => twMerge(clsx(input));

export const joinClasses = (...input: ClassArray) => twJoin(clsx(input));
