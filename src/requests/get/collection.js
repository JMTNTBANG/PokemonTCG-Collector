const func = require("../../static/func");
const package = require("../../../package.json");

module.exports = {
  init: (prefix, website) => {
    website.get(`${prefix}collection`, (request, response) => {
      if (!request.session.poketcg || !request.session.poketcg.authenticated) {
        response.redirect(
          `${prefix}?redirect=${encodeURIComponent(request.url.slice(1))}`
        );
      } else {
        func.connectToMySQL(response, (err, db) => {
          if (err) throw err;
          db.query("SELECT * FROM PokemonTCG.Cards", (err, results, fields) => {
            if (err) {
              response.send(func.sendError(err));
              return;
            }
            db.query(
              "SELECT * FROM PokemonTCG.Adjustments",
              (err, adjustments, x) => {
                if (err) {
                  response.send(func.sendError(err));
                  return;
                }
                let hiddenColumns = [
                  "ID",
                  "HP",
                  "DexNo",
                  "Height",
                  "Weight",
                  "Attacks",
                  "Weakness",
                  "Resistance",
                  "Description",
                  "RetreatCost",
                  "Rarity",
                  "DateAdded",
                  "Type"
                ];
                let header = [];
                header.push("Actions", "Qty", "Type");
                for (field in fields) {
                  if (hiddenColumns.includes(fields[field].name)) continue;
                  header.push(fields[field].name);
                }
                let data = [];
                let cards = [];
                for (row in results) {
                  cards.push([row, results[row]]);
                }
                cards.sort((a, b) => a[1].SetNo - b[1].SetNo)
                cards.sort((a, b) => {
                  if (a[1].Set.toLowerCase() < b[1].Set.toLowerCase()) {return -1;}
                  if (a[1].Set.toLowerCase() > b[1].Set.toLowerCase()) {return 1;}
                  return 0;
                });
                for (row of cards) {
                  let qty = 0;
                  for (adj in adjustments) {
                    if (adjustments[adj].EntryID == row[1].ID) {
                      qty += adjustments[adj].Amount;
                    }
                  }
                  let i = [];
                  i.push(`%ID%${row[1].ID}\\nDetails`, qty);
                  i.push(`%IMG%${row[1].Type}\\n`);
                  for (column in row[1]) {
                    if (hiddenColumns.includes(column)) continue;
                    let newColumn = row[1][column];
                    if (!newColumn) newColumn = " ";
                    i.push(newColumn);
                  }
                  data.push(i);
                }
                response.render(
                  `${__dirname.slice(0, -13)}/static/collection.html`,
                  {
                    version: package.version,
                    username: request.session.poketcg.username,
                    totalGames: results.length,
                    header: JSON.stringify(header),
                    data: JSON.stringify(data),
                  }
                );
                db.end();
              }
            );
          });
        });
      }
    });
  },
};
