'use client';
import { checkSession } from '@/lib/api';
import { getToken } from '@/lib/utils';
import { AppDispatch, useAppSelector } from '@/state';
import { setAuthenticated } from '@/state/reducers/authReducer';
import { User, setUser } from '@/state/reducers/project';
import { HomeOutlined, ProjectOutlined, ReconciliationOutlined, ShoppingOutlined, WalletOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import { NotificationPlacement } from 'antd/es/notification/interface';
import { redirect, usePathname, useRouter } from 'next/navigation';
import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { IMenuItem } from '../navigation/menu-item';
import Navbar from '../navigation/navbar';
import AuthNavbar from '../navigation/navbar/authNavbar';
import SideBar from '../navigation/sidebar/intex';
import Loading from './loading';
const Context = React.createContext({ name: 'Default' });

const sidbarMenu: IMenuItem[] = [
  {
    name: 'Home',
    link: '/mktp/home',
    icon: HomeOutlined,
    visible: true,
  },
  {
    name: 'My Company',
    link: '/mktp/companies',
    icon: ReconciliationOutlined,
    visible: true,
  },
  {
    name: 'My Projects',
    link: '/mktp/projects',
    icon: ProjectOutlined,
    visible: true,
  },
  {
    name: 'My jobs',
    link: '/mktp/jobs',
    icon: ShoppingOutlined,
    visible: true,
  },
  {
    name: 'Wallet',
    link: '/mktp/wallet',
    icon: WalletOutlined,
    visible: true,
  },
];

export default function Container({ children }: { children: React.ReactNode }) {
  const [api, contextHolder] = notification.useNotification();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState('N/A');
  const isAuthenticated = useAppSelector(state => state.authReducer.isAuthed);
  const user = useAppSelector(state => state.userReducer.user);

  const contextValue = useMemo(() => ({ name: 'Ant Design' }), []);

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const path = usePathname();

  const openNotification = (message: string, placement: NotificationPlacement) => {
    api.info({
      message: message,
      placement,
    });
  };

  const initSockets = (token: string) => {
    const socket = io('http://localhost:3001', { query: { token } });

    const onMessage = (message: string) => {
      openNotification(message, 'topRight');
    };

    const onConnect = () => {
      console.log('socket connected');
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);
      socket.io.engine.on('upgrade', transport => {
        setTransport(transport.name);
      });
    };

    const onDisconnect = () => {
      setIsConnected(false);
      setTransport('N/A');
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('my_message', onMessage);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  };

  const checkToken = async function () {
    const token = getToken();
    if (token) {
      const result = await checkSession(token);
      const { isValid, user } = result;
      if (isValid) {
        dispatch(setAuthenticated(true));
        dispatch(setUser(new User(user)));
        if (path === '/') {
          router.push('mktp/home');
        }
        initSockets(token);
      }
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      checkToken();
    }
  }, [isAuthenticated, dispatch]);

  if (!isAuthenticated) {
    if (path !== '/' && !path.includes('auth')) {
      redirect('/');
    }
  }

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      {isAuthenticated && (
        <>
          <SideBar isOpen={isOpen} menuItems={sidbarMenu} toggle={() => setIsOpen(!isOpen)} />
          <div id="scroller" className={`fixed right-0 top-0 bottom-0 transition-all duration-[300ms] ${!isOpen ? 'left-[80px]' : 'left-[300px]'} overflow-y-auto overflow-x-hidden scroll-smooth xl:snap-mandatory xl:snap-y bg-white`}>
            <Navbar toggle={() => setIsOpen(!isOpen)} />
            <div className="absolute left-0 right-0 top-[70px] z-0 bottom-0 p-4 bg-gray-200">{path.includes('mktp') && <Suspense fallback={<Loading />}>{children}</Suspense>}</div>
          </div>
        </>
      )}

      {!isAuthenticated && (
        <>
          <div className="fixed left-0 right-0 top-0 bottom-0">
            <AuthNavbar />
            {!path.includes('mktp') && <div className="absolute left-0 right-0 top-[90px] bottom-0 overflow-y-auto overflow-x-hidden scroll-smooth">{children}</div>}
          </div>
        </>
      )}
    </Context.Provider>
  );
}
