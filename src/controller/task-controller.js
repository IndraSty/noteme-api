import taskService from "../service/task-service.js";
import { url } from "../routes/url.js";

const create = async (req, res, next) => {
    try {
        const userId = req.email;
        const request = req.body;
        const result = await taskService.create(userId, request);

        res.status(200).json({
            response: {
                status: 200,
                message: "Ok",
                url: `${url}api/users/current/tasks`
            },
            data: result,
            message: "Task Berhasil dibuat"
        })
    } catch (e) {
        next(e);
    }
}

const get = async (req, res, next) => {
    try {
        const userId = req.email;
        const taskId = req.params.taskId;

        const result = await taskService.get(userId, taskId);

        res.status(200).json({
            response: {
                status: 200,
                message: "Ok",
                url: `${url}api/users/current/tasks/${taskId}`
            },
            data: result
        })
    } catch (e) {
        next(e);
    }
}

const update = async (req, res, next) => {
    try {
        const userId = req.email;
        const taskId = req.params.taskId
        const request = req.body;
        request.id = taskId

        const result = await taskService.update(userId, request);

        res.status(200).json({
            response: {
                status: 200,
                message: "Ok",
                url: `${url}api/users/current/tasks/${taskId}`
            },
            data: result,
            message: "Data berhasil diUpdate"
        })
    } catch (e) {
        next(e);
    }
}

const remove = async (req, res, next) => {
    try {
        const userId = req.email;
        const taskId = req.params.taskId;

        await taskService.remove(userId, taskId)

        res.status(200).json({
            response: {
                status: 200,
                message: "Ok",
                url: `${url}api/users/current/tasks/${taskId}`
            },
            message: `Studio ${taskId} berhasil dihapus`
        })
    } catch (e) {
        next(e)
    }
}

const list = async (req, res, next) => {
    try {
        const userId = req.email
        const result = await taskService.list(userId)

        res.status(200).json({
            response: {
                status: 200,
                message: "Ok",
                url: `${url}api/users/current/tasks`
            },
            data: result,
        })
    } catch (e) {
        next(e);
    }
}

export default {
    create,
    get,
    update,
    remove,
    list
}