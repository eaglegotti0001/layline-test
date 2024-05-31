import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { ProjectModel } from '@models/project.model';
import { Project } from '@/interfaces/project.interface';
import { Bid } from '@/interfaces/bids.interface';

@Service()

export class ProjectService {

  public async findAllProjects(): Promise<Project[]> {
    return await ProjectModel.find();
  }

  public async findAllOtherProjects(userId: string): Promise<Project[]> {
    return await ProjectModel.find({ userId: { $nin: [userId] } });
  }

  public async findAllProjectsForUser(userId: string): Promise<Project[]> {
    return await ProjectModel.find({ userId: userId });
  }

  public async findProjectById(projectId: string): Promise<Project> {
    const findUser: Project = await ProjectModel.findOne({ _id: projectId });
    if (!findUser) throw new HttpException(409, "Project doesn't exist");

    return findUser;
  }

  public async addBidToProject(projectId: string, bidItem: Bid): Promise<Project> {

    const project = await this.findProjectById(projectId);
    if(project) {
      project.bid_ids.push(bidItem._id.toString());
      const updated: Project = await ProjectModel.findByIdAndUpdate(projectId, project);
      return updated;
    }

    return project;
  }

  public async createProject(projectData: Project): Promise<Project> {
    return await ProjectModel.create(projectData);
  }

  public async updateProject(projectId: string, projectData: Project): Promise<Project | null> {

    if (projectId) {
      const find: Project = await ProjectModel.findOne({ _id: projectId });
      if (find) {
        const updateProjectById: Project = await ProjectModel.findByIdAndUpdate(projectId, projectData);
        if (!updateProjectById) throw new HttpException(409, "Project doesn't exist");
        return updateProjectById;
      }
    }

    return null;
  }

  public async deleteProject(projectId: string): Promise<Project> {
    const deleteById: Project = await ProjectModel.findByIdAndDelete(projectId);
    if (!deleteById) throw new HttpException(409, "Project doesn't exist");
    return deleteById;
  }

}
