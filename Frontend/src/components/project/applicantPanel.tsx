import { getAllBidsForProjectId } from '@/lib/api';
import { useEffect, useState } from 'react';
import { BidModel } from '../jobs/bidPanel';
import ApplicantItem from './applicantItem';

type Props = {
  projectId: string;
};

export default function ApplicantPanel({ projectId }: Props) {
  const [bidItems, setBidItems] = useState<BidModel[]>([]);

  const refreshBidItems = async () => {
    const result = await getAllBidsForProjectId(projectId);
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
        <ApplicantItem key={item._id} item={item} />
      ))}
    </div>
  );
}
