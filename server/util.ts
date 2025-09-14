import express from "express";
import {getAsync, runAsync, Session, User} from "./main.js";

export async function verifySession(req: express.Request, res: express.Response) {
    if (!req.body.session || !req.body.user) {
        res.status(401).send({status: 401, error: "Null Session/User"});
        return false;
    }
    try {
        let session = new Session(req.body.session);
        let user = new User(req.body.user)
        session = new Session(await getAsync(`SELECT * FROM Sessions WHERE UUID = '${session.UUID}' AND UserID = '${user.UserID}'`))
        if (session.Expiration.valueOf() < Date.now()) {
            await runAsync("DELETE FROM Sessions WHERE UUID = ${session.UUID}")
            res.status(401).send({status: 401, error: "Session Expired"});
            return false;
        }
        return {session, user};
    } catch (error) {
        res.status(401).send({status: 401, error: "Invalid Session"});
    }
}