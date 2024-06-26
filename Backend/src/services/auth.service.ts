import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Service } from 'typedi';
import { SECRET_KEY } from '@config';
import { HttpException } from '@exceptions/httpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { UserModel } from '@models/users.model';
import { SocketEngine } from '@/sockets/ui.socket';
import { MainUISocket } from '@/sockets/socketForUI';

const createToken = (user: User): TokenData => {
  const dataStoredInToken: DataStoredInToken = { _id: user._id };
  const expiresIn: number = 3600 * 24 * 30;

  return { expiresIn, token: sign(dataStoredInToken, SECRET_KEY, { expiresIn }) };
}

@Service()
export class AuthService extends SocketEngine {

  public get socket(): MainUISocket {
    return this.m_uiSocket;
  }

  public getUISocket(userId: string) {
    return this.m_mapUserIdToSocket[userId];
  }

  private m_uiSocket = new MainUISocket(this);

  public init() {
    this.m_uiSocket.init();
  }

  public async signup(userData: User): Promise<User> {
    const findUser: User = await UserModel.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await UserModel.create({ ...userData, password: hashedPassword, projectsPosted: [], projectsApplied: [] });

    return createUserData;
  }

  public async login(userData: User): Promise<{ token: string; user: any }> {
    const findUser: User = await UserModel.findOne({ email: userData.email });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, "Password is not matching");

    const tokenData = createToken(findUser);
    return { token: tokenData.token, user : { _id: findUser._id, email : findUser.email, firstName: findUser.firstName, lastName: findUser.lastName } };

  }

  public async logout(userData: User): Promise<User> {
    const findUser: User = await UserModel.findOne({ email: userData.email, password: userData.password });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    return findUser;
  }
}
