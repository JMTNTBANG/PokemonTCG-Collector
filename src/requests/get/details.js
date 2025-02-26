const func = require("../../static/func");
const url = require("url");

module.exports = {
  init: (prefix, website) => {
    website.get(`${prefix}details`, (request, response) => {
      if (!request.session.poketcg || !request.session.poketcg.authenticated) {
        response.redirect(`${prefix}?redirect=${encodeURIComponent(request.url.slice(1))}`);
      } else {
        let query = url.parse(request.url, true).query;
        if (!query.entryID) {
          response.render(`${__dirname.slice(0, -13)}/static/details.html`, {
            ID: "",
            CardType: "",
            Name: "",
            HP: "",
            Type: "",
            Variant: "",
            DexNo: "",
            Breed: "",
            Height: "",
            Weight: "",
            Weakness: "",
            Resistance: "",
            RetreatCost: "",
            Description: "",
            Rarity: "",
            Set: "",
            SetNo: "",
            Attacks: "[]"
          });
        } else {
          func.connectToMySQL(response, (err, db) => {
            if (err) throw err;
            db.query(
              "SELECT * FROM PokemonTCG.Cards WHERE `ID` = ?",
              [query.entryID],
              (err, results, fields) => {
                if (err) {
                  response.send(func.sendError(err));
                  return;
                }
                const entry = results[0];
                response.render(
                  `${__dirname.slice(0, -13)}/static/details.html`,
                  {
                    ID: entry.ID,
                    CardType: entry.CardType,
                    Name: entry.Name,
                    HP: entry.HP,
                    Type: entry.Type,
                    Variant: entry.Variant,
                    DexNo: entry.DexNo,
                    Breed: entry.Breed,
                    Height: entry.Height,
                    Weight: entry.Weight,
                    Weakness: entry.Weakness,
                    Resistance: entry.Resistance,
                    RetreatCost: entry.RetreatCost,
                    Description: entry.Description,
                    Rarity: entry.Rarity,
                    Set: entry.Set,
                    SetNo: entry.SetNo,
                    Attacks: encodeURIComponent(JSON.stringify(entry.Attacks))
                  }
                );
              }
            );
          });
        }
      }
    });
  },
};
