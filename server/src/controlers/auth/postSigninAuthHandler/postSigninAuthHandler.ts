import { RequestHandler } from "express";
import bcrypt from 'bcrypt'
import { prisma } from "../../../prismaClient";
import { zodCredentialsValidation } from "../../../utils";
import { z } from "zod";

export const postSigninAuthHandler: RequestHandler = async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });

        //NOTE: Zod data validation
        const { validPassword } = await zodCredentialsValidation({ email, password })

        //NOTE: comparing passwords
        if (!user || !await bcrypt.compare(validPassword, user.password)) {
            return res.status(401).json({ error: 'Unvalid Credintial (email 0r password)!', user: null })
        }


        //NOTE: checking for any session realated to this user and it's valid not expired
        const sessionDoExist = await prisma.session.findUnique({ where: { sid: req.session.id } })
        if (!sessionDoExist) {
            await prisma.session.create({
                data: {
                    sid: req.session.id,
                    userId: user.id,
                    expiresAt: req.session.cookie.expires!,
                    data: JSON.stringify(req.session),
                }
            })
        }


        req.session.user = user
        return res.json({ user: user, error: null })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(401).json({ error: "Unvalid Credintial (email 0r password)!", user: null })
        }
        console.log(error)
        return res.json({ error: error, user: null })
    }
}
