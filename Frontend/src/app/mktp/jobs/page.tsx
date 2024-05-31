'use client';
import BidPanel, { BidModel } from '@/components/jobs/bidPanel';
import JobsTable from '@/components/jobs/jobsTable';
import { ProjectModel } from '@/components/project/projectPanel';
import { getAllOthersProjects } from '@/lib/api';
import { Modal } from 'antd';
import { useEffect, useState } from 'react';

export default function Jobs() {
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const toggleModal = (toggle: boolean) => setIsOpenDialog(toggle);
  const [projects, setProjects] = useState<ProjectModel[]>([]);
  const [bidItem, setBidItem] = useState<BidModel | null>();
  const [projectItem, setProjectItem] = useState<ProjectModel>();

  const onApply = (project: ProjectModel, bidItem: BidModel | null) => {
    setProjectItem(project);
    setBidItem(bidItem);
    setIsOpenDialog(true);
  };

  const onSubmitted = () => {
    onRefreshProjects();
    setIsOpenDialog(false);
  };

  const onRefreshProjects = async () => {
    const result = await getAllOthersProjects();
    const { data } = result;
    if (data) {
      setProjects(data);
    }
  };

  useEffect(() => {
    onRefreshProjects();
  }, []);

  return (
    <main className="flex flex-col w-full h-full">
      <div className="flex w-full">
        <JobsTable projects={projects} onApply={(projectItem, bidItem) => onApply(projectItem, bidItem)} />
      </div>

      {projectItem && (
        <Modal title={bidItem ? 'Update A Bid' : 'Create A Bid'} open={isOpenDialog} onCancel={() => toggleModal(false)} footer={null}>
          <BidPanel item={bidItem} projectItem={projectItem} onSubmitted={() => onSubmitted()} onCancel={() => toggleModal(false)} />
        </Modal>
      )}
    </main>
  );
}
