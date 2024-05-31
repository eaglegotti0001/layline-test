import type { TableProps } from 'antd';
import { Button, Table } from 'antd';
import { ProjectModel } from './projectPanel';
import ApplicantPanel from './applicantPanel';

type Props = {
  isUpdateEnabled?: boolean;
  projects: ProjectModel[];
  onDelete: (id: string) => void;
  onUpdate: (item: ProjectModel) => void;
};

export default function ProjectTable({ projects, isUpdateEnabled = true, onDelete, onUpdate }: Props) {
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
      render: record => (
        <>
          {isUpdateEnabled && (
            <>
              <Button className="mr-8" onClick={() => onDelete(record._id)}>
                Delete
              </Button>
              <Button onClick={() => onUpdate(record)}>Update</Button>
            </>
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
          expandedRowRender: record => <ApplicantPanel projectId={record._id} />,
          rowExpandable: record => record.bids.length > 0,
        }}
      />
      ;
    </>
  );
}
