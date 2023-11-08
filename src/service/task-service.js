import {prismaClient} from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { createTaskValidation, getTaskValidation, updateTaskValidation } from "../validation/task-validation.js";
import { validate } from "../validation/validation.js";

const checkUserMustExist = async (userId) => {
    const checkUser = await prismaClient.users.count({
        where: {
            email: userId
        }
    });

    if(checkUser !== 1) throw new ResponseError(404, "User tidak ditemukan");

}

const create = async (userId, request) => {

    await checkUserMustExist(userId)

    const task = validate(createTaskValidation, request);
    task.userId = userId

    return prismaClient.task.create({
        data: task,
        select: {
            id: true,
            title: true,
            todoText: true,
            time: true,
            category: true,
            isDone: true,
            createdAt: true,
            updateAt: true
        }
    });
}

const get = async (userId, taskId) => {
    userId = await checkUserMustExist(userId);

    taskId = validate(getTaskValidation, taskId);

    const task = await prismaClient.task.findFirst({
        where: {
            userId: userId,
            id: taskId
        },
        select: {
            id: true,
            title: true,
            todoText: true,
            time: true,
            category: true,
            isDone: true,
            createdAt: true,
            updateAt: true
        }
    });

    if(!task) throw new ResponseError(404, "Task tidak ditemukan!")

    return task;
}

const update = async (userId, request) => {
    userId = await checkUserMustExist(userId);

    const task = validate(updateTaskValidation, request);

    const checkTask = await prismaClient.task.count({
        where: {
            userId: userId,
            id: task.id
        }
    });

    if(checkTask !== 1) throw new ResponseError(404, "Task tidak ditemukan!")

    return prismaClient.task.update({
        where: {
            userId: userId,
            id: task.id
        },
        data: {
            title: task.title,
            todoText: task.todoText,
            time: task.time,
            category: task.category,
            isDone: task.isDone,
        },
        select: {
            id: true,
            title: true,
            todoText: true,
            time: true,
            category: true,
            isDone: true,
            updateAt: true
        }
    });
}

const remove = async (userId, taskId) => {
    userId = await checkUserMustExist(userId);

    taskId = validate(getTaskValidation, taskId);

    const checkTask = await prismaClient.task.count({
        where: {
            userId: userId,
            id: taskId
        }
    }); 

    if(checkTask !== 1) throw new ResponseError(404, `Task ${taskId} Tidak Ditemukan`)

    return prismaClient.task.delete({
        where: {
            id: taskId
        }
    })
}

const list = async (userId) => {
    userId = await checkUserMustExist(userId);

    return prismaClient.task.findMany({
        where: {
            userId: userId
        },
        select: {
            id: true,
            title: true,
            todoText: true,
            time: true,
            category: true,
            isDone: true,
            userId: true,
            createdAt: true,
            updateAt: true
        }
    })
}

export default {
    create,
    get,
    update,
    remove,
    list
}