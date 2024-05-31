import { clearAll } from '@/lib/utils';
import { AppDispatch, useAppSelector } from '@/state';
import { setAuthenticated } from '@/state/reducers/authReducer';
import { BellOutlined, DownOutlined } from '@ant-design/icons';
import { faBars, faPowerOff, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Dropdown, Space } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import NavMenu, { NavMenuItem } from './navMenu';

export type NavBarProps = {
  toggle: () => void;
};

const items = [
  {
    key: '1',
    label: <span>Find a Job (Individual)</span>,
  },
];

const Navbar = ({ toggle }: NavBarProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navItems: NavMenuItem[] = [
    {
      name: 'Log Out',
      icon: faPowerOff,
      onClick: () => {
        clearAll();
        dispatch(setAuthenticated(false));
      },
    },
  ];

  const dispatch = useDispatch<AppDispatch>();
  const handleClickLogin = () => {
    dispatch(setAuthenticated(true));
  };

  const isAuthenticated = useAppSelector(state => state.authReducer.isAuthed);
  const userData = useAppSelector(state => state.userReducer.user);

  return (
    <div className="z-10 absolute shadow top-0 h-[70px] py-4 w-full bg-white">
      <div className="px-4 relative flex flex-row h-full w-full items-center justify-between md:justify-start">
        <div className="cursor-pointer p-2" onClick={toggle}>
          <FontAwesomeIcon icon={faBars} style={{ height: 16 }} />
        </div>

        <div className="absolute right-8 flex flex-row">
          {!isAuthenticated && (
            <button className="px-4 py-2 border rounded-full hover:bg-gray-100 uppercase" onClick={handleClickLogin}>
              Login
            </button>
          )}

          {isAuthenticated && (
            <div className="flex h-full items-center text-sm">
              <Dropdown className="mr-8 border border-gray-400 hover:border-blue-primary rounded px-4 py-2" menu={{ items }} trigger={['click']}>
                <a onClick={e => e.preventDefault()}>
                  <Space>
                    {items[0].label}
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>

              <Button icon={<BellOutlined />} shape="circle" className="mr-8"></Button>

              {userData && <span className="mr-8">{userData.email}</span>}

              <button className="w-10 h-10 flex justify-center items-center border rounded-full hover:bg-gray-100 uppercase" onClick={() => setIsOpen(true)}>
                <FontAwesomeIcon icon={faUser} style={{ width: 16, height: 16 }} />
              </button>

              {isOpen && <NavMenu open={isOpen} menuItems={navItems} toggleOpen={value => setIsOpen(value)} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
