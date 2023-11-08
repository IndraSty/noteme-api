import { url } from "../routes/url.js";
import userService from "../service/user-service.js";

const register = async (req, res, next) => {
    try {
        const result = await userService.register(req.body);
        res.status(200).json({
            response: {
                status: 200,
                message: "Ok",
                url: `${url}api/users`
            },
            data: result,
            message: "Register Berhasil, Silahkan Login"
        })
    } catch (e) {
        next(e);
    }
}

const login = async (req, res, next) => {
    try {
        const result = await userService.login(req.body);
        res.cookie('refreshToken', result.refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        const accessToken = result.accesToken;
        res.status(200).json({
            accessToken
        })
    } catch (e) {
        next(e);
    }

}


const get = async (req, res, next) => {
    try {
        const email = req.email;
        const result = await userService.get(email);
        res.status(200).json({
            response: {
                status: 200,
                message: "Ok",
                url: `${url}api/users/current`
            },
            data: result
        })
    } catch (e) {
        next(e);
    }
}

const update = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.status(204)
        const email = req.email;
        const result = await userService.update(email, req.body)
        res.status(200).json({
            response: {
                status: 200,
                message: "Ok",
                url: `${url}api/users/current`
            },
            data: result,
            message: "Data berhasil diupdate"
        })
    } catch (e) {
        next(e);
    }
}

const logout = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(204);
        await userService.logout(req.email);
        res.clearCookie('refreshToken');
        res.status(200).json({
            response: {
                status: 200,
                message: "Ok",
                url: `${url}api/users/logout`
            },
            message: "Logout Berhasil"
        })
    } catch (e) {
        next(e);
    }
}


export default {
    register,
    get,
    login,
    update,
    logout
}