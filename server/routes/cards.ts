import express from 'express';
import {verifySession} from "../util.js";
import {allAsync, Card, createCard, getAsync, runAsync} from "../main.js";

const router: express.Router = express.Router();

router.post("/retrieve", async (req, res) => {
    const sessionVerified = await verifySession(req, res)
    if (!sessionVerified) return;
    const {session, user} = sessionVerified;
    try {
        let cards = await allAsync('SELECT * FROM Cards WHERE UserID = ?', [user.UserID]);
        let adjustments = await allAsync('SELECT * FROM Adjustments WHERE UserID = ?', [user.UserID]);
        let adjProcessing: { [key: number]: number } = {}
        for (let qty of adjustments) {
            if (!adjProcessing[qty.CardID]) {
                adjProcessing[qty.CardID] = 0
            }
            adjProcessing[qty.CardID] += qty.Amount
        }
        for (let i = 0; i < cards.length; i++) {
            if (adjProcessing[cards[i].CardID]) {
                cards[i].Qty = adjProcessing[cards[i].CardID];
            } else {
                cards[i].Qty = 0
            }
            cards[i] = new Card(cards[i])
        }
        res.status(200).send({cards: cards});
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send({status: 500, error: error.message});
        }
    }
})

router.put("/create", async (req, res) => {
    const sessionVerified = await verifySession(req, res)
    if (!sessionVerified) return;
    const {session, user} = sessionVerified;
    const cardData = req.body.CardData;
    if (!cardData) {
        res.status(400).send({status: 400, error: "Missing Card Data"});
        return;
    }
    try {
        cardData.CardID = -1
        cardData.UserID = user.UserID;
        cardData.Qty = -1
        new Card(cardData)
        let card = await createCard(user, cardData)
        res.status(200).send({card: card});
    } catch (error) {
        res.status(422).send({status: 422, error: "Not Valid Card Data"});
    }
})

router.put("/update", async (req, res) => {
    const sessionVerified = await verifySession(req, res)
    if (!sessionVerified) return;
    const {session, user} = sessionVerified;
    const cardData = req.body.CardData;
    if (!cardData) {
        res.status(400).send({status: 400, error: "Missing Card Data"});
        return;
    }
    try {
        cardData.UserID = user.UserID;
        cardData.Qty = -1
        new Card(cardData)
        let card = await getAsync(`UPDATE Cards SET CardID = ?, UserID = ?, CardType = ?, Name = ?, Parent = ?, HP = ?, Type = ?, DexNo = ?, Breed = ?, Height = ?, Weight = ?, Ability = ?, Attacks = ?, Weakness = ?, Resistance = ?, RetreatCost = ?, "Set" = ?, SetNumber = ?, Rarity = ?, Print = ?, Lore = ? WHERE CardID = ? RETURNING *;`, [cardData.CardID, cardData.UserID, cardData.CardType, cardData.Name, cardData.Parent, cardData.HP, cardData.Type, cardData.DexNo, cardData.Breed, cardData.Height, cardData.Weight, JSON.stringify(cardData.Ability), JSON.stringify(cardData.Attacks), cardData.Weakness, cardData.Resistance, cardData.RetreatCost, cardData.Set, cardData.SetNumber, cardData.Rarity, cardData.Print, cardData.Lore, cardData.CardID])
        card.Qty = -1
        card = new Card(card)
        res.status(200).send({card: card});
    } catch (error) {
        res.status(422).send({status: 422, error: "Not Valid Card Data"});
    }
})

router.delete("/delete", async (req, res) => {
    const sessionVerified = await verifySession(req, res)
    if (!sessionVerified) return;
    const {session, user} = sessionVerified;
    const cardID = req.body.CardID;
    if (cardID === undefined) {
        res.status(400).send({status: 400, error: "Missing Card ID"});
        return;
    }
    try {
        await runAsync(`DELETE FROM Cards WHERE CardID = ${cardID}`);
        res.status(200).send({message: "Success"})
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send({status: 500, error: error.message});
        }
    }
})

export default router;