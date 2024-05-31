'use client';
import ProjectPanel, { ProjectModel } from '@/components/project/projectPanel';
import ProjectTable from '@/components/project/projectTable';
import { deleteProject, getAllProjectsForUser } from '@/lib/api';
import { Button, Modal } from 'antd';
import { useEffect, useState } from 'react';

export default function Projects() {
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const toggleModal = (toggle: boolean) => setIsOpenDialog(toggle);
  const [projects, setProjects] = useState<ProjectModel[]>([]);
  const [projectItem, setProjectItem] = useState<ProjectModel | null>();

  const createAProject = () => {
    setProjectItem(null);
    setIsOpenDialog(true);
  };

  const onSubmitted = () => {
    onRefreshProjects();
    setIsOpenDialog(false);
  };

  const onRefreshProjects = async () => {
    const result = await getAllProjectsForUser();
    const { projects } = result;
    if (projects) {
      setProjects(projects);
    }
  };

  useEffect(() => {
    onRefreshProjects();
  }, []);

  const onDelete = (id: string) => {
    deleteProject(id)
      .then(result => {
        const { message } = result;
        if (message === 'success') {
          onRefreshProjects();
        }
      })
      .catch(error => {
        console.log({ error });
      });
  };

  const onUpdate = (item: ProjectModel) => {
    setProjectItem(item);
    setIsOpenDialog(true);
  };

  return (
    <main className="flex flex-col w-full h-full">
      <div className="flex w-full mb-4">
        <Button type="primary" onClick={createAProject}>
          Post A Project
        </Button>
      </div>

      <div className="flex w-full">
        <ProjectTable projects={projects} onDelete={id => onDelete(id)} onUpdate={item => onUpdate(item)} />
      </div>

      <Modal title={projectItem ? 'Update Project' : 'Create A Project'} open={isOpenDialog} onCancel={() => toggleModal(false)} footer={null}>
        <ProjectPanel item={projectItem} onSubmitted={() => onSubmitted()} onCancel={() => toggleModal(false)} />
      </Modal>
    </main>
  );
}
