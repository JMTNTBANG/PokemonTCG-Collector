import express from "express";
import sqlite3 from "sqlite3";
import fs from "node:fs"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

import auth from "./routes/auth.ts"
import webClient from "./routes/webClient.ts";


interface PromisifiedGet {
    (sql: string, params?: any[]): Promise<any>;
}
export const getAsync: PromisifiedGet = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        try {
            db.get(sql, params, (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        } catch (error) {
            reject(error);
        }
    });
};
interface PromisifiedAll {
    (sql: string, params?: any[]): Promise<any>;
}
export const allAsync: PromisifiedAll = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        try {
            db.all(sql, params, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        } catch (error) {
            reject(error);
        }
    });
};
interface PromisifiedRun {
    (sql: string): Promise<any>;
}
export const runAsync: PromisifiedRun = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        try {
            db.run(sql, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        } catch (error) {
            reject(error);
        }
    });
};


interface UserData {
    UserID: number
    Username: string
    DateCreated: string | Date
}
export class User implements UserData{
    UserID: number;
    Username: string;
    DateCreated: Date;
    constructor(dbOutput: unknown) {
        if (
            typeof dbOutput === 'object' && dbOutput !== null &&
            'UserID' in dbOutput && typeof (dbOutput as any).UserID === 'number' &&
            'Username' in dbOutput && typeof (dbOutput as any).Username === 'string' &&
            'DateCreated' in dbOutput
        ) {
            const userData = dbOutput as UserData;

            this.UserID = userData.UserID;
            this.Username = userData.Username;

            if (typeof userData.DateCreated === 'string') {
                this.DateCreated = new Date(userData.DateCreated);
            } else {
                this.DateCreated = userData.DateCreated;
            }

        } else {
            throw new Error("Not A User");
        }
    }
}
export async function createUser(username: string, password: string): Promise<User> {
    const idLocation = await getAsync('SELECT * FROM IDLocation WHERE "Table" = ?', ["Users"]);
    let id: number;
    if (typeof(idLocation.Location) === "number") id = idLocation.Location; else throw new Error("Not a Location");
    await getAsync('UPDATE IDLocation SET Location = ? WHERE "Table" = ?', [id + 1, "Users"])
    return new User(await getAsync('INSERT INTO Users (UserID, Username, Password) VALUES (?, ?, ?) RETURNING *', [id, username, password]))
}

interface SessionData {
    SessionID: number;
    UserID: number;
    UUID: string;
    Expiration: string | Date;
    DateCreated: string | Date;
}
export class Session implements SessionData {
    SessionID: number;
    UserID: number;
    UUID: string;
    Expiration: Date;
    DateCreated: Date;
    constructor(dbOutput: unknown) {
        if (
            typeof dbOutput === 'object' && dbOutput !== null &&
            'SessionID' in dbOutput && typeof (dbOutput as any).SessionID === 'number' &&
            'UserID' in dbOutput && typeof (dbOutput as any).UserID === 'number' &&
            'UUID' in dbOutput && typeof (dbOutput as any).UUID === 'string' &&
            'Expiration' in dbOutput &&
            "DateCreated" in dbOutput
        ) {
            const sessionData = dbOutput as SessionData;

            this.SessionID = sessionData.SessionID;
            this.UserID = sessionData.UserID;
            this.UUID = sessionData.UUID;

            if (typeof sessionData.Expiration === 'string') {
                this.Expiration = new Date(sessionData.Expiration);
            } else {
                this.Expiration = sessionData.Expiration;
            }

            if (typeof sessionData.DateCreated === 'string') {
                this.DateCreated = new Date(sessionData.DateCreated);
            } else {
                this.DateCreated = sessionData.DateCreated;
            }

        } else {
            throw new Error("Not A Session");
        }
    }
}
export async function createSession(user: User): Promise<Session> {
    const idLocation = await getAsync('SELECT * FROM IDLocation WHERE "Table" = ?', ["Sessions"]);
    let id: number;
    if (typeof(idLocation.Location) === "number") id = idLocation.Location; else throw Error("Not a Location");
    await getAsync('UPDATE IDLocation SET Location = ? WHERE "Table" = ?', [id + 1, "Sessions"])
    return new Session(await getAsync('INSERT INTO Sessions (SessionID, UserID, UUID, Expiration) VALUES (?, ?, ?, ?) RETURNING *', [id, user.UserID, crypto.randomUUID(), Date.now() + 3600000]))
}

type CardType = "Basic" | "Stage 1" | "Stage 2" | "Trainer" | "Energy"
type Type = "Grass" | "Fire" | "Water" | "Lightning" | "Fighting" | "Psychic" | "Colorless" | "Darkness" | "Metal" | "Dragon" | "Fairy" | "Item" | "Stadium" | "Supporter"
interface Ability {
    Name: string;
    Description: string;
}
interface Attack {
    Cost: Array<Type>;
    Name: string;
    Description: string;
    Damage: number;
    Modifier: "Add" | "Multiply" | null
}
type Rarity = "Common" | "Uncommon" | "Rare" | "Double Rare" | "Ultra Rare" | "Illustration Rare" | "Special Illustration Rare" | "Hyper Rare" | "Promo"
type Print = "Normal" | "Reverse Holo" | "Rare Holo"
interface CardData {
    CardID: number;
    UserID: number;
    CardType: CardType;
    Name: string;
    Parent: Card | null;
    HP: number | null;
    Type: Type;
    DexNo: number | null;
    Breed: string | null;
    Height: number | null;
    Weight: number | null;
    Ability: Ability | null;
    Attacks: Array<Attack> | null;
    Weakness: Type | null;
    Resistance: Type | null;
    RetreatCost: number | null;
    Set: string;
    SetNumber: number;
    Rarity: Rarity;
    Print: Print;
    Lore: string | null;
    DateCreated: string | Date;
}
export class Card implements CardData {
    CardID: number;
    UserID: number;
    CardType: CardType;
    Name: string;
    Parent: Card | null;
    HP: number | null;
    Type: Type;
    DexNo: number | null;
    Breed: string | null;
    Height: number | null;
    Weight: number | null;
    Ability: Ability | null;
    Attacks: Array<Attack> | null;
    Weakness: Type | null;
    Resistance: Type | null;
    RetreatCost: number | null;
    Set: string;
    SetNumber: number;
    Rarity: Rarity;
    Print: Print;
    Lore: string | null;
    DateCreated: Date;
    constructor(dbOutput: unknown) {
        if (
            typeof dbOutput === 'object' && dbOutput !== null &&
            'CardID' in dbOutput && typeof (dbOutput as any).CardID === 'number' &&
            'UserID' in dbOutput && typeof (dbOutput as any).UserID === 'number' &&
            'CardType' in dbOutput && typeof (dbOutput as any).CardType === 'string' &&
            'Name' in dbOutput && typeof (dbOutput as any).Name === 'string' &&
            'Parent' in dbOutput && (typeof (dbOutput as any).Parent === 'object' || (dbOutput as any).Parent === null) &&
            'HP' in dbOutput && (typeof (dbOutput as any).HP === 'number' || (dbOutput as any).HP === null) &&
            'Type' in dbOutput && typeof (dbOutput as any).Type === 'string' &&
            'DexNo' in dbOutput && (typeof (dbOutput as any).DexNo === 'number' || (dbOutput as any).DexNo === null) &&
            'Breed' in dbOutput && (typeof (dbOutput as any).Breed === 'string' || (dbOutput as any).Breed === null) &&
            'Height' in dbOutput && (typeof (dbOutput as any).Height === 'number' || (dbOutput as any).Height === null) &&
            'Weight' in dbOutput && (typeof (dbOutput as any).Weight === 'number' || (dbOutput as any).Weight === null) &&
            'Ability' in dbOutput && (typeof (dbOutput as any).Ability === 'object' || (dbOutput as any).Ability === null) &&
            'Attacks' in dbOutput && (Array.isArray((dbOutput as any).Attacks) || (dbOutput as any).Attacks === null) &&
            'Weakness' in dbOutput && (typeof (dbOutput as any).Weakness === 'string' || (dbOutput as any).Weakness === null) &&
            'Resistance' in dbOutput && (typeof (dbOutput as any).Resistance === 'string' || (dbOutput as any).Resistance === null) &&
            'RetreatCost' in dbOutput && (typeof (dbOutput as any).RetreatCost === 'number' || (dbOutput as any).RetreatCost === null) &&
            'Set' in dbOutput && typeof (dbOutput as any).Set === 'string' &&
            'SetNumber' in dbOutput && typeof (dbOutput as any).SetNumber === 'number' &&
            'Rarity' in dbOutput && typeof (dbOutput as any).Rarity === 'string' &&
            'Print' in dbOutput && typeof (dbOutput as any).Print === 'string' &&
            'Lore' in dbOutput && (typeof (dbOutput as any).Lore === 'string' || (dbOutput as any).Lore === null) &&
            'DateCreated' in dbOutput
        ) {
            const cardData = dbOutput as CardData;

            this.CardID = cardData.CardID;
            this.UserID = cardData.UserID;
            this.CardType = cardData.CardType;
            this.Name = cardData.Name;
            this.Parent = cardData.Parent;
            this.HP = cardData.HP;
            this.Type = cardData.Type;
            this.DexNo = cardData.DexNo;
            this.Breed = cardData.Breed;
            this.Height = cardData.Height;
            this.Weight = cardData.Weight;
            this.Ability = cardData.Ability;
            this.Attacks = cardData.Attacks;
            this.Weakness = cardData.Weakness;
            this.Resistance = cardData.Resistance;
            this.RetreatCost = cardData.RetreatCost;
            this.Set = cardData.Set;
            this.SetNumber = cardData.SetNumber;
            this.Rarity = cardData.Rarity;
            this.Print = cardData.Print;
            this.Lore = cardData.Lore;

            if (typeof cardData.DateCreated === 'string') {
                this.DateCreated = new Date(cardData.DateCreated);
            } else {
                this.DateCreated = cardData.DateCreated;
            }

        } else {
            throw new Error("Not A Card");
        }
    }
}
export async function createCard(user: User, cardData: CardData): Promise<Card> {
    const idLocation = await getAsync('SELECT * FROM IDLocation WHERE "Table" = ?', ["Cards"]);
    let id: number;
    if (typeof(idLocation.Location) === "number") id = idLocation.Location; else throw Error("Not a Card");
    await getAsync('UPDATE IDLocation SET Location = ? WHERE "Table" = ?', [id + 1, "Cards"])
    return new Card(await getAsync('INSERT INTO Cards (CardID, UserID, CardType, Name, Parent, HP, Type, DexNo, Breed, Height, Weight, Ability, Attacks, Weakness, Resistance, RetreatCost, Set, SetNumber, Rarity, Print, Lore) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) RETURNING *', [id, user.UserID, cardData.CardType, cardData.Name, JSON.stringify(cardData.Parent), cardData.HP, cardData.Type, cardData.DexNo, cardData.Breed, cardData.Height, cardData.Weight, JSON.stringify(cardData.Ability), JSON.stringify(cardData.Attacks), cardData.Weakness, cardData.Resistance, cardData.RetreatCost, cardData.Set, cardData.SetNumber, cardData.Rarity, cardData.Print, cardData.Lore]))
}

type AdjustmentReason = "Received" | "Sold" | "Donation" | "Lost"
interface AdjustmentData {
    AdjustmentID: number;
    CardID: number;
    UserID: number;
    Amount: number;
    ReasonCode: AdjustmentReason;
    DateCreated: string | Date;
}
export class Adjustment implements AdjustmentData {
    AdjustmentID: number;
    CardID: number;
    UserID: number;
    Amount: number;
    ReasonCode: AdjustmentReason;
    DateCreated: Date;

    constructor(dbOutput: unknown) {
        if (
            typeof dbOutput === 'object' && dbOutput !== null &&
            'AdjustmentID' in dbOutput && typeof (dbOutput as any).AdjustmentID === 'number' &&
            'CardID' in dbOutput && typeof (dbOutput as any).CardID === 'number' &&
            'UserID' in dbOutput && typeof (dbOutput as any).UserID === 'number' &&
            'Amount' in dbOutput && typeof (dbOutput as any).Amount === 'number' &&
            'ReasonCode' in dbOutput && typeof (dbOutput as any).ReasonCode === 'string' &&
            'DateCreated' in dbOutput
        ) {
            const adjustmentData = dbOutput as AdjustmentData;

            this.AdjustmentID = adjustmentData.AdjustmentID;
            this.CardID = adjustmentData.CardID;
            this.UserID = adjustmentData.UserID;
            this.Amount = adjustmentData.Amount;
            this.ReasonCode = adjustmentData.ReasonCode;

            if (typeof adjustmentData.DateCreated === 'string') {
                this.DateCreated = new Date(adjustmentData.DateCreated);
            } else {
                this.DateCreated = adjustmentData.DateCreated;
            }

        } else {
            throw new Error("Not an Adjustment");
        }
    }
}
export async function createAdjustment(user: User, card: Card, adjustmentData: AdjustmentData): Promise<Adjustment> {
    const idLocation = await getAsync('SELECT * FROM IDLocation WHERE "Table" = ?', ["Adjustments"]);
    let id: number;
    if (typeof(idLocation.Location) === "number") id = idLocation.Location; else throw Error("Not an Adjustment");
    await getAsync('UPDATE IDLocation SET Location = ? WHERE "Table" = ?', [id + 1, "Adjustments"])
    return new Adjustment(await getAsync('INSERT INTO Adjustments (AdjustmentID, CardID, UserID, Amount, ReasonCode) VALUES (?,?,?,?,?) RETURNING *', [id, card.CardID, user.UserID, adjustmentData.Amount, adjustmentData.ReasonCode]))
}

const server: express.Application = express();
const port: number = 80;
const endpoint: string = "/"
const initialized: boolean = fs.existsSync('server/config/database.db')

export const db: sqlite3.Database = new sqlite3.Database("server/config/database.db");

if (!initialized) {
    try {
        await runAsync("CREATE TABLE IDLocation ( 'Table' VARCHAR(255) PRIMARY KEY, Location INT DEFAULT 0 )")
        await runAsync("INSERT INTO IDLocation ('Table') VALUES ('Users')")
        await runAsync("INSERT INTO IDLocation ('Table') VALUES ('Sessions')")
        await runAsync("INSERT INTO IDLocation ('Table') VALUES ('Cards')")
        await runAsync("INSERT INTO IDLocation ('Table') VALUES ('Adjustments')")
        await runAsync("CREATE TABLE Users ( UserID INT PRIMARY KEY, Username VARCHAR(255), Password VARCHAR(255), DateCreated DATETIME DEFAULT current_timestamp )")
        await runAsync("CREATE TABLE Sessions ( SessionID INT PRIMARY KEY, UserID INT, UUID VARCHAR(255), Expiration DATETIME, DateCreated DATETIME DEFAULT current_timestamp )")
        await runAsync("CREATE TABLE Cards ( CardID INT PRIMARY KEY, UserID INT, CardType VARCHAR(255), Name VARCHAR(255), Parent JSON, HP INT, Type VARCHAR(255), DexNo INT, Breed VARCHAR(255), Height VARCHAR(255), Weight VARCHAR(255), Ability JSON, Attacks JSON, Weakness VARCHAR(255), Resistance VARCHAR(255), RetreatCost INT, 'Set' VARCHAR(255), SetNumber INT, Rarity VARCHAR(255), Print VARCHAR(255), Lore VARCHAR(255), DateCreated DATETIME DEFAULT current_timestamp )")
        await runAsync("CREATE TABLE Adjustments ( AdjustmentID INT PRIMARY KEY, CardID INT, UserID INT, Amount INT, ReasonCode VARCHAR(255), DateCreated DATETIME DEFAULT current_timestamp )")
    } catch (error) {
        console.error('Error Initializing Database:', error);
    }
}

try {
    server.use(express.json());
    server.use(express.urlencoded({extended: true}));
    server.use(express.static(`${__dirname}static`));
    server.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
        next();
    });

    server.use("/auth", auth)
    server.use('/web', webClient)

    server.listen(port, () => {
        console.log(`Server Ready`)
    })
} catch (error) {
    console.error('Error Starting Server:', error);
}