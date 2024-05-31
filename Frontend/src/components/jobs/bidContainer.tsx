import { getAllMyBidsForProjectId } from '@/lib/api';
import React, { useEffect, useState } from 'react';
import BidItem from './bidItem';
import { BidModel } from './bidPanel';

type Props = {
  projectId: string;
};

export default function BidsContainer({ projectId }: Props) {
  const [bidItems, setBidItems] = useState<BidModel[]>([]);

  const refreshBidItems = async () => {
    const result = await getAllMyBidsForProjectId(projectId);
    const { bids } = result;
    if (bids) {
      setBidItems(bids);
    }
  };

  useEffect(() => {
    refreshBidItems();
  }, [projectId]);

  return (
    <div className="flex flex-col w-full h-fit">
      {bidItems.map(item => (
        <BidItem key={item._id} item={item} />
      ))}
    </div>
  );
}
