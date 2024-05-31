import { createProject, updateProject } from '@/lib/api';
import { Button, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import { BidModel } from '../jobs/bidPanel';
const { TextArea } = Input;

export type ProjectModel = {
  _id: string;
  title: string;
  content: string;
  price: number;
  strTimeCreated?: string;
  bids: BidModel[];
};

type Props = {
  item?: ProjectModel | null;
  onCancel: () => void;
  onSubmitted: () => void;
};

export default function ProjectPanel({ item, onCancel, onSubmitted }: Props) {
  const [form] = Form.useForm();
  const [projectItem, setProjectItem] = useState<ProjectModel | null>();

  useEffect(() => {
    setProjectItem(item);
    if (item) {
      form.setFieldsValue(item);
    }
  }, [item]);

  const onFinish = (body: ProjectModel) => {
    if (projectItem && projectItem._id) {
      updateProject(projectItem._id, body)
        .then(result => {
          onSubmitted();
        })
        .catch(error => {
          console.log({ error });
        });
    } else {
      createProject(body)
        .then(result => {
          onSubmitted();
        })
        .catch(error => {
          console.log('error: ', error);
        });
    }
  };

  const onFinishFailed = () => {};

  return (
    <div className="w-full flex items-center justify-center">
      <Form form={form} layout="vertical" className="w-full" initialValues={item ? item : {}} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
        <Form.Item<ProjectModel> label="Title" name="title" rules={[{ required: true, message: 'Title should not be empty!' }]}>
          <Input size="large" placeholder="Title" />
        </Form.Item>

        <Form.Item<ProjectModel> label="Content" name="content" rules={[{ required: true, message: 'content should not be empty!' }]}>
          <TextArea showCount placeholder="Content" style={{ height: 180 }} />
        </Form.Item>

        <Form.Item<ProjectModel> label="Price" name="price">
          <Input size="large" />
        </Form.Item>

        <Form.Item className="w-full flex justify-end mb-4">
          <Button type="primary" htmlType="submit" size="large" className="mr-4">
            Submit
          </Button>
          <Button size="large" onClick={() => onCancel()}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
