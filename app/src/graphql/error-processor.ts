import { ApolloError } from '@apollo/client';

export const getFieldError = (
	error: ApolloError | undefined,
	field: string,
): string | undefined => {
	if (error == null) {
		return;
	}

	return error?.graphQLErrors?.find((e) => e.extensions?.field === field)?.message;
};
