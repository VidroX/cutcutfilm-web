import { User } from '@/models/user/user';
import { useContext } from 'react';
import { UserContext } from '@/contexts/user.context';

export default function useUser(): User | undefined {
	const { user } = useContext(UserContext);

	return user;
}
