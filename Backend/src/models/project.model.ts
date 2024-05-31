import { model, Schema, Document } from 'mongoose';
import { Project } from '@interfaces/project.interface';

const ProjectSchema: Schema = new Schema({
  userId: {
    type: String,
    required: true    
  },
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  price: {
    type: Number
  },
  strTimeCreated : {
    type: String
  },
  bid_ids: {
    type: Array
  }
});

export const ProjectModel = model<Project & Document>('Project', ProjectSchema);
