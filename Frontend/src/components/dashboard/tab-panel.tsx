import React, { useEffect } from 'react';

type Props = {
  index: number;
  selected: number;
  children: React.ReactNode;
};
export default function TabPanel({ index, selected, children }: Props) {
  useEffect(() => {}, [selected]);

  return <>{index === selected && <div className="w-full h-full overflow-hidden">{children}</div>}</>;
}
