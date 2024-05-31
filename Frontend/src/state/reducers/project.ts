import { BidModel } from '@/components/jobs/bidPanel';
import { ProjectModel } from '@/components/project/projectPanel';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type UserModel = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
};

export class Project {
  private projectModel: ProjectModel;

  constructor(model: ProjectModel) {
    this.projectModel = model;
  }

  public updateProjectModel(model: ProjectModel) {}

  public async refresh() {}
}

export class Bid {
  private bidModel: BidModel;
  constructor(model: BidModel) {
    this.bidModel = model;
  }
}

export class User {
  private userModel: UserModel | null = null;
  public get email(): string {
    return this.userModel ? this.userModel.email : '';
  }

  public get name(): string {
    return this.userModel ? this.userModel.firstName : '';
  }

  public get firstName() : string {
    return this.userModel ? this.userModel.firstName : '';
  } 

  constructor(model: UserModel) {
    this.userModel = model;
  }
}

type InitialState = {
  user?: User | null;
};

const initialState: InitialState = {
  user: null,
};

export const user = createSlice({
  name: 'setUser',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      return { ...state, user: action.payload };
    },
  },
});

export const { setUser } = user.actions;
export default user.reducer;
