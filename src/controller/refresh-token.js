import jwt from "jsonwebtoken";
import { prismaClient } from "../application/database.js";

export const refreshToken = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(401).json({ errors: "Unauthorization" });

        const user = await prismaClient.users.findFirst({
            where: {
                refreshToken: refreshToken
            },
            select: {
                email: true,
                name: true
            }
        });

        if (!user) return res.status(403).json({ errors: "Forbidden" });
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.status(403).json({ errors: "Forbidden" });

            const email = user.email;
            const name = user.name;

            const accessToken = jwt.sign({ email, name }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '15s'
            });

            res.status(200).json({
                accessToken
            })
        })
    } catch (e) {
        next(e);
    }
}