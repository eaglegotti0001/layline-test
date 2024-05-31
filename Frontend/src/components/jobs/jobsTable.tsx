import type { TableProps } from 'antd';
import { Button, Table } from 'antd';
import { ProjectModel } from '../project/projectPanel';
import { BidModel } from './bidPanel';
import BidsContainer from './bidContainer';

type Props = {
  projects: ProjectModel[];
  onApply: (record: ProjectModel, bidItem: BidModel | null) => void;
};

export default function JobsTable({ projects, onApply }: Props) {
  const columns: TableProps<ProjectModel>['columns'] = [
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Created Time',
      dataIndex: 'strTimeCreated',
    },
    {
      title: 'Action',
      render: (project: ProjectModel) => (
        <>
          {!(project.bids && project.bids.length > 0) && (
            <Button className="mr-8" onClick={() => onApply(project, null)}>
              Apply
            </Button>
          )}
        </>
      ),
    },
  ];

  return (
    <>
      <Table
        className="w-full"
        rowKey="_id"
        columns={columns}
        dataSource={projects}
        expandable={{
          expandedRowRender: record => <BidsContainer projectId={record._id} />,
          rowExpandable: record => record.bids.length > 0,
        }}
      />
    </>
  );
}
