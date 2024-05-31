import { Project, ProjectItem } from '@/interfaces/project.interface';
import { ProjectService } from '@/services/projects.service';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import moment from 'moment-timezone';
import { UserService } from '@/services/users.service';
import { BidsService } from '@/services/bids.service';

export class ProjectController {

  public projectService = Container.get(ProjectService);
  public userService = Container.get(UserService);
  public bidService = Container.get(BidsService);

  private async getProjectItem(project: Project): Promise<ProjectItem> {
    const bidItems = await this.bidService.findAllForBidIds(project.bid_ids);
    const projectItem = JSON.parse(JSON.stringify(project)) as ProjectItem;
    projectItem.bids = bidItems;
    return projectItem;
  }

  private async getProjectItems(projects: Project[]): Promise<ProjectItem[]> {
    const projectItems: ProjectItem[] = [];

    for (const project of projects) {
      const projectItem = await this.getProjectItem(project);
      projectItems.push(projectItem);
    }
    return projectItems;
  }


  public getAllProjects = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projects: Project[] = await this.projectService.findAllProjects();
      const projectItems: ProjectItem[] = await this.getProjectItems(projects);
      res.status(200).json({ data: projectItems, message: 'success' });

    } catch (error) {
      next(error);
    }
  };

  public getAllOthersProjects = async (req: Request, res: Response, next: NextFunction) => {
    try {

      const { user } = req as any;
      if (user) {
        const projects: Project[] = await this.projectService.findAllOtherProjects(user._id);
        const projectItems: ProjectItem[] = await this.getProjectItems(projects);
        projectItems.map(project => {
          project.bids = project.bids.filter(bid => bid.userId === user._id.toString());
        })
        res.status(200).json({ data: projectItems, message: 'success' });
      }
      else {
        res.status(204).json({ message: 'invalid user' });
      }

    } catch (error) {
      next(error);
    }
  };


  public getAllProjectForUser = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const { user } = req as any;
      if (user) {
        const projects: Project[] = await this.projectService.findAllProjectsForUser(user._id.toString());
        const projectItems: ProjectItem[] = await this.getProjectItems(projects);
        res.status(200).json({ projects: projectItems, message: 'success' });
      }
      else {
        res.status(204).json({ message: 'invalid user' });
      }
    } catch (error) {
      next(error);
    }
  };

  public getProjectById = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const { id } = req.query;
      const project: Project = await this.projectService.findProjectById(id.toString());
      const projectItem = await this.getProjectItem(project);
      res.status(200).json({ project: projectItem, message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public createProject = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const { user } = req as any;

      if (user) {
        const { title, content, price } = req.body;
        const project: Project = {
          title,
          content,
          price,
          userId: user._id.toString(),
          strTimeCreated: moment().format("YYYY-MM-DDTHH:mm:ss"),
          bid_ids: []
        }

        const createdProject: Project = await this.projectService.createProject(project);
        await this.userService.addNewProjectToUser(user._id.toString(), createdProject);

        const projectItem = await this.getProjectItem(createdProject);
        res.status(201).json({ project: projectItem, createdProject, message: 'success' });
      }
      else {
        res.status(204).json({ message: 'invalid user' });
      }

    }
    catch (error) {
      next(error);
    }

  };

  public updateProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user } = req as any;
      if (user) {
        const projectId = req.params.id;
        const projectData: Project = req.body;
        const updatedProjectData: Project = await this.projectService.updateProject(projectId, projectData);

        const projectItem = await this.getProjectItem(updatedProjectData);
        res.status(200).json({ project: projectItem, message: 'success' });
      }
      else {
        res.status(204).json({ message: 'invalid user' });
      }

    }
    catch (error) {
      next(error);
    }
  };

  public deleteProject = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const projectId = req.params.id as string;
      if (projectId) {
        const deletedProjectData: Project = await this.projectService.deleteProject(projectId);

        const { bid_ids } = deletedProjectData;
        if (bid_ids && bid_ids.length) {
          for (const bid_id in bid_ids) {
            await this.bidService.deleteBid(bid_id);
          }
        }

        res.status(200).json({ project: deletedProjectData, message: 'success' });
      }
      else {
        res.status(404).json({ message: 'invalid request' });
      }

    }
    catch (error) {
      next(error);
    }
  };
}
