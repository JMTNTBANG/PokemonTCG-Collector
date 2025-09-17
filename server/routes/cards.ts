import express from 'express';
import {verifySession} from "../util.js";
import {allAsync, Card, createCard, runAsync} from "../main.js";

const router: express.Router = express.Router();

router.post("/retrieve", async (req, res) => {
    const sessionVerified = await verifySession(req, res)
    if (!sessionVerified) return;
    const {session, user} = sessionVerified;
    let cards = await allAsync('SELECT * FROM Cards WHERE UserID = ?', [user.UserID]);
    for (let i = 0; i < cards.length; i++) {
        try {
            cards[i] = new Card(cards[i])
        } catch (error) {
            console.error(error);
            res.status(500).send({status: 500, error: "Internal Server Error"});
            return;
        }
    }
    res.status(200).send({cards: cards});
})

router.put("/create", async (req, res) => {
    const sessionVerified = await verifySession(req, res)
    if (!sessionVerified) return;
    const {session, user} = sessionVerified;
    const cardData = req.body.CardData;
    cardData.UserID = user.UserID;
    let card = await createCard(user, cardData)
    res.status(200).send({card: card});
})

router.put("/update", async (req, res) => {

})

router.delete("/delete", async (req, res) => {

})

export default router;