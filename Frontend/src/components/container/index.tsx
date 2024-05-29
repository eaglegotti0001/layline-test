'use client';
import { useAppSelector } from '@/state';
import { HomeOutlined, LogoutOutlined, ProjectOutlined, ReconciliationOutlined, ShoppingOutlined, WalletOutlined } from '@ant-design/icons';
import { redirect, usePathname } from 'next/navigation';
import React, { Suspense, useState } from 'react';
import Navigation from '../navigation';
import { IMenuItem } from '../navigation/menu-item';
import AuthNavbar from '../navigation/navbar/authNavbar';
import SideBar from '../navigation/sidebar/intex';
import Loading from './loading';

const sidbarMenu: IMenuItem[] = [
  {
    name: 'Home',
    link: '/mktp/home',
    color: 'border-green-500',
    icon: HomeOutlined,
    visible: true,
  },
  {
    name: 'My Company',
    link: '/mktp/companies',
    icon: ReconciliationOutlined,
    color: 'border-green-500',
    visible: true,
  },
  {
    name: 'My Projects',
    link: '/mktp/projects',
    icon: ProjectOutlined,
    color: 'border-green-500',
    visible: true,
  },
  {
    name: 'My Openings',
    link: '/mktp/jobs',
    color: 'border-green-500',
    icon: ShoppingOutlined,
    visible: true,
  },
  {
    name: 'Wallet',
    link: '/mktp/wallet',
    color: 'border-green-500',
    icon: WalletOutlined,
    visible: true,
  },
];

export default function Container({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const isAuthenticated = useAppSelector(state => state.authReducer.isAuthed);

  if (!isAuthenticated) {
    const path = usePathname();
    if (path !== '/' && !path.includes('auth')) {
      redirect('/');
    }
  }

  return (
    <>
      {isAuthenticated && (
        <>
          <SideBar isOpen={isOpen} menuItems={sidbarMenu} toggle={() => setIsOpen(!isOpen)} />
          <div id="scroller" className={`fixed right-0 top-0 bottom-0 transition-all duration-[300ms] ${!isOpen ? 'left-[80px]' : 'left-[300px]'} overflow-y-auto overflow-x-hidden scroll-smooth xl:snap-mandatory xl:snap-y bg-white`}>
            <Navigation toggle={() => setIsOpen(!isOpen)} />
            <div className="absolute left-0 right-0 top-[70px] z-0 bottom-0 p-4 bg-gray-200">
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </div>
          </div>
        </>
      )}

      {!isAuthenticated && (
        <>
          <div className="fixed left-0 right-0 top-0 bottom-0">
            <AuthNavbar />
            <div className="absolute left-0 right-0 top-[90px] bottom-0 overflow-y-auto overflow-x-hidden scroll-smooth">{children}</div>
          </div>
        </>
      )}
    </>
  );
}
