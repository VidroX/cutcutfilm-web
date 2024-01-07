import { gql } from '@apollo/client';
import { Token } from '@/models/user/token';

export const REFRESH_ACCESS_TOKEN_QUERY = gql`
	query RefreshAccessToken {
		refreshAccessToken {
			token
			type
		}
	}
`;

export interface RefreshAccessTokenQueryResponse {
	refreshAccessToken?: Token;
}
