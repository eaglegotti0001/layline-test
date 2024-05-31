import { model, Schema, Document } from 'mongoose';
import { User } from '@interfaces/users.interface';

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true  
  },
  lastName: {
    type: String,
    required: true  
  },
  password: {
    type: String,
    required: true,
  },

  projectsPosted: {
    type: Array
  },
  projectsApplied: {
    type: Array
  }

});

export const UserModel = model<User & Document>('User', UserSchema);
