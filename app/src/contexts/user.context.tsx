'use client';

import { createContext, ReactNode, useState } from 'react';
import { User } from '@/models/user/user';

export interface UserContextDefinition {
	user?: User | undefined;
	setUser?(user?: User): void;
}

export const UserContext = createContext<UserContextDefinition>({});

export const UserContextProvider = ({
	children,
	defaultUser,
}: {
	children: ReactNode;
	defaultUser?: User;
}) => {
	const [user, setUser] = useState<User | undefined>(defaultUser);

	return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
