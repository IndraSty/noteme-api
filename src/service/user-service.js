import { getUserValidation, loginUserValidation, registerUserValidation, updateUserValidation } from "../validation/user-validation.js"
import { validate } from "../validation/validation.js"
import { prismaClient } from "../application/database.js"
import { ResponseError } from "../error/response-error.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const register = async (request) => {
    const user = validate(registerUserValidation, request);

    const countUser = await prismaClient.users.count({
        where: {
            email: user.email
        }
    });


    if (countUser == 1) {
        throw new ResponseError(400, "Email sudah digunakan");
    }

    delete user.confirmPassword;
    user.password = await bcrypt.hash(user.password, 10)

    return prismaClient.users.create({
        data: user,
        select: {
            email: true,
            name: true,
            imgUrl: true,
            gender: true,
            createdAt: true,
        }
    });
}

const login = async (request) => {
    const loginReq = validate(loginUserValidation, request);

    const user = await prismaClient.users.findUnique({
        where: {
            email: loginReq.email
        },
        select: {
            email: true,
            password: true,
            name: true,
        }
    });

    if (!user) throw new ResponseError(401, "Email atau Password anda salah!");

    const isPasswordValid = await bcrypt.compare(loginReq.password, user.password)
    if (!isPasswordValid) throw new ResponseError(401, "Email atau Password anda salah!");

    const email = user.email;
    const name = user.name;
    const accesToken = jwt.sign({ email, name }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '20s'
    });
    const refreshToken = jwt.sign({ email, name }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '1d'
    });

    await prismaClient.users.update({
        data: {
            refreshToken: refreshToken
        },
        where: {
            email: user.email
        },
    });

    return { accesToken, refreshToken }

}

const get = async (email) => {
    email = validate(getUserValidation, email);

    const user = await prismaClient.users.findUnique({
        where: {
            email: email
        },
        select: {
            email: true,
            name: true,
            createdAt: true,
            updateAt: true
        }
    });

    if (!user) throw new ResponseError(404, "User tidak ditemukan");

    return user;
}

const update = async (email, request) => {
    const user = validate(updateUserValidation, request);

    const countUser = await prismaClient.users.count({
        where: {
            email: email
        }
    });

    if (countUser !== 1) throw new ResponseError(404, "User is not found!")

    const data = {};
    if (user.name) data.name = user.name;
    if (user.imgUrl) data.imgUrl = user.imgUrl;
    if (user.gender) data.gender = user.gender;
    if (user.password) data.password = await bcrypt.hash(user.password, 10);

    return prismaClient.users.update({
        where: {
            email: email,
        },
        data: data,
        select: {
            email: true,
            name: true,
            imgUrl: true,
            gender: true,
            updateAt: true,

        }
    })

}

const logout = async (email) => {
    email = validate(getUserValidation, email)

    const user = await prismaClient.users.findUnique({
        where: {
            email: email
        }
    });

    if (!user) throw new ResponseError(404, "User is not Found!");

    return prismaClient.users.update({
        where: {
            email: email
        },
        data: {
            refreshToken: null
        },
        select: {
            email: true
        }
    })
}

export default {
    register,
    get,
    login,
    update,
    logout
}