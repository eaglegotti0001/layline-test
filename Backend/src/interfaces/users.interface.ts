import { Project } from "./project.interface";

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  projectsPosted: string[];
  projectsApplied: string[];
}
