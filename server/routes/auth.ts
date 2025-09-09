import express from "express"
import bcrypt from "bcrypt"
import { db, getAsync, runAsync, createUser, createSession, User } from '../main.ts'

const router: express.Router = express.Router()

router.post("/register", async (_req, _res) => {
    try {
        const {Username, Password} = _req.body;
        const dbOutput = await getAsync("SELECT * FROM Users WHERE Username = ?", [Username])
        if (dbOutput === undefined) {
            const hashedPassword = await bcrypt.hash(Password, 10)
            const user = await createUser(Username, hashedPassword);
            const session = await createSession(user)
            _res.send({session: session, user: user})
        } else {
            _res.status(409).send({error: "Username already exists"})
        }
    } catch (error) {
        console.error(error)
        _res.status(500).send({error: "Internal Server Error"})
    }
})

router.post("/login", async (_req, _res) => {
    try {
        const {Username, Password} = _req.body;
        const dbOutput = await getAsync("SELECT * FROM Users WHERE Username = ?", [Username])
        if (dbOutput !== undefined) {
            if (await bcrypt.compare(Password, dbOutput.Password)) {
                const user = new User(dbOutput)
                const session = await createSession(user)
                _res.send({session: session, user: user})
            } else {
                _res.status(401).send({error: "Password is incorrect"})
            }
        } else {
            _res.status(401).send({error: "User not found"})
        }
    } catch (error) {
        console.error(error)
        _res.status(500).send({error: "Internal Server Error"})
    }
})

export default router