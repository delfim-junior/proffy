import express from 'express'
import ClassesController from './controllers/ClassesController'
import ConnectionsController from './controllers/ConnectionsController';
const routes = express.Router()

const classesControllers = new ClassesController()
const connectionsController = new ConnectionsController()

routes.post('/create_classes', classesControllers.create);
routes.get('/index_classes', classesControllers.index);

routes.post('/create_connections', connectionsController.create);
routes.get('/index_connections', connectionsController.index);


export default routes
