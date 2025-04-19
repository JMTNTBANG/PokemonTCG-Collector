const fs = require("fs");
const http = require("http");
const mysql = require("mysql2");

const express = require("express");
const session = require("express-session");

const config = require("./config.json");

function connectToMySQL(response, callback) {
  const db = mysql.createConnection({
    host: config.mysql.ip,
    port: config.mysql.port,
    user: config.mysql.username,
    password: config.mysql.password,
  });
  db.connect((err) => {
    if (err) {
      response.send('{err: "Internal Server Error"}');
      response.end();
      if (err.errno == -3008) {
        console.error(
          `No SQL Server Found at ${config.mysql.ip}:${config.mysql.port}. Please update config.json.`
        );
        setTimeout(() => process.exit(1), 1000);
      } else if (err.code == "ETIMEDOUT") {
        console.error(
          `Connection to MySQL Server at ${config.mysql.ip}:${config.mysql.port} Timed Out, Please Confirm Host and Ports are Correct in config.json.`
        );
        setTimeout(() => process.exit(1), 1000);
      } else if (err.errno == 1045) {
        console.error(
          `Access Denied to MySQL Server at ${config.mysql.ip}:${config.mysql.port}, Please Confirm Username and Password are Correct in config.json.`
        );
        setTimeout(() => process.exit(1), 1000);
      } else callback(err, null);
    } else callback(null, db);
  });
}

// Initialize Website
website = express();
website.use(
  session({ secret: "secret", resave: true, saveUninitialized: true })
);
website.use(express.json());
website.use(express.urlencoded({ extended: true }));
website.use(express.static(`${__dirname}static`));

// API Functions
website.post("/databaseFetch", (request, response) => {
  connectToMySQL(response, (err, db) => {
    if (err) {
      response.send({ err: err });
      db.end();
    } else {
      db.query("SELECT * FROM `PokemonTCG`.`Cards`", (err, cards, fields) => {
        if (err) {
          response.send({ err: err });
          db.end();
        } else {
          db.query(
            "SELECT * FROM `PokemonTCG`.`Adjustments`",
            (err, adjustments, fields) => {
              if (err) {
                response.send({ err: err });
              } else {
                response.send({ cards: cards, adjustments: adjustments });
              }
              db.end();
            }
          );
        }
      });
    }
  });
});

website.post("/adjust", (request, response) => {
  const entryID = request.body.entryID;
  const reasonCode = request.body.reasonCode;
  const amount = request.body.amount;
  const value = request.body.value;
  let datePurchased = request.body.PurchaseDate;
  if (datePurchased == "") {
    datePurchased = null;
  }
  connectToMySQL(response, (err, db) => {
    if (err) throw err;
    db.query(
      "INSERT INTO `PokemonTCG`.`Adjustments` (`EntryID`, `ReasonCode`, `Amount`, `ValuePer`, `DatePurchased`) VALUES (?)",
      [[entryID, reasonCode, amount, value, datePurchased]],
      (err, result) => {
        if (err) {
          response.sendCode({ err: err });
        } else {
          response.send({ message: "Success" });
        }
      }
    );
  });
});

website.post(`/edit`, (request, response) => {
  const ID = request.body.ID;
  let sql = {
    CardType: request.body.CardType,
    Name: request.body.Name,
    HP: request.body.HP,
    Type: request.body.Type,
    Variant: request.body.Variant,
    DexNo: request.body.DexNo,
    Breed: request.body.Breed,
    Weight: request.body.Weight,
    Weakness: request.body.Weakness,
    Resistance: request.body.Resistance,
    RetreatCost: request.body.RetreatCost,
    Description: request.body.Description,
    Rarity: request.body.Rarity,
    Set: request.body.Set,
    SetNo: request.body.SetNo,
  };
  let processingAttacks = {};
  for (i in request.body) {
    if (i.startsWith("attack")) {
      if (i.endsWith("Cost")) {
        if (!processingAttacks[i.slice(6, -5)])
          processingAttacks[i.slice(6, -5)] = {};
        let cost = request.body[i].split(", ");
        processingAttacks[i.slice(6, -5)].Cost = cost;
      } else if (i.endsWith("Damage")) {
        if (!processingAttacks[i.slice(6, -7)])
          processingAttacks[i.slice(6, -7)] = {};
        processingAttacks[i.slice(6, -7)].Damage = request.body[i];
      } else if (i.endsWith("Description")) {
        if (!processingAttacks[i.slice(6, -12)])
          processingAttacks[i.slice(6, -12)] = {};
        processingAttacks[i.slice(6, -12)].Description = request.body[i];
      } else if (i.endsWith("Name")) {
        if (!processingAttacks[i.slice(6, -5)])
          processingAttacks[i.slice(6, -5)] = {};
        processingAttacks[i.slice(6, -5)].Name = request.body[i];
      }
    }
  }
  let attacks = [];
  for (i in processingAttacks) {
    attacks.push(processingAttacks[i]);
  }
  sql.Attacks = JSON.stringify(attacks);
  sql.Height =
    parseInt(request.body.HeightFt) * 12 + parseInt(request.body.HeightIn);
  connectToMySQL(response, (err, db) => {
    if (err) throw err;
    if (!ID) {
      db.query(
        "INSERT INTO `PokemonTCG`.`Cards` (`CardType`, `Name`, `HP`, `Type`, `Variant`, `DexNo`, `Breed`, `Height`, `Weight`, `Attacks`, `Weakness`, `Resistance`, `RetreatCost`, `Description`, `Rarity`, `Set`, `SetNo`) VALUES (?)",
        [
          [
            sql.CardType,
            sql.Name,
            sql.HP,
            sql.Type,
            sql.Variant,
            sql.DexNo,
            sql.Breed,
            sql.Height,
            sql.Weight,
            sql.Attacks,
            sql.Weakness,
            sql.Resistance,
            sql.RetreatCost,
            sql.Description,
            sql.Rarity,
            sql.Set,
            sql.SetNo,
          ],
        ],
        (err, result) => {
          if (err) {
            response.send({ err: err });
            return;
          }
          response.send({ message: "Success" });
          db.end();
        }
      );
    } else {
      db.query(
        "UPDATE `PokemonTCG`.`Cards` SET ? WHERE (`ID` = ?);",
        [sql, ID],
        (err, result) => {
          if (err) {
            response.send({ err: err });
            return;
          }
          response.send({ message: "Success" });
          db.end();
        }
      );
    }
  });
});

http.createServer(website).listen(config.port.http, () => {
  console.log(`HTTP Server running on port ${config.port.http}`);
});
