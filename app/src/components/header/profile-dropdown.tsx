import { User } from '@/models/user/user';
import Overlay from '@/components/overlay';
import { useRef, useState } from 'react';
import Button from '@/components/button/button';
import { ButtonSize, ButtonStyle } from '@/components/button/button.styles';
import Avatar from '@/components/avatar/avatar';
import IcArrowDown from '@/assets/svg/icons/ic_arrow_down.svg';
import IcProfile from '@/assets/svg/icons/ic_profile.svg';
import IcLogout from '@/assets/svg/icons/ic_logout.svg';
import Container from '@/components/container/container';
import { ContainerStyle } from '@/components/container/container.styles';
import { useTranslations } from 'next-intl';
import { TRANSLATION_HEADER_LOGOUT, TRANSLATION_HEADER_PROFILE } from '@/translation-keys';
import { useRouter } from '@/navigation';
import OrdersContainer from '@/components/header/orders-container';
import { useOnClickOutside } from 'usehooks-ts';

type Props = {
	user: User;
	disabled?: boolean;
	expanded?: boolean;
	className?: string;
	onLogout?(): void;
};

const ProfileDropdown = ({
	user,
	onLogout,
	className = '',
	disabled = false,
	expanded = false,
}: Props) => {
	const [isShown, setShown] = useState(false);

	const { push } = useRouter();

	const contentRef = useRef<HTMLDivElement>(null);
	const buttonContentRef = useRef<HTMLDivElement>(null);

	useOnClickOutside(buttonContentRef, () => setShown(false));

	const onRedirectRoute = (redirectTo: string) => {
		setShown(false);

		push(redirectTo);
	};

	if (!user) {
		return;
	}

	return (
		<div
			ref={buttonContentRef}
			className={className}
			style={{ width: expanded ? '100%' : undefined }}>
			<Overlay
				expanded={expanded}
				shown={isShown}
				overlayComponent={
					<OverlayContent
						user={user}
						contentWidth={contentRef?.current?.clientWidth ?? 0}
						onLogout={onLogout}
						onClose={onRedirectRoute}
					/>
				}>
				<Button
					expanded={expanded}
					buttonStyle={ButtonStyle.Transparent}
					buttonSize={ButtonSize.None}
					onClick={() => setShown(!isShown)}
					disabled={disabled}>
					<div
						ref={contentRef}
						className='flex flex-row items-center justify-start'
						style={{ width: expanded ? '100%' : undefined }}>
						<Avatar name={user.userName} className='me-3 shrink-0' />
						<div
							className='flex flex-col truncate text-start text-sm'
							style={{
								maxWidth: expanded ? undefined : '14rem',
								width: expanded ? '100%' : undefined,
							}}>
							<p className='w-full truncate font-bold'>{user.userName}</p>
							<p className='w-full truncate'>{user.email}</p>
						</div>
						{!disabled && <IcArrowDown className='ms-3' />}
					</div>
				</Button>
			</Overlay>
		</div>
	);
};

const OverlayContent = ({
	user,
	contentWidth = 0,
	onClose,
	onLogout,
}: {
	user: User;
	contentWidth?: number;
	onClose?(redirectTo?: string): void;
	onLogout?(): void;
}) => {
	const t = useTranslations();

	return (
		<Container
			containerStyle={ContainerStyle.Basic}
			className='flex w-full flex-col bg-accent px-4 py-[0.62rem]'
			style={{ minWidth: contentWidth < 250 ? 250 : contentWidth }}>
			<Button
				buttonStyle={ButtonStyle.Text}
				buttonSize={ButtonSize.None}
				onClick={() => onClose?.('/user/profile')}
				className='mb-2 flex flex-row items-center !justify-start p-3 !font-medium'>
				<IcProfile className='me-3' />
				<span>{t(TRANSLATION_HEADER_PROFILE)}</span>
			</Button>
			<OrdersContainer
				className='mb-2'
				user={user}
				onOrdersPress={() => onClose?.('/user/orders')}
			/>
			<Button
				buttonStyle={ButtonStyle.Text}
				buttonSize={ButtonSize.None}
				onClick={onLogout}
				className='flex flex-row items-center !justify-start p-3 !font-medium'>
				<IcLogout className='me-3' />
				<span>{t(TRANSLATION_HEADER_LOGOUT)}</span>
			</Button>
		</Container>
	);
};

export default ProfileDropdown;
