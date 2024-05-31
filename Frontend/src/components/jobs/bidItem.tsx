import { Button, Checkbox, Input } from 'antd';
import { BidModel } from './bidPanel';
import { useState } from 'react';
import { updateBidPrice } from '@/lib/api';

type Props = {
  item: BidModel;
};

export default function BidItem({ item }: Props) {
  const [allowed, setAllowed] = useState(item.isAbleToUpdatePrice);
  const [price, setPrice] = useState(item.price);
  const [bidItem, setBidItem] = useState<BidModel>(item);

  const onChangePrice = e => {
    const value = e.target.value;
    setPrice(value);
  };

  const onSubmit = async () => {
    const result = await updateBidPrice(item._id, price);
    const { bid } = result;

    if (bid) {
      setBidItem(bid);
    }
  };

  return (
    <div className="px-8 py-4 flex items-center justify-between w-full">
      <span>
        You applied to this project with the price <b>{bidItem.price}</b>
      </span>

      <div className="flex flex-row p-2 w-1/4 items-center justify-start">
        <span className="mr-4">Price</span>
        <Input size="large" placeholder="price" disabled={!allowed} value={price} onChange={onChangePrice} />
        <Button size="large" disabled={!allowed} className="ml-4" onClick={onSubmit}>
          Submit
        </Button>
      </div>

      <Checkbox disabled checked={allowed}>
        Is able to update price{' '}
      </Checkbox>
    </div>
  );
}
