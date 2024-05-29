import logoMiniImg from '@/assets/images/logo.png';
import { Button } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { IMenuItem } from '../menu-item';

export type NavBarProps = {
  menuItems?: IMenuItem[];
  toggle: () => void;
};

export default function AuthNavbar() {
  return (
    <div className="z-10 fixed shadow top-0 h-[90px] py-4 w-full bg-white">
      <div className="container mx-auto">
        <div className="flex h-full w-full items-center justify-between">
          <div className="h-14 flex flex-row items-center pt-2">
            <Image src={logoMiniImg} className="mr-2" style={{ width: 'auto', height: '100%', objectFit: 'cover' }} alt="Logo" />
            <span className="text-2xl font-semibold">LayLine</span>
          </div>

          <div className="flex flex-row">
            <Link href={'/auth/login'} className="mr-2">
              <Button size="large" type="primary">
                Sign In
              </Button>
            </Link>

            <Link href={'/auth/register'}>
              <Button size="large">Sign Up</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
