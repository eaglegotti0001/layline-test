import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon';

export type IMenuItem = {
  name: string;
  link: string;
  icon?: React.ForwardRefExoticComponent<Omit<AntdIconProps, 'ref'> & React.RefAttributes<HTMLSpanElement>>;
  newWindow?: boolean;
  visible?: boolean;
};
