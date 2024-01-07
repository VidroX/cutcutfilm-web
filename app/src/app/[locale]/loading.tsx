import Spinner from '@/components/spinner';

export default async function Loading() {
	return (
		<div className='absolute bottom-0 end-0 start-0 top-0 flex h-full w-full items-center justify-center'>
			<Spinner size={64} />
		</div>
	);
}
