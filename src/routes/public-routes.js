import express from "express";
import userController from "../controller/user-controller.js";
import { refreshToken } from "../controller/refresh-token.js";

export const publicRouter = express.Router();
publicRouter.get('/', (req, res) => {
    res.send('Server running!')
  })
publicRouter.post('/api/users', userController.register);
publicRouter.post('/api/users/login', userController.login)
publicRouter.get('/api/token', refreshToken)