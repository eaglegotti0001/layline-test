import { IMenuItem } from '../menu-item';
import Logo from '../navbar/Logo';
import SidebarItem from './sidebarItem';
type Props = {
  isOpen: boolean;
  menuItems: IMenuItem[];
  toggle: () => void;
};

const SideBar = ({ isOpen, menuItems, toggle }: Props) => {
  return (
    <div className={`flex-col fixed transition-all duration-[300ms] left-0 ${isOpen ? 'w-[300px]' : 'w-[80px]'} z-[100] h-full justify-start bg-white drop-shadow-md`}>
      <div className="flex flex-row justify-between items-center w-full h-[71px] mb-4 px-4 py-6 border-b">
        <Logo isOpen={isOpen} />
      </div>
      <div className="relative flex flex-col w-full px-2">{menuItems.map((item, index) => item.visible && <SidebarItem key={index} menu={item} isOpen={isOpen} onClick={toggle} />)}</div>
    </div>
  );
};

export default SideBar;
