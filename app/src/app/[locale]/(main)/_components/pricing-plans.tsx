import { mergeClasses } from '@/utils/classname-utils';

type Props = { className?: string };

const PricingPlans = ({ className }: Props) => {
	return <div className={mergeClasses(className)}></div>;
};

export default PricingPlans;
