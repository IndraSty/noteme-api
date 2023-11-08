import { prismaClient } from "../src/application/database";
import bcrypt from "bcrypt";

export const removeTestUser = async () => {
    await prismaClient.users.delete({
        where: {
            email: 'indra@gmail.com'
        }
    });
}