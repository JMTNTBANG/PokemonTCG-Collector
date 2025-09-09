import express from "express";
import sqlite3 from "sqlite3";
import fs from "node:fs"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

import auth from "./routes/auth.ts"


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
        await runAsync("CREATE TABLE Users ( UserID INT PRIMARY KEY, Username VARCHAR(255), Password VARCHAR(255), DateCreated DATETIME DEFAULT current_timestamp )")
        await runAsync("CREATE TABLE Sessions ( SessionID INT PRIMARY KEY, UserID INT, UUID VARCHAR(255), Expiration DATETIME, DateCreated DATETIME DEFAULT current_timestamp )")
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

    server.listen(port, () => {
        console.log(`Server Ready`)
    })
} catch (error) {
    console.error('Error Starting Server:', error);
}