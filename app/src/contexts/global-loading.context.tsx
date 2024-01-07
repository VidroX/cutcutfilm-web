'use client';

import { createContext, ReactNode, useState } from 'react';

export interface GlobalLoadingContextDefinition {
	loading?: boolean;
	setLoading?(loading?: boolean): void;
}

export const GlobalLoadingContext = createContext<GlobalLoadingContextDefinition>({});

export const GlobalLoadingContextProvider = ({ children }: { children: ReactNode }) => {
	const [loading, setLoading] = useState<boolean | undefined>(false);

	return (
		<GlobalLoadingContext.Provider value={{ loading, setLoading }}>
			{children}
		</GlobalLoadingContext.Provider>
	);
};
