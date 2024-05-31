import { createBid, updateBid } from '@/lib/api';
import { Button, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import { ProjectModel } from '../project/projectPanel';
const { TextArea } = Input;

export type BidModel = {
  _id: string;
  userId: string;
  userEmail: string;
  userName: string;
  projectId: string;
  coverletter: string;
  price: number;
  strTime: string;
  isAbleToUpdatePrice: boolean;
};

type Props = {
  item?: BidModel | null;
  projectItem: ProjectModel;
  onCancel: () => void;
  onSubmitted: () => void;
};

export default function BidPanel({ item, projectItem, onCancel, onSubmitted }: Props) {
  const [form] = Form.useForm();
  const [bidItem, setBidItem] = useState<BidModel | null>();

  useEffect(() => {
    setBidItem(item);
    if (item) {
      form.setFieldsValue(item);
    }
  }, [item]);

  const onFinish = (body: BidModel) => {
    if (bidItem && bidItem._id) {
      updateBid(bidItem._id, body)
        .then(result => {
          onSubmitted();
        })
        .catch(error => {
          console.log({ error });
        });
    } else {
      if (projectItem._id) {
        body.projectId = projectItem._id;
        createBid(body)
          .then(result => {
            onSubmitted();
          })
          .catch(error => {
            console.log('error: ', error);
          });
      }
    }
  };

  const onFinishFailed = () => {};

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <span className="text-lg my-4">{projectItem?.title}</span>

      <Form form={form} layout="vertical" className="w-full" initialValues={item ? item : {}} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
        <Form.Item<BidModel> label="Content" name="coverletter" rules={[{ required: true, message: 'content should not be empty!' }]}>
          <TextArea showCount placeholder="Content" style={{ height: 180 }} />
        </Form.Item>

        <Form.Item<BidModel> label="Price" name="price" rules={[{ required: true, message: 'price should be specified!' }]}>
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
