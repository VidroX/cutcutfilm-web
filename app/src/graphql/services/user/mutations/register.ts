import { gql } from '@apollo/client';
import { User } from '@/models/user/user';
import { Token } from '@/models/user/token';

export const REGISTER_MUTATION = gql`
	mutation Register($userInfo: UserRegistrationInput!) {
		register(userInfo: $userInfo) {
			user {
				email
				id
				userName
				permissions {
					action
					description
				}
			}
			accessToken {
				token
				type
			}
			refreshToken {
				token
				type
			}
		}
	}
`;

export interface RegisterMutationResponse {
	register: {
		user: User;
		accessToken: Token;
		refreshToken: Token;
	};
}

export interface RegisterMutationVariables {
	userInfo: {
		email: string;
		password: string;
		userName: string;
	};
}
