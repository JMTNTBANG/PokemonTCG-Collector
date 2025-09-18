import express from 'express';
import {verifySession} from "../util.js";
import {allAsync, Card, createCard, getAsync, runAsync} from "../main.js";

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
    const sessionVerified = await verifySession(req, res)
    if (!sessionVerified) return;
    const {session, user} = sessionVerified;
    const cardData = req.body.CardData;
    cardData.UserID = user.UserID;
    const card = new Card(await getAsync(`
        UPDATE Cards SET
             CardID = ?, UserID = ?, CardType = ?, Name = ?, Parent = ?,
             HP = ?, Type = ?, DexNo = ?, Breed = ?, Height = ?,
             Weight = ?, Ability = ?, Attacks = ?, Weakness = ?,
             Resistance = ?, RetreatCost = ?, "Set" = ?, SetNumber = ?,
             Rarity = ?, Print = ?, Lore = ?
        WHERE CardID = ? RETURNING *;
    `, [
        cardData.CardID,
        cardData.UserID,
        cardData.CardType,
        cardData.Name,
        cardData.Parent,
        cardData.HP,
        cardData.Type,
        cardData.DexNo,
        cardData.Breed,
        cardData.Height,
        cardData.Weight,
        JSON.stringify(cardData.Ability),
        JSON.stringify(cardData.Attacks),
        cardData.Weakness,
        cardData.Resistance,
        cardData.RetreatCost,
        cardData.Set,
        cardData.SetNumber,
        cardData.Rarity,
        cardData.Print,
        cardData.Lore,
        cardData.CardID
    ]))
    res.status(200).send({card: card});
})

router.delete("/delete", async (req, res) => {

})

export default router;