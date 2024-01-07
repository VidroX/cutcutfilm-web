import { gql } from '@apollo/client';
import { User } from '@/models/user/user';

export const USER_QUERY = gql`
	query GetUser($userId: String) {
		user(userId: $userId) {
			id
			userName
			email
			permissions {
				action
				description
			}
		}
	}
`;

export interface UserQueryResponse {
	user?: User;
}

export interface UserQueryVariables {
	userId?: string;
}
