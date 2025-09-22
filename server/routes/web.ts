import express from 'express';
import {fileURLToPath} from "url";
import {dirname} from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

const router: express.Router = express.Router();
router.get("/", async (req, res) => {
    res.sendFile(`${__dirname.slice(0, -13)}client/index.html`)
})
router.get("/styles", (req, res) => {
    res.sendFile(`${__dirname.slice(0, -13)}client/styles.css`)
})
router.get("/script", (req, res) => {
    res.sendFile(`${__dirname.slice(0, -13)}client/script.js`)
})
router.get("/favicon", (req, res) => {
    res.sendFile(`${__dirname.slice(0, -13)}client/favicon.ico`)
})

export default router;