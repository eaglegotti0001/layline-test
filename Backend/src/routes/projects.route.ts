import { ProjectController } from '@/controllers/prpject.controller';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { Router } from 'express';

export class ProjectRoute implements Routes {

  public path = '/project';
  public router = Router();
  public project = new ProjectController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/all`, AuthMiddleware, this.project.getAllProjects);
    this.router.get(`${this.path}/others`, AuthMiddleware, this.project.getAllOthersProjects);
    this.router.get(`${this.path}`, AuthMiddleware, this.project.getAllProjectForUser);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.project.getProjectById);
    this.router.post(`${this.path}`, AuthMiddleware, this.project.createProject);
    this.router.put(`${this.path}/:id`, AuthMiddleware, this.project.updateProject);
    this.router.delete(`${this.path}/:id`, AuthMiddleware, this.project.deleteProject);
  }
}
