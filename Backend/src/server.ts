import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { BidRoute } from '@routes/bids.route';
import { ValidateEnv } from '@utils/validateEnv';
import { ProjectRoute } from './routes/projects.route';

ValidateEnv();

const app = new App([new UserRoute(), new AuthRoute(), new BidRoute(), new ProjectRoute()]);

app.listen();
