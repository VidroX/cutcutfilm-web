import { gql } from '@apollo/client';
import { User } from '@/models/user/user';
import { Token } from '@/models/user/token';

export const LOGIN_MUTATION = gql`
	mutation Login($credential: String!, $password: String!) {
		login(credential: $credential, password: $password) {
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

export interface LoginMutationResponse {
	login: {
		user: User;
		accessToken: Token;
		refreshToken: Token;
	};
}

export interface LoginMutationVariables {
	credential: string;
	password: string;
}
