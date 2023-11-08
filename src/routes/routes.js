import express from "express";
import userController from "../controller/user-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import taskController from "../controller/task-controller.js";

const userRouter = express.Router();
userRouter.use(authMiddleware);

userRouter.get('/api/users/current', userController.get)
userRouter.put('/api/users/current', userController.update)
userRouter.delete('/api/users/logout', userController.logout)

userRouter.post('/api/users/current/tasks', taskController.create)
userRouter.get('/api/users/current/tasks/:taskId', taskController.get)
userRouter.put('/api/users/current/tasks/:taskId', taskController.update)
userRouter.delete('/api/users/current/tasks/:taskId', taskController.remove)
userRouter.get('/api/users/current/tasks', taskController.list)

export default userRouter;