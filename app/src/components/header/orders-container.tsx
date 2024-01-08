import { ContainerStyle } from '@/components/container/container.styles';
import {
	TRANSLATION_HEADER_VIDEOS_ON_WORK,
	TRANSLATION_ORDERS_GO_TO_ORDERS,
} from '@/translation-keys';
import Button from '@/components/button/button';
import { ButtonStyle } from '@/components/button/button.styles';
import Container from '@/components/container/container';
import { useTranslations } from 'next-intl';
import { User } from '@/models/user/user';

type Props = {
	user: User;
	onOrdersPress?(): void;
	className?: string;
};

const OrdersContainer = ({ onOrdersPress, className = '' }: Props) => {
	const t = useTranslations();

	return (
		<Container
			containerStyle={ContainerStyle.Accent}
			className={`w-full px-2 py-6${className?.trim().length > 0 ? ` ${className}` : ''}`}>
			<p className='mb-4 text-sm font-medium'>
				{t(TRANSLATION_HEADER_VIDEOS_ON_WORK, { count: 0 })}
			</p>
			<Button expanded buttonStyle={ButtonStyle.Outlined} onClick={onOrdersPress}>
				<span>{t(TRANSLATION_ORDERS_GO_TO_ORDERS)}</span>
			</Button>
		</Container>
	);
};

export default OrdersContainer;
