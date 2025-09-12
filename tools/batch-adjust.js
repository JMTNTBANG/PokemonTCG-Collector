const readline = require("readline-sync");

if (err) throw err;
let start = readline.question("Please enter starting amount: ");
let stop = readline.question("Please enter stopping amount: ");
let loop = readline.question("Loop? (y/n) ");
if (loop == "y") loop = true;
else loop = false;
let amt;
let code;
if (loop) {
  amt = readline.question("Please enter Adjustment amount: ");
  code = readline.question("Please enter Adjustment Code: ");
}
let i = start;
let sql = "";
while (i < parseInt(stop) + 1) {
  if (!loop) {
    amt = readline.question(`Please enter Adjustment amount (${i}): `);
    code = readline.question(`Please enter Adjustment Code (${i}): `);
  }
  sql += `INSERT INTO PokemonTCG.Adjustments (\`EntryID\`, \`ReasonCode\`, \`Amount\`, \`ValuePer\`) VALUES (${i}, ${code}, ${amt}, 0);\n`;
  i++;
}

console.log(sql);
