import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon';
import Link from 'next/link';

export type IMenuItem = {
  name: string;
  link: string;
  icon?: React.ForwardRefExoticComponent<Omit<AntdIconProps, 'ref'> & React.RefAttributes<HTMLSpanElement>>;
  color?: string;
  newWindow?: boolean;
  visible?: boolean;
};

type Props = {
  menu: IMenuItem;
};
export default function MenuItem({ menu }: Props) {
  return (
    <Link className={`px-1 text-center text-lg ${menu.color || 'text-white'}`} href={menu.link}>
      {menu.name.toUpperCase()}
    </Link>
  );
}
