import React, { useState } from 'react';
import { BidModel } from '../jobs/bidPanel';
import { Checkbox, Input } from 'antd';
import { allowPriceUpdate } from '@/lib/api';

type Props = {
  item: BidModel;
};

export default function ApplicantItem({ item }: Props) {
  const [allow, setAllow] = useState(item.isAbleToUpdatePrice);

  const onChangeValue = async e => {
    const value = e.target.checked;
    const result = await allowPriceUpdate(item._id, value);
    const { bid } = result;
    if (bid) {
      setAllow(value);
    }
  };

  return (
    <div className="px-8 py-4 flex items-center justify-between">
      <span>
        <b>{item.userName}</b> applied to this project with the price <b>{item.price}</b>
      </span>
      <Checkbox checked={allow} onChange={e => onChangeValue(e)}>
        Allow Update Price
      </Checkbox>
    </div>
  );
}
