'use client';

import CutcutfilmLogo from '@/components/cutcutfilm-logo/cutcutfilm-logo';
import Button from '@/components/button/button';
import { useTranslations } from 'next-intl';
import Cursor from '@/assets/svg/cursor.svg';
import Link from '@/components/link/link';
import { Link as NextLink, useRouter } from '@/navigation';
import { ButtonSize, ButtonStyle } from '@/components/button/button.styles';
import { useContext, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import AnimatedIcMenu from '@/assets/animated-svg/icons/ic_menu';
import AnimatedIcClose from '@/assets/animated-svg/icons/ic_close';
import {
	TRANSLATION_AUTH_LOGIN_ACTION,
	TRANSLATION_HEADER_ABOUT_SERVICE,
	TRANSLATION_HEADER_FAQ,
	TRANSLATION_HEADER_LOGOUT,
	TRANSLATION_HEADER_ORDERS,
	TRANSLATION_HEADER_PORTFOLIO,
	TRANSLATION_HEADER_PRICE,
	TRANSLATION_HEADER_PROFILE,
	TRANSLATION_MAIN_ORDER_VIDEO,
} from '@/translation-keys';
import { HeaderType } from '@/models/header-type';
import useUser from '@/hooks/use-user';
import ProfileDropdown from '@/components/header/profile-dropdown';
import IcProfile from '@/assets/svg/icons/ic_profile.svg';
import IcLogout from '@/assets/svg/icons/ic_logout.svg';
import { useMutation } from '@apollo/client';
import { LOGOUT_MUTATION, LogoutMutationResponse } from '@/graphql/services/user/mutations/logout';
import { UserContext } from '@/contexts/user.context';
import useGlobalLoading from '@/hooks/use-global-loading';
import OrdersContainer from '@/components/header/orders-container';

const Header = ({ headerType = HeaderType.None }: { headerType?: HeaderType }) => {
	if (headerType === HeaderType.None) {
		return <></>;
	}

	if (headerType === HeaderType.Basic) {
		return <BasicHeader />;
	}

	return <FullHeader />;
};

const BasicHeader = () => {
	return (
		<header>
			<div className='border-b border-b-black bg-accent-200 px-5'>
				<div className='container mx-auto flex flex-row items-center justify-center pb-5 pt-6 duration-100'>
					<NextLink href='/'>
						<CutcutfilmLogo />
					</NextLink>
				</div>
			</div>
		</header>
	);
};

interface MenuItem {
	name: string;
	href: string;
}

const FullHeader = () => {
	const { setUser } = useContext(UserContext);

	const [logout, { loading }] = useMutation<LogoutMutationResponse>(LOGOUT_MUTATION);

	useGlobalLoading(loading);

	const [isExpanded, setExpanded] = useState(false);

	const t = useTranslations();

	const { push, replace } = useRouter();

	const [headerHeight, setHeaderHeight] = useState(0);
	const ref = useRef<HTMLDivElement>(null);

	const user = useUser();

	useLayoutEffect(() => {
		setHeaderHeight(((ref.current?.clientHeight ?? 0) + 1) / 16);
	}, [ref.current?.clientHeight]);

	const menuItems = useMemo((): MenuItem[] => {
		if (user) {
			return [
				{
					name: t(TRANSLATION_HEADER_ABOUT_SERVICE),
					href: '#',
				},
				{
					name: t(TRANSLATION_HEADER_ORDERS),
					href: '/user/orders',
				},
				{
					name: t(TRANSLATION_HEADER_PRICE),
					href: '#',
				},
				{
					name: t(TRANSLATION_HEADER_FAQ),
					href: '#',
				},
			];
		}

		return [
			{
				name: t(TRANSLATION_HEADER_PORTFOLIO),
				href: '/portfolio',
			},
			{
				name: t(TRANSLATION_HEADER_ABOUT_SERVICE),
				href: '#',
			},
			{
				name: t(TRANSLATION_HEADER_PRICE),
				href: '#',
			},
			{
				name: t(TRANSLATION_HEADER_FAQ),
				href: '#',
			},
		];
	}, [t, user]);

	const onLogout = async () => {
		try {
			setExpanded(false);
			await logout();
			setUser?.(undefined);
			replace('/');
		} catch (e) {
			if (process.env.NEXT_PUBLIC_DEBUG) {
				console.error('Unable to logout', e);
			}
		}
	};

	const navigateToPath = (path: string) => {
		setExpanded(false);

		push(path);
	};

	return (
		<header>
			<div
				ref={ref}
				className={`border-b bg-background-50 px-5 lg:border-b-accent${
					isExpanded ? ' border-b-black' : ''
				}`}>
				<div className='container mx-auto flex flex-row items-center justify-between pb-5 pt-6 duration-100'>
					<NextLink onClick={() => setExpanded(false)} href='/' className='me-4'>
						<CutcutfilmLogo />
					</NextLink>
					<div className='hidden flex-row lg:flex'>
						{menuItems.map((item, index) => (
							<Link
								key={`web-menu-link-${index}`}
								onClick={() => setExpanded(false)}
								href={item.href}
								className={index === menuItems.length - 1 ? '' : 'me-10'}>
								{item.name}
							</Link>
						))}
					</div>
					<div className='hidden flex-row lg:flex'>
						{!user && (
							<>
								<Button
									buttonStyle={ButtonStyle.Text}
									className='me-2'
									onClick={() => push('/auth/login')}>
									{t(TRANSLATION_AUTH_LOGIN_ACTION)}
								</Button>
								<Button className='flex flex-row items-center'>
									<span className='me-2'>{t(TRANSLATION_MAIN_ORDER_VIDEO)}</span>
									<Cursor />
								</Button>
							</>
						)}
						{user && <ProfileDropdown user={user} onLogout={onLogout} />}
					</div>
					<MenuButton isExpanded={isExpanded} onClick={setExpanded} />
				</div>
			</div>
			<AnimatePresence initial={false}>
				{isExpanded && (
					<motion.div
						initial='collapsed'
						animate='open'
						exit='collapsed'
						variants={{
							open: { opacity: 1 },
							collapsed: { opacity: 0 },
						}}
						transition={{ duration: 0.1 }}
						style={{
							top: `${headerHeight}rem`,
						}}
						className='absolute bottom-0 left-0 right-0 z-40 flex w-full flex-col bg-background px-5 lg:hidden'>
						<div className='container mx-auto flex flex-col items-center py-5 duration-100'>
							{user && (
								<>
									<Button
										expanded
										buttonStyle={ButtonStyle.Text}
										buttonSize={ButtonSize.None}
										onClick={() => navigateToPath('/user/profile')}
										className='mb-9 flex flex-row items-center !justify-start p-small !font-medium'>
										<IcProfile className='me-3' />
										<span>{t(TRANSLATION_HEADER_PROFILE)}</span>
									</Button>
									<ProfileDropdown expanded user={user} disabled={true} className='mb-9' />
									<OrdersContainer
										className='mb-9'
										user={user}
										onOrdersPress={() => navigateToPath('/user/orders')}
									/>
								</>
							)}
							{menuItems.map((item, index) => (
								<Link
									key={`web-menu-link-${index}`}
									href={item.href}
									onClick={() => setExpanded(false)}
									className={
										index === menuItems.length - 1
											? `mb-9 w-full py-small ${user ? 'px-4' : 'px-small'}`
											: `mb-small w-full py-small ${user ? 'px-4' : 'px-small'}`
									}>
									{item.name}
								</Link>
							))}
							{!user && (
								<>
									<Button
										expanded
										buttonStyle={ButtonStyle.Text}
										className='mb-6 items-start text-start'
										onClick={() => navigateToPath('/auth/login')}>
										{t(TRANSLATION_AUTH_LOGIN_ACTION)}
									</Button>
									<Button expanded className='flex flex-row items-center'>
										<span className='me-2'>{t(TRANSLATION_MAIN_ORDER_VIDEO)}</span>
										<Cursor />
									</Button>
								</>
							)}
							{user && (
								<Button
									expanded
									buttonStyle={ButtonStyle.Text}
									buttonSize={ButtonSize.None}
									onClick={onLogout}
									className='flex flex-row items-center !justify-start p-small !font-medium'>
									<IcLogout className='me-3' />
									<span>{t(TRANSLATION_HEADER_LOGOUT)}</span>
								</Button>
							)}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
};

const MenuButton = ({
	isExpanded = false,
	onClick,
}: {
	isExpanded?: boolean;
	onClick?(isExpanded: boolean): void;
}) => {
	return (
		<Button
			animated
			type='button'
			onClick={() => onClick?.(!isExpanded)}
			buttonSize={ButtonSize.SymmetricSmall}
			buttonStyle={ButtonStyle.Secondary}
			className='flex items-center justify-center lg:hidden'>
			<AnimatePresence initial={false}>
				{isExpanded ? <AnimatedIcClose /> : <AnimatedIcMenu />}
			</AnimatePresence>
		</Button>
	);
};

export default Header;
