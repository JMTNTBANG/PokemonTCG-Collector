const func = require("../../static/func.js");

module.exports = {
  init: (prefix, website) => {
    website.post(`${prefix}saveEntry`, (request, response) => {
      if (!request.session.poketcg || !request.session.poketcg.authenticated) {
        response.redirect(`${prefix}`);
      } else {
        const ID = request.body.ID;
        let sql = {
          CardType: request.body.CardType,
          Name: request.body.Name,
          HP: request.body.HP,
          Type: request.body.Type,
          Variant: request.body.Variant,
          DexNo: request.body.DexNo,
          Breed: request.body.Breed,
          Height: request.body.Height,
          Weight: request.body.Weight,
          Weakness: request.body.Weakness,
          Resistance: request.body.Resistance,
          RetreatCost: request.body.RetreatCost,
          Description: request.body.Description,
          Rarity: request.body.Rarity,
          Set: request.body.Set,
          SetNo: request.body.SetNo
        };
        let processingAttacks = {}
        for (i in request.body) {
          if (i.startsWith("attack")) {
            if (i.endsWith("Cost")) {
              if (!processingAttacks[i.slice(6,-5)]) processingAttacks[i.slice(6,-5)] = {}
              let cost = request.body[i].split(", ")
              processingAttacks[i.slice(6,-5)].Cost = cost
            } else if (i.endsWith("Damage")) {
              if (!processingAttacks[i.slice(6,-7)]) processingAttacks[i.slice(6,-7)] = {}
              processingAttacks[i.slice(6,-7)].Damage = request.body[i]
            } else if (i.endsWith("Description")) {
              if (!processingAttacks[i.slice(6,-12)]) processingAttacks[i.slice(6,-12)] = {}
              processingAttacks[i.slice(6,-12)].Description = request.body[i]
            } else if (i.endsWith("Name")) {
              if (!processingAttacks[i.slice(6,-5)]) processingAttacks[i.slice(6,-5)] = {}
              processingAttacks[i.slice(6,-5)].Name = request.body[i]
            }
          }
        }
        let attacks = []
        for (i in processingAttacks) {
          attacks.push(processingAttacks[i])
        }
        sql.Attacks = JSON.stringify(attacks)
        func.connectToMySQL(response, (err, db) => {
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
                  sql.SetNo
                ],
              ],
              (err, result) => {
                if (err) {
                  response.send(func.sendError(err));
                  return;
                }
                response.send(`<script>window.close()</script>`);
              }
            );
          } else {
            db.query(
              "UPDATE `PokemonTCG`.`Cards` SET ? WHERE (`ID` = ?);",
              [sql, ID],
              (err, result) => {
                if (err) {
                  response.send(func.sendError(err));
                  return;
                }
                response.send(`<script>window.close()</script>`);
              }
            );
          }
        });
      }
    });
  },
};
