import { useContext, useEffect } from 'react';
import { GlobalLoadingContext } from '@/contexts/global-loading.context';

export default function useGlobalLoading(loading: boolean) {
	const { setLoading } = useContext(GlobalLoadingContext);

	useEffect(() => {
		if (setLoading) {
			setLoading(loading);
		}
	}, [loading, setLoading]);
}
