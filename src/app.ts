import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as logger from 'morgan';
import errorMiddleware from './middlewares/error.middleware';

class App {
  public app: express.Application;
  public port: (string | number);
  public env: boolean;

  constructor(routes: any[]) {
    this.app = express();
    this.port = process.env.PORT || 4400;
    this.env = process.env.NODE_ENV === 'production' ? true : false;

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`🚀 App listening on the port ${this.port}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(cors());
    if (this.env) {
      this.app.use(logger('combined'));
    } else {
      this.app.use(logger('dev'));
    }

    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: true}));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: any[]) {
    routes.forEach((route) => {
      this.app.use('/', route.router);
    });
  }

  private initializeSwagger() {
    const swaggerJSDoc = require('swagger-jsdoc');
    const swaggerUi = require('swagger-ui-express');

    const options = {
      swaggerDefinition: {
        info: {
          title: 'REST API',
          version: '1.0.0',
          description: 'Example docs',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
