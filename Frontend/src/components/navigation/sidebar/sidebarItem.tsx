'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IMenuItem } from '../menu-item';
interface Props {
  menu: IMenuItem;
  isOpen?: boolean;
  mode?: 'Nav' | 'Menu';
  onClick: () => void;
}

const SidebarItem = ({ menu, isOpen = true }: Props) => {
  const pathname = usePathname();

  return (
    <Link
      href={menu.link}
      className={`flex flex-row justify-start items-center hover:text-blue-primary hover:bg-gray-100 cursor-pointer w-full h-14 my-1 break-normal text-nowrap ${isOpen ? 'px-10' : 'px-0'} 
      ${pathname === menu.link ? 'bg-light-primary text-blue-primary rounded' : ''}`}
    >
      {isOpen && (
        <div className="flex w-full h-full items-center">
          {menu.icon && <menu.icon />}
          <span className="text-sm ml-4">{menu.name}</span>
        </div>
      )}

      {!isOpen && (
        <div data-tooltip={menu.name} className="flex w-full h-full items-center justify-center">
          {menu.icon && <menu.icon />}
        </div>
      )}
    </Link>
  );
};

export default SidebarItem;
