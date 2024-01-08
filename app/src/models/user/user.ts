import { Permission } from '@/models/user/permission';

export interface User {
	id: string;
	email: string;
	userName: string;
	permissions: Permission[];
}
