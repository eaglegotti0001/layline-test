'use client';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'flowbite-react';

type Prop = {
  title: string;
};

export default function PaperActivity({ title }: Prop) {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChangeTab = (event, tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="flex flex-col w-full h-full border border-gray-300 shadow-lg bg-white rounded overflow-hidden">
      <div className="flex h-12 w-full bg-green-600 items-center justify-between px-4 py-2 text-white">
        <span>{title}</span>
        <Tooltip content="Refresh Manage My Work and Recent Activity" placement="bottom">
          <FontAwesomeIcon className="cursor-pointer" icon={faSyncAlt} onClick={() => {}} />
        </Tooltip>
      </div>
      <div className="w-full h-full bg-white">
        <Tabs value={selectedTab} indicatorColor="primary" onChange={handleChangeTab}>
          <Tab label="All" />
        </Tabs>
      </div>
    </div>
  );
}
