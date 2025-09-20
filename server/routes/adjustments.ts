import express from 'express';
import {Adjustment, allAsync, Card, createAdjustment, createCard} from '../main.js'
import {verifySession} from "../util.js";
const router: express.Router = express.Router();

router.put("/create", async (req, res) => {
    const sessionVerified = await verifySession(req, res)
    if (!sessionVerified) return;
    const {session, user} = sessionVerified;
    const adjustData = req.body.AdjustData;
    if (!adjustData) {
        res.status(400).send({status: 400, error: "Missing Adjustment Data"});
        return;
    }
    try {
        adjustData.UserID = user.UserID;
        let card = await createAdjustment(user, adjustData)
        res.status(200).send({card: card});
    } catch (error) {
        res.status(422).send({status: 422, error: "Not Valid Card Data"});
    }
})

export default router;