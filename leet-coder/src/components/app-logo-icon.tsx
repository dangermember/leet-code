import type { SVGAttributes } from 'react';
import Logo from '@/app/assets/images/logo.svg'

export default function AppLogoIcon(props: Readonly<SVGAttributes<SVGElement>>) {
    return <Logo {...props} />;
}
