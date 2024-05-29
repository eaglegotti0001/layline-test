'use client';
import logoImg from '@/assets/svg/logo.svg';
import logoMiniImg from '@/assets/images/logo.png';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type Props = {
  isOpen: boolean;
  size?: 'sm' | 'md' | 'lg';
};

const Logo = ({ isOpen, size = 'md' }: Props) => {
  const [height, setHeight] = useState('h-[36px]');

  useEffect(() => {
    const classHeight = size === 'sm' ? 'h-[36px]' : size === 'lg' ? 'h-[54px]' : 'h-[48px]';
    setHeight(classHeight);
  }, [isOpen, size]);

  return (
    <div className={`w-full flex items-center justify-center ${height}`}>
      {isOpen && (
        <div className="h-14 flex flex-row items-center pt-2">
          <Image src={logoMiniImg} className="mr-4" style={{ width: 'auto', height: '100%', objectFit: 'cover' }} alt="Logo" />
          <Image src={logoImg} style={{ width: 'auto', height: '24px', objectFit: 'cover' }} alt="Logo" />
        </div>
      )}
      {!isOpen && <Image src={logoMiniImg} style={{ width: 'auto', height: '100%', objectFit: 'cover' }} alt="Logo" />}
    </div>
  );
};

export default Logo;
