'use client';
import { useAppSelector } from '@/state';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { Table, Tooltip } from 'flowbite-react';
import { useState } from 'react';
import TabPanel from './tab-panel';
import { getCodeTableValue } from '@/lib/utils';

type Prop = {
  title: string;
};

export default function PaperManageWork({ title }: Prop) {
  const myWork = useAppSelector(state => state.myWorkReducer.myWork.items);
  const [selectedTab, setSelectedTab] = useState(0);

  const config = useAppSelector(state => state.staticPropertyReducer.value);

  const handleChangeTab = (event, tab) => {
    setSelectedTab(tab);
  };

  const getManageWorkData = () => {
    const dashboardNotifyTypes = config ? config.dashboardNotifyTypes : [];
    const dashboardNotifyText = config ? config.dashboardNotifyText : [];
    const pendingUsers = myWork?.pendingUsers?.length ? myWork.pendingUsers : [];

    const pendingUserDesc = getCodeTableValue(dashboardNotifyText, 'PENDING_USER');
    const pendingUserType = getCodeTableValue(dashboardNotifyTypes, 'PENDING_USER');

    // let rowDesc = '',
    //   rowType = '';
    // let anItem;
    // let pendingUserRows;
    // for (let i = 0; i < pendingUsers.length; i++) {
    //   anItem = pendingUsers[i];
    //   rowDesc = Util.replaceHoldersPendingUser(pendingUserDesc, anItem);
    //   rowType = Util.replaceHoldersPendingUser(pendingUserType, anItem);
    //   pendingUserRows = (
    //     <>
    //       {pendingUserRows}
    //       <TableRow key={'pending_' + i}>
    //         <TableCell style={{ paddingRight: 0 }} onClick={evt => this.handleViewPendingUser(pendingUsers[i])}>
    //           <Button color={'green'} action={'small'} text={'GO!'} handleClick={() => console.log('')} />
    //         </TableCell>
    //         <TableCell style={{ paddingLeft: 3 }}>{rowType}</TableCell>
    //         <TableCell style={{ maxWidth: 0 }}>
    //           <ToolTip title={rowDesc}>
    //             <div style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{rowDesc}</div>
    //           </ToolTip>
    //         </TableCell>
    //       </TableRow>
    //     </>
    //   );
    // }
    // let unpaidRecords = this.props.manageMyWork?.unpaidRecords?.length ? this.props.manageMyWork.unpaidRecords : [];
    // let pendingRecords = this.props.manageMyWork?.pendingRecords?.length ? this.props.manageMyWork.pendingRecords : [];
    // let rejectedRecords = this.props.manageMyWork?.rejectedRecords?.length ? this.props.manageMyWork.rejectedRecords : [];
    // let unpaid2290Desc = Util.getCodeTableValue(dashboardNotifyText, '2290_FILED_UNPAID');
    // let unpaid2290Type = Util.getCodeTableValue(dashboardNotifyTypes, '2290_FILED_UNPAID');
    // let pending2290Desc = Util.getCodeTableValue(dashboardNotifyText, '2290_PENDING');
    // let pending2290Type = Util.getCodeTableValue(dashboardNotifyTypes, '2290_PENDING');
    // let rejected2290Desc = Util.getCodeTableValue(dashboardNotifyText, '2290_REJECTED');
    // let rejected2290Type = Util.getCodeTableValue(dashboardNotifyTypes, '2290_REJECTED');
    // let recordsArray = [unpaidRecords, pendingRecords, rejectedRecords];
    // let type2290Array = [unpaid2290Type, pending2290Type, rejected2290Type];
    // let mmwRecordsMap = {};
    // for (let i = 0; i < type2290Array.length; i++) {
    //   if (!mmwRecordsMap[type2290Array[i]]) {
    //     mmwRecordsMap[type2290Array[i]] = [];
    //   }
    //   mmwRecordsMap[type2290Array[i]].push(...recordsArray[i]);
    // }
  };

  return (
    <div className="flex flex-col w-full h-full border border-gray-300 shadow-lg bg-white rounded overflow-hidden">
      <div className="flex h-12 w-full bg-green-600 justify-between items-center px-4 py-2 text-white">
        <span>{title}</span>

        <Tooltip content="Refresh Manage My Work and Recent Activity" placement="bottom">
          <FontAwesomeIcon className="cursor-pointer" icon={faSyncAlt} onClick={() => {}} />
        </Tooltip>
      </div>
      <div className="w-full h-full bg-white">
        <Tabs value={selectedTab} indicatorColor="primary" onChange={handleChangeTab}>
          <Tab label="All" />
          <Tab label="Summary" />
        </Tabs>

        <TabPanel index={0} selected={selectedTab}>
          <Table striped>
            <Table.Head>
              <Table.HeadCell className="w-[10%]">Type</Table.HeadCell>
              <Table.HeadCell>Description</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800"></Table.Row>
            </Table.Body>
          </Table>
        </TabPanel>
        <TabPanel index={1} selected={selectedTab}>
          <Table striped>
            <Table.Head>
              <Table.HeadCell className="w-[10%]">Type</Table.HeadCell>
              <Table.HeadCell className="text-right">Count</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800"></Table.Row>
            </Table.Body>
          </Table>
        </TabPanel>
      </div>
    </div>
  );
}
