'use client';
import React from 'react';
import { useInView } from 'react-intersection-observer';

type Props = {
  id: string;
  classes?: string;
  children: React.ReactNode;
};

export default function ScrollSection({ id, classes, children }: Props) {
  const { ref: magicSectionRef } = useInView();

  return (
    <div id={id} className={`xl:snap-center flex w-full ${classes ? classes : 'bg-white'}`}>
      <div ref={magicSectionRef} className="relative container mx-auto px-4 pb-16 2xl:h-full">
        {children}
      </div>
    </div>
  );
}
