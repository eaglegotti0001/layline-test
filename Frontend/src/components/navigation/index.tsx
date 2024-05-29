'use client';
import Navbar, { NavBarProps } from './navbar';

const Navigation = ({ toggle }: NavBarProps) => {
  return <Navbar toggle={toggle} />;
};

export default Navigation;
