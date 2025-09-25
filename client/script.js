// Dialog Pages
const detailsHTML = `
        <head>
            <title>
                Create Card - PokémonTCG Collector
            </title>
            <style>
                body {
                    font-family: "Roboto Light", Helvetica, sans-serif;
                }
                table {
                    border-collapse: collapse;
                    width: 100%;
                    padding: 10px
                }
                th {
                    background-color: lightgray;
                }
                td {
                    background-color: darkgray;
                }
                th, td {
                    padding: 5px 10px;
                    border: gray solid 3px;
                }
                select, input, textarea {
                    height: 100%;
                    width: 100%;
                    border: none;
                    font-size: 1em;
                    background-color: darkgray;
                }
                textarea {
                    height: 85px;
                    resize: vertical;
                    font-family: "Roboto Light", Helvetica, sans-serif;
                }
                option {
                    background-color: lightgray;
                }
                input[type=number]::-webkit-inner-spin-button,
                input[type=number]::-webkit-outer-spin-button {
                   opacity: 1;
                }
                .editButton {
                    border: none;
                    font-size: 1em;
                    background-color: darkgray;
                    width: 30px;
                    float: right;
                }
                .screen {
                    left: 0;
                    top: 0;
                    position: fixed;
                    width: 100%;
                    height: 100%;
                }
            </style>
        </head>
        <body>
        <div id="details_screen" class="screen" style="display: flex; justify-content: space-around">
            <div id="details">
                <br>
                <span style="font-size: 2.5em; font-weight: bold; margin: 25px">Details</span>
                <br>
                <br>
                <table>
                    <tr>
                        <th>
                            Card Type
                        </th>
                        <td>
                            <select id="card_card_type" name="card_card_type">
                                <option value="Basic">Basic</option>
                                <option value="Stage 1">Stage 1</option>
                                <option value="Stage 2">Stage 2</option>
                                <option value="Trainer">Trainer</option>
                                <option value="Energy">Energy</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Name
                        </th>
                        <td>
                            <input type="text" id="card_name" name="card_name">
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Parent
                        </th>
                        <td>
                            <select id="card_parent" name="card_parent">
                                <option value="-1"></option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>
                            HP
                        </th>
                        <td>
                            <input type="number" id="card_hp" name="card_hp">
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Type
                        </th>
                        <td>
                            <select id="card_type" name="card_type">
                                <option value="Grass">Grass</option>
                                <option value="Fire">Fire</option>
                                <option value="Water">Water</option>
                                <option value="Lightning">Lightning</option>
                                <option value="Fighting">Fighting</option>
                                <option value="Psychic">Psychic</option>
                                <option value="Colorless">Colorless</option>
                                <option value="Darkness">Darkness</option>
                                <option value="Metal">Metal</option>
                                <option value="Dragon">Dragon</option>
                                <option value="Fairy">Fairy</option>
                                <option value="Item">Item</option>
                                <option value="Stadium">Stadium</option>
                                <option value="Supporter">Supporter</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Pokédex No
                        </th>
                        <td>
                            <input type="number" id="card_dexno" name="card_dexno">
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Breed
                        </th>
                        <td>
                            <input type="text" id="card_breed" name="card_breed">
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Height
                        </th>
                        <td>
                            <input type="number" id="card_height_ft" name="card_height_ft" style="width: 10%">'
                            <input type="number" id="card_height_in" name="card_height_in" style="width: 10%">"
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Weight
                        </th>
                        <td>
                            <input type="number" id="card_weight" name="card_weight"></input>
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Ability
                        </th>
                        <td>
                            <input type="text" id="card_ability" name="card_ability" style="width: 90%">
                            <button id="card_ability_edit" class="editButton">&#9998;</button>
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Attacks
                        </th>
                        <td>
                            <input type="text" id="card_attacks" name="card_attacks" style="width: 90%">
                            <button id="card_attacks_edit" class="editButton">&#9998;</button>
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Weakness
                        </th>
                        <td>
                            <select id="card_weakness" name="card_weakness">
                                <option></option>
                                <option value="Grass">Grass</option>
                                <option value="Fire">Fire</option>
                                <option value="Water">Water</option>
                                <option value="Lightning">Lightning</option>
                                <option value="Fighting">Fighting</option>
                                <option value="Psychic">Psychic</option>
                                <option value="Colorless">Colorless</option>
                                <option value="Darkness">Darkness</option>
                                <option value="Metal">Metal</option>
                                <option value="Dragon">Dragon</option>
                                <option value="Fairy">Fairy</option>
                                <option value="Item">Item</option>
                                <option value="Stadium">Stadium</option>
                                <option value="Supporter">Supporter</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Resistance
                        </th>
                        <td>
                            <select id="card_resistance" name="card_resistance">
                                <option></option>
                                <option value="Grass">Grass</option>
                                <option value="Fire">Fire</option>
                                <option value="Water">Water</option>
                                <option value="Lightning">Lightning</option>
                                <option value="Fighting">Fighting</option>
                                <option value="Psychic">Psychic</option>
                                <option value="Colorless">Colorless</option>
                                <option value="Darkness">Darkness</option>
                                <option value="Metal">Metal</option>
                                <option value="Dragon">Dragon</option>
                                <option value="Fairy">Fairy</option>
                                <option value="Item">Item</option>
                                <option value="Stadium">Stadium</option>
                                <option value="Supporter">Supporter</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Retreat Cost
                        </th>
                        <td>
                            <input type="number" id="card_retreat_cost" name="card_retreat_cost"></input>
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Set
                        </th>
                        <td>
                            <select id="card_set" name="card_set"></select>
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Set Number
                        </th>
                        <td>
                            <input type="number" id="card_set_number" name="card_set_number"></input>
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Rarity
                        </th>
                        <td>
                            <select id="card_rarity" name="card_rarity">
                                <option value="Common">Common</option>
                                <option value="Uncommon">Uncommon</option>
                                <option value="Rare">Rare</option>
                                <option value="Double Rare">Double Rare</option>
                                <option value="Ultra Rare">Ultra Rare</option>
                                <option value="Illustration Rare">Illustration Rare</option>
                                <option value="Special Illustration Rare">Special Illustration Rare</option>
                                <option value="Hyper Rare">Hyper Rare</option>
                                <option value="Promo">Promo</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Print
                        </th>
                        <td>
                            <select id="card_print" name="card_print">
                                <option value="Normal">Normal</option>
                                <option value="Reverse Holo">Reverse Holo</option>
                                <option value="Rare Holo">Rare Holo</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Lore
                        </th>
                        <td>
                            <textarea id="card_lore" name="card_lore"></textarea>
                        </td>
                    </tr>
                </table>
                <br>
                <br>
                <center><button id="card_save" style="height: 50px; width: 125px; font-size: 1.5em; margin: 0 20px 15px 0">Save</button><button id="card_delete" style="height: 50px; width: 125px; font-size: 1.5em; margin: 0 20px 15px 0">Delete</button></center>
            </div>
            <div id="ocr">
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
                <center><button id="card_ocr" "height: 50px; width: 125px; font-size: 1.5em; margin: 0 20px 15px 0">OCR</button></center>
                <center><video id="video_box"></video></center>
                <canvas id="photo_box" style="display: none"></canvas>
                <center><button id="scan_button" style="display:none;">Scan</button></center>
                <center><p id="ocr_result"></p></center>
            </div>
        </div>
        <div id="ability_screen" class="screen" style="display: none;">
            <br>
            <span style="font-size: 2.5em; font-weight: bold; margin: 25px">Edit Ability</span>
            <br>
            <br>
            <table>
                <tr>
                    <th>Name</th>
                    <td>
                        <input type="text" id="ability_name" name="ability_name">
                    </td>
                </tr>
                <tr>
                    <th>Description</th>
                    <td>
                        <textarea id="ability_description" name="ability_description"></textarea>
                    </td>
                </tr>
            </table>
            <br>
            <br>
            <center><button id="ability_save" style="height: 50px; width: 125px; font-size: 1.5em; margin: 0 20px 15px 0">Save</button></center>
        </div>
        <div id="attacks_screen" class="screen" style="display: none;">
            <br>
            <span style="font-size: 2.5em; font-weight: bold; margin: 25px">Edit Attacks</span>
            <br>
            <br>
            <table id="card_attack_1">
                <tr>
                    <th>Cost</th>
                    <td>
                        <select id="card_attack_1_cost_1" name="card_attack_1_cost_1" style="width: 100px">
                            <option></option>
                            <option value="Grass">Grass</option>
                            <option value="Fire">Fire</option>
                            <option value="Water">Water</option>
                            <option value="Lightning">Lightning</option>
                            <option value="Fighting">Fighting</option>
                            <option value="Psychic">Psychic</option>
                            <option value="Colorless">Colorless</option>
                            <option value="Darkness">Darkness</option>
                            <option value="Metal">Metal</option>
                            <option value="Dragon">Dragon</option>
                            <option value="Fairy">Fairy</option>
                        </select>
                        <select id="card_attack_1_cost_2" name="card_attack_1_cost_2" style="width: 100px">
                            <option></option>
                            <option value="Grass">Grass</option>
                            <option value="Fire">Fire</option>
                            <option value="Water">Water</option>
                            <option value="Lightning">Lightning</option>
                            <option value="Fighting">Fighting</option>
                            <option value="Psychic">Psychic</option>
                            <option value="Colorless">Colorless</option>
                            <option value="Darkness">Darkness</option>
                            <option value="Metal">Metal</option>
                            <option value="Dragon">Dragon</option>
                            <option value="Fairy">Fairy</option>
                        </select>
                        <select id="card_attack_1_cost_3" name="card_attack_1_cost_3" style="width: 100px">
                            <option></option>
                            <option value="Grass">Grass</option>
                            <option value="Fire">Fire</option>
                            <option value="Water">Water</option>
                            <option value="Lightning">Lightning</option>
                            <option value="Fighting">Fighting</option>
                            <option value="Psychic">Psychic</option>
                            <option value="Colorless">Colorless</option>
                            <option value="Darkness">Darkness</option>
                            <option value="Metal">Metal</option>
                            <option value="Dragon">Dragon</option>
                            <option value="Fairy">Fairy</option>
                        </select>
                        <select id="card_attack_1_cost_4" name="card_attack_1_cost_4" style="width: 100px">
                            <option></option>
                            <option value="Grass">Grass</option>
                            <option value="Fire">Fire</option>
                            <option value="Water">Water</option>
                            <option value="Lightning">Lightning</option>
                            <option value="Fighting">Fighting</option>
                            <option value="Psychic">Psychic</option>
                            <option value="Colorless">Colorless</option>
                            <option value="Darkness">Darkness</option>
                            <option value="Metal">Metal</option>
                            <option value="Dragon">Dragon</option>
                            <option value="Fairy">Fairy</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>Name</th>
                    <td>
                        <input type="text" id="card_attack_1_name" name="card_attack_1_name">
                    </td>
                </tr>
                <tr>
                    <th>Damage</th>
                    <td>
                        <input type="number" id="card_attack_1_damage" name="card_attack_1_damage" style="width: 50px;" dir="rtl">
                        <select id="card_attack_1_modifier" name="card_attack_1_modifier" style="width: 30px">
                            <option></option>
                            <option value="Add">+</option>
                            <option value="Multiply">x</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>Description</th>
                    <td>
                        <textarea id="card_attack_1_description" name="card_attack_1_description"></textarea>
                    </td>
                </tr>
            </table>
            <table id="card_attack_2">
                <tr>
                    <th>Cost</th>
                    <td>
                        <select id="card_attack_2_cost_1" name="card_attack_2_cost_1" style="width: 100px">
                            <option></option>
                            <option value="Grass">Grass</option>
                            <option value="Fire">Fire</option>
                            <option value="Water">Water</option>
                            <option value="Lightning">Lightning</option>
                            <option value="Fighting">Fighting</option>
                            <option value="Psychic">Psychic</option>
                            <option value="Colorless">Colorless</option>
                            <option value="Darkness">Darkness</option>
                            <option value="Metal">Metal</option>
                            <option value="Dragon">Dragon</option>
                            <option value="Fairy">Fairy</option>
                        </select>
                        <select id="card_attack_2_cost_2" name="card_attack_2_cost_2" style="width: 100px">
                            <option></option>
                            <option value="Grass">Grass</option>
                            <option value="Fire">Fire</option>
                            <option value="Water">Water</option>
                            <option value="Lightning">Lightning</option>
                            <option value="Fighting">Fighting</option>
                            <option value="Psychic">Psychic</option>
                            <option value="Colorless">Colorless</option>
                            <option value="Darkness">Darkness</option>
                            <option value="Metal">Metal</option>
                            <option value="Dragon">Dragon</option>
                            <option value="Fairy">Fairy</option>
                        </select>
                        <select id="card_attack_2_cost_3" name="card_attack_2_cost_3" style="width: 100px">
                            <option></option>
                            <option value="Grass">Grass</option>
                            <option value="Fire">Fire</option>
                            <option value="Water">Water</option>
                            <option value="Lightning">Lightning</option>
                            <option value="Fighting">Fighting</option>
                            <option value="Psychic">Psychic</option>
                            <option value="Colorless">Colorless</option>
                            <option value="Darkness">Darkness</option>
                            <option value="Metal">Metal</option>
                            <option value="Dragon">Dragon</option>
                            <option value="Fairy">Fairy</option>
                        </select>
                        <select id="card_attack_2_cost_4" name="card_attack_2_cost_4" style="width: 100px">
                            <option></option>
                            <option value="Grass">Grass</option>
                            <option value="Fire">Fire</option>
                            <option value="Water">Water</option>
                            <option value="Lightning">Lightning</option>
                            <option value="Fighting">Fighting</option>
                            <option value="Psychic">Psychic</option>
                            <option value="Colorless">Colorless</option>
                            <option value="Darkness">Darkness</option>
                            <option value="Metal">Metal</option>
                            <option value="Dragon">Dragon</option>
                            <option value="Fairy">Fairy</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>Name</th>
                    <td>
                        <input type="text" id="card_attack_2_name" name="card_attack_2_name">
                    </td>
                </tr>
                <tr>
                    <th>Damage</th>
                    <td>
                        <input type="number" id="card_attack_2_damage" name="card_attack_2_damage" style="width: 50px;" dir="rtl">
                        <select id="card_attack_2_modifier" name="card_attack_2_modifier" style="width: 30px">
                            <option></option>
                            <option value="Add">+</option>
                            <option value="Multiply">x</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>Description</th>
                    <td>
                        <textarea id="card_attack_2_description" name="card_attack_2_description"></textarea>
                    </td>
                </tr>
            </table>
            <table id="card_attack_3">
                <tr>
                    <th>Cost</th>
                    <td>
                        <select id="card_attack_3_cost_1" name="card_attack_3_cost_1" style="width: 100px">
                            <option></option>
                            <option value="Grass">Grass</option>
                            <option value="Fire">Fire</option>
                            <option value="Water">Water</option>
                            <option value="Lightning">Lightning</option>
                            <option value="Fighting">Fighting</option>
                            <option value="Psychic">Psychic</option>
                            <option value="Colorless">Colorless</option>
                            <option value="Darkness">Darkness</option>
                            <option value="Metal">Metal</option>
                            <option value="Dragon">Dragon</option>
                            <option value="Fairy">Fairy</option>
                        </select>
                        <select id="card_attack_3_cost_2" name="card_attack_3_cost_2" style="width: 100px">
                            <option></option>
                            <option value="Grass">Grass</option>
                            <option value="Fire">Fire</option>
                            <option value="Water">Water</option>
                            <option value="Lightning">Lightning</option>
                            <option value="Fighting">Fighting</option>
                            <option value="Psychic">Psychic</option>
                            <option value="Colorless">Colorless</option>
                            <option value="Darkness">Darkness</option>
                            <option value="Metal">Metal</option>
                            <option value="Dragon">Dragon</option>
                            <option value="Fairy">Fairy</option>
                        </select>
                        <select id="card_attack_3_cost_3" name="card_attack_3_cost_3" style="width: 100px">
                            <option></option>
                            <option value="Grass">Grass</option>
                            <option value="Fire">Fire</option>
                            <option value="Water">Water</option>
                            <option value="Lightning">Lightning</option>
                            <option value="Fighting">Fighting</option>
                            <option value="Psychic">Psychic</option>
                            <option value="Colorless">Colorless</option>
                            <option value="Darkness">Darkness</option>
                            <option value="Metal">Metal</option>
                            <option value="Dragon">Dragon</option>
                            <option value="Fairy">Fairy</option>
                        </select>
                        <select id="card_attack_3_cost_4" name="card_attack_3_cost_4" style="width: 100px">
                            <option></option>
                            <option value="Grass">Grass</option>
                            <option value="Fire">Fire</option>
                            <option value="Water">Water</option>
                            <option value="Lightning">Lightning</option>
                            <option value="Fighting">Fighting</option>
                            <option value="Psychic">Psychic</option>
                            <option value="Colorless">Colorless</option>
                            <option value="Darkness">Darkness</option>
                            <option value="Metal">Metal</option>
                            <option value="Dragon">Dragon</option>
                            <option value="Fairy">Fairy</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>Name</th>
                    <td>
                        <input type="text" id="card_attack_3_name" name="card_attack_3_name">
                    </td>
                </tr>
                <tr>
                    <th>Damage</th>
                    <td>
                        <input type="number" id="card_attack_3_damage" name="card_attack_3_damage" style="width: 50px;" dir="rtl">
                        <select id="card_attack_3_modifier" name="card_attack_3_modifier" style="width: 30px">
                            <option></option>
                            <option value="Add">+</option>
                            <option value="Multiply">x</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>Description</th>
                    <td>
                        <textarea id="card_attack_3_description" name="card_attack_3_description"></textarea>
                    </td>
                </tr>
            </table>
            <table id="card_attack_4">
                <tr>
                    <th>Cost</th>
                    <td>
                        <select id="card_attack_4_cost_1" name="card_attack_4_cost_1" style="width: 100px">
                            <option></option>
                            <option value="Grass">Grass</option>
                            <option value="Fire">Fire</option>
                            <option value="Water">Water</option>
                            <option value="Lightning">Lightning</option>
                            <option value="Fighting">Fighting</option>
                            <option value="Psychic">Psychic</option>
                            <option value="Colorless">Colorless</option>
                            <option value="Darkness">Darkness</option>
                            <option value="Metal">Metal</option>
                            <option value="Dragon">Dragon</option>
                            <option value="Fairy">Fairy</option>
                        </select>
                        <select id="card_attack_4_cost_2" name="card_attack_4_cost_2" style="width: 100px">
                            <option></option>
                            <option value="Grass">Grass</option>
                            <option value="Fire">Fire</option>
                            <option value="Water">Water</option>
                            <option value="Lightning">Lightning</option>
                            <option value="Fighting">Fighting</option>
                            <option value="Psychic">Psychic</option>
                            <option value="Colorless">Colorless</option>
                            <option value="Darkness">Darkness</option>
                            <option value="Metal">Metal</option>
                            <option value="Dragon">Dragon</option>
                            <option value="Fairy">Fairy</option>
                        </select>
                        <select id="card_attack_4_cost_3" name="card_attack_4_cost_3" style="width: 100px">
                            <option></option>
                            <option value="Grass">Grass</option>
                            <option value="Fire">Fire</option>
                            <option value="Water">Water</option>
                            <option value="Lightning">Lightning</option>
                            <option value="Fighting">Fighting</option>
                            <option value="Psychic">Psychic</option>
                            <option value="Colorless">Colorless</option>
                            <option value="Darkness">Darkness</option>
                            <option value="Metal">Metal</option>
                            <option value="Dragon">Dragon</option>
                            <option value="Fairy">Fairy</option>
                        </select>
                        <select id="card_attack_4_cost_4" name="card_attack_4_cost_4" style="width: 100px">
                            <option></option>
                            <option value="Grass">Grass</option>
                            <option value="Fire">Fire</option>
                            <option value="Water">Water</option>
                            <option value="Lightning">Lightning</option>
                            <option value="Fighting">Fighting</option>
                            <option value="Psychic">Psychic</option>
                            <option value="Colorless">Colorless</option>
                            <option value="Darkness">Darkness</option>
                            <option value="Metal">Metal</option>
                            <option value="Dragon">Dragon</option>
                            <option value="Fairy">Fairy</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>Name</th>
                    <td>
                        <input type="text" id="card_attack_4_name" name="card_attack_4_name">
                    </td>
                </tr>
                <tr>
                    <th>Damage</th>
                    <td>
                        <input type="number" id="card_attack_4_damage" name="card_attack_4_damage" style="width: 50px;" dir="rtl">
                        <select id="card_attack_4_modifier" name="card_attack_4_modifier" style="width: 30px">
                            <option></option>
                            <option value="Add">+</option>
                            <option value="Multiply">x</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>Description</th>
                    <td>
                        <textarea id="card_attack_4_description" name="card_attack_4_description"></textarea>
                    </td>
                </tr>
            </table>
            <br>
            <br>
            <center><button id="attacks_save" style="height: 50px; width: 125px; font-size: 1.5em; margin: 0 20px 15px 0">Save</button></center>
        </div>
        </body>
        `
const adjustHTML = `
    <head>
        <title>
            Create Card - PokémonTCG Collector
        </title>
        <style>
            body {
                font-family: "Roboto Light", Helvetica, sans-serif;
            }
            table {
                border-collapse: collapse;
                width: 100%;
                padding: 10px
            }
            th {
                background-color: lightgray;
            }
            td {
                background-color: darkgray;
            }
            th, td {
                padding: 5px 10px;
                border: gray solid 3px;
            }
            select, input, textarea {
                height: 100%;
                width: 100%;
                border: none;
                font-size: 1em;
                background-color: darkgray;
            }
            textarea {
                height: 85px;
                resize: vertical;
                font-family: "Roboto Light", Helvetica, sans-serif;
            }
            option {
                background-color: lightgray;
            }
            input[type=number]::-webkit-inner-spin-button,
            input[type=number]::-webkit-outer-spin-button {
               opacity: 1;
            }
            .editButton {
                border: none;
                font-size: 1em;
                background-color: darkgray;
                width: 30px;
                float: right;
            }
        </style>
    </head>
    <body>
        <br>
        <span style="font-size: 2.5em; font-weight: bold; margin: 25px">Adjust Item</span>
        <br>
        <br>
        <span id="selectedItem" style="font-size: 1.5em; margin: 25px">{SelectedItem}</span>
        <br>
        <br>
        <table>
            <tr>
                <th>
                    Amount
                </th>
                <td>
                    <input type="number" id="adjustment_amount" name="adjustment_amount">
                </td>
            </tr>
            <tr>
                <th>
                    Reason
                </th>
                <td>
                    <select id="adjustment_reason" name="adjustment_reason">
                        <option value="Received">Received</option>
                        <option value="Sold">Sold</option>
                        <option value="Lost">Lost</option>
                        <option value="Donation">Donation</option>
                    </select>
                </td>
            </tr>
        </table>
        <br>
        <br>
        <center><button id="adjustment_save" style="height: 50px; width: 125px; font-size: 1.5em; margin: 0 20px 15px 0">Save</button></center>
    </body>`

// Collection Page
function authCompleted(data) {
    const {session, user} = data;
    localStorage.setItem('session', JSON.stringify(session));
    localStorage.setItem('user', JSON.stringify(user));
    document.getElementById("auth").style.display = "none";
    document.getElementById("collection").style.display = "block";
    let collection_header = document.getElementById("collection_header")
    collection_header.innerText = collection_header.innerText.replace('{Username}', user.Username)
    let collection_table = document.getElementById("collection_table")
    fetch("cards/retrieve", {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({session: session, user: user})
    }).then(res => res.json())
        .then(async data => {
            if (data.error) {
                if (data.status === 401) {
                    localStorage.removeItem('session');
                    localStorage.removeItem('user');
                    window.location.reload();
                } else if (data.status === 500) {
                    alert("Internal Server Error, Please Try Again Later.")
                }
                return;
            }
            if (!data.cards) return;
            if (data.cards.length === 0) return;
            localStorage.setItem('cards', JSON.stringify(data.cards));
            for (let card of data.cards) {
                const newRow = collection_table.insertRow()

                newRow.insertCell().outerHTML = `<td style="visibility: hidden; border: none"></td>`;

                const editCell = newRow.insertCell();
                editCell.style.width = "20px";
                const editButton = document.createElement("button");
                editButton.id = `collection_edit_button_${card.CardID}`;
                editButton.className = "editButton";
                editButton.innerHTML = "&#9998;";
                editCell.appendChild(editButton);
                const inventoryCell = newRow.insertCell();
                inventoryCell.style.width = "20px";
                const inventoryCount = document.createElement("a");
                inventoryCount.href = '#'
                inventoryCount.innerText = card.Qty;
                inventoryCount.style.textDecoration = "none";
                inventoryCount.style.color = "black";
                inventoryCell.appendChild(inventoryCount);

                newRow.insertCell().textContent = card.CardType;
                newRow.insertCell().textContent = card.Name;
                newRow.insertCell().textContent = card.Type;
                newRow.insertCell().textContent = card.Breed;
                newRow.insertCell().textContent = card.Set;
                newRow.insertCell().textContent = card.SetNumber;
                newRow.insertCell().textContent = card.Print;
                newRow.insertCell().textContent = `$${card.Value}`;

                newRow.insertCell().outerHTML = `<td style="visibility: hidden; border: none"></td>`;

                editButton.addEventListener("click", async (e) => {
                    const detailsWindow = open("", "EditCard", "popup,width=910,height=1000");
                    detailsWindow.addEventListener("unload", () => {
                        window.location.reload();
                    })
                    const detailElement = (id) => detailsWindow.document.getElementById(id)
                    detailsWindow.document.body.style.backgroundColor = window.getComputedStyle(document.getElementById("collection")).backgroundColor;
                    detailsWindow.document.body.innerHTML = detailsHTML
                    const groupList = await fetch(`https://tcgcsv.com/tcgplayer/3/groups`, {method: "GET"}).then(res => res.json())
                    const card_parent_drop = detailElement("card_parent")
                    if (localStorage.getItem("cards")) {
                        for (let card of JSON.parse(localStorage.getItem("cards"))) {
                            card_parent_drop.innerHTML += `<option value="${card.CardID}">${card.Name} - ${card.Set}</option>`
                        }
                    }
                    const card_set_drop = detailElement("card_set")
                    for (let group of groupList.results.sort((a, b) => new Date(a.publishedOn) - new Date(b.publishedOn))) {
                        card_set_drop.innerHTML += `<option value="${group.name}">${group.name}</option>"`
                    }
                    const heightft = Math.floor(card.Height/12)
                    const heightin = card.Height % 12
                    detailElement("card_card_type").value = card.CardType
                    detailElement("card_name").value = card.Name
                    detailElement("card_parent").value = card.Parent
                    detailElement("card_hp").value = card.HP
                    detailElement("card_type").value = card.Type
                    detailElement("card_dexno").value = card.DexNo
                    detailElement("card_breed").value = card.Breed
                    detailElement("card_height_ft").value = heightft
                    detailElement("card_height_in").value = heightin
                    detailElement("card_weight").value = card.Weight
                    detailElement("card_ability").value = JSON.stringify(card.Ability)
                    detailElement("card_attacks").value = JSON.stringify(card.Attacks)
                    detailElement("card_weakness").value = card.Weakness
                    detailElement("card_resistance").value = card.Resistance
                    detailElement("card_retreat_cost").value = card.RetreatCost
                    detailElement("card_set").value = card.Set
                    detailElement("card_set_number").value = card.SetNumber
                    detailElement("card_rarity").value = card.Rarity
                    detailElement("card_print").value = card.Print
                    detailElement("card_lore").value = card.Lore

                    detailElement("card_ability_edit").addEventListener("click", (e) => {
                        detailElement("details_screen").style.display = "none";
                        try {
                            const jsonFormat = JSON.parse(detailElement("card_ability").value)
                            detailElement("ability_name").value = jsonFormat.Name
                            detailElement("ability_description").value = jsonFormat.Description
                        } catch (error) {

                        }
                        detailElement("ability_screen").style.display = "block";
                    })
                    detailElement("ability_save").addEventListener("click", (e) => {
                        detailElement("ability_screen").style.display = "none";
                        const jsonFormat = {Name: detailElement("ability_name").value, Description: detailElement("ability_description").value}
                        try {
                            if (jsonFormat !== "") {
                                detailElement("card_ability").value = JSON.stringify(jsonFormat);
                            }
                        } catch (error) {

                        }
                        detailElement("details_screen").style.display = "flex";
                    })
                    detailElement("card_attacks_edit").addEventListener("click", (e) => {
                        detailElement("attacks_screen").style.display = "none";
                        try {
                            const jsonFormat = JSON.parse(detailElement("card_attacks").value)
                            if (jsonFormat !== "") {
                                for (let i = 0; i < 4; i++) {
                                    for (let j = 0; j < 4; j++) {
                                        detailElement(`card_attack_${i+1}_cost_${j+1}`).value = jsonFormat[i].Cost[j]
                                    }
                                    detailElement(`card_attack_${i+1}_name`).value = jsonFormat[i].Name
                                    detailElement(`card_attack_${i+1}_damage`).value = jsonFormat[i].Damage
                                    detailElement(`card_attack_${i+1}_modifier`).value = jsonFormat[i].Modifier
                                    detailElement(`card_attack_${i+1}_description`).value = jsonFormat[i].Description
                                }
                            }
                        } catch (error) {

                        }
                        detailElement("attacks_screen").style.display = "block";
                    })
                    detailElement("attacks_save").addEventListener("click", (e) => {
                        detailElement("attacks_screen").style.display = "none";
                        try {
                            let jsonFormat = [{Cost: [], Name: "", Damage: 0, Modifier: "", Description: ""}, {Cost: [], Name: "", Damage: 0, Modifier: "", Description: ""}, {Cost: [], Name: "", Damage: 0, Modifier: "", Description: ""}, {Cost: [], Name: "", Damage: 0, Modifier: "", Description: ""}];
                            for (let i = 0; i < 4; i++) {
                                for (let j = 0; j < 4; j++) {
                                    jsonFormat[i].Cost[j] = detailElement(`card_attack_${i+1}_cost_${j+1}`).value
                                }
                                jsonFormat[i].Name = detailElement(`card_attack_${i+1}_name`).value
                                jsonFormat[i].Damage = parseInt(detailElement(`card_attack_${i+1}_damage`).value)
                                jsonFormat[i].Modifier = detailElement(`card_attack_${i+1}_modifier`).value
                                jsonFormat[i].Description = detailElement(`card_attack_${i+1}_description`).value
                                detailElement("card_attacks").value = JSON.stringify(jsonFormat);
                            }
                        } catch (error) {

                        }
                        detailElement("details_screen").style.display = "flex";
                    })
                    detailElement("card_save").addEventListener("click", (e) => {
                        const height = parseInt(detailElement("card_height_ft").value)*12+parseInt(detailElement("card_height_in").value)
                        if (detailElement("card_ability").value === "") detailElement("card_ability").value = "{\"Name\":\"\",\"Description\":\"\"}"
                        if (detailElement("card_attacks").value === "") detailElement("card_attacks").value = "[{\"Cost\":[\"\",\"\",\"\",\"\"],\"Name\":\"\",\"Damage\":null,\"Modifier\":\"\",\"Description\":\"\"},{\"Cost\":[\"\",\"\",\"\",\"\"],\"Name\":\"\",\"Damage\":null,\"Modifier\":\"\",\"Description\":\"\"},{\"Cost\":[\"\",\"\",\"\",\"\"],\"Name\":\"\",\"Damage\":null,\"Modifier\":\"\",\"Description\":\"\"},{\"Cost\":[\"\",\"\",\"\",\"\"],\"Name\":\"\",\"Damage\":null,\"Modifier\":\"\",\"Description\":\"\"}]"
                        let JSONFormat = {
                            CardID: card.CardID,
                            CardType: detailElement("card_card_type").value,
                            Name: detailElement("card_name").value,
                            Parent: parseInt(detailElement("card_parent").value),
                            HP: parseInt(detailElement("card_hp").value),
                            Type: detailElement("card_type").value,
                            DexNo: parseInt(detailElement("card_dexno").value),
                            Breed: detailElement("card_breed").value,
                            Height: height,
                            Weight: parseFloat(detailElement("card_weight").value),
                            Ability: JSON.parse(detailElement("card_ability").value),
                            Attacks: JSON.parse(detailElement("card_attacks").value),
                            Weakness: detailElement("card_weakness").value,
                            Resistance: detailElement("card_resistance").value,
                            RetreatCost: parseInt(detailElement("card_retreat_cost").value),
                            Set: detailElement("card_set").value,
                            SetNumber: parseInt(detailElement("card_set_number").value),
                            Rarity: detailElement("card_rarity").value,
                            Print: detailElement("card_print").value,
                            Lore: detailElement("card_lore").value
                        }
                        for (let value in JSONFormat) {
                            if (JSONFormat[value] === "" || JSONFormat[value] === -1) {
                                JSONFormat[value] = undefined;
                            }
                        }
                        const credentials = { session: JSON.parse(localStorage.getItem('session')), user: JSON.parse(localStorage.getItem('user')) };
                        fetch("cards/update", {
                            headers: {
                                "Content-Type": "application/json"
                            },
                            method: "PUT",
                            body: JSON.stringify({session: credentials.session, user: credentials.user, CardData: JSONFormat})
                        }).then(res => res.json())
                            .then(data => {
                                if (data.error) {
                                    if (data.status === 401) {
                                        localStorage.removeItem('session');
                                        localStorage.removeItem('user');
                                        window.location.reload();
                                    } else if (data.status === 400 || data.status === 422) {
                                        detailsWindow.alert("Invalid Data, Please fix any empty boxes.")
                                    } else if (data.status === 500) {
                                        detailsWindow.alert("Internal Server Error, Please Try Again Later.")
                                    }
                                    return;
                                }
                                detailsWindow.close()
                                window.location.reload();
                            })
                    })
                    detailElement("card_delete").addEventListener("click", (e) => {
                        if (!detailsWindow.confirm("Are you sure you want to Delete this Card?")) return;
                        const credentials = { session: JSON.parse(localStorage.getItem('session')), user: JSON.parse(localStorage.getItem('user')) };
                        fetch("cards/delete", {
                            headers: {
                                "Content-Type": "application/json"
                            },
                            method: "DELETE",
                            body: JSON.stringify({session: credentials.session, user: credentials.user, CardID: card.CardID})
                        }).then(res => res.json())
                            .then(data => {
                                if (data.error) {
                                    if (data.status === 401) {
                                        localStorage.removeItem('session');
                                        localStorage.removeItem('user');
                                        window.location.reload();
                                    } else if (data.status === 400) {
                                        detailsWindow.alert("Card Does not Exist")
                                    }  else if (data.status === 500) {
                                        detailsWindow.alert("Internal Server Error, Please Try Again Later.")
                                    }
                                    return;
                                }
                                detailsWindow.close()
                                window.location.reload();
                            })
                    })
                    detailElement("card_ocr").addEventListener("click", (e) => {
                        detailElement("card_ocr").style.display = "none";
                        detailElement("scan_button").style.display = "block";
                        const videoBox = detailElement("video_box");
                        navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {videoBox.srcObject = stream; videoBox.play()}).catch(e => console.error(e));
                        videoBox.style.width = '350px'
                    })
                    detailElement("scan_button").addEventListener("click", async () => {
                        const canvas = detailElement("photo_box");
                        const videoBox = detailElement("video_box");
                        const ocrResult = detailElement("ocr_result");
                        const context = canvas.getContext("2d");
                        context.fillStyle = "#ffffff";
                        context.fillRect(0, 0, canvas.width, canvas.height);
                        canvas.width = videoBox.videoWidth;
                        canvas.height = videoBox.videoHeight;
                        context.drawImage(videoBox, 0, 0, videoBox.videoWidth, videoBox.videoHeight);
                        canvas.toBlob(async (blob) => {
                            if (!blob) return;
                            const formData = new FormData();
                            formData.append("image", blob, 'image.jpg');
                            try {
                                const response = await fetch('/ocr', {
                                    method: 'POST',
                                    body: formData,
                                });
                                ocrResult.innerText = await response.text();

                            } catch (e) {
                                console.error(e);
                            }
                        }, "image/jpeg")
                    })
                })
                inventoryCount.addEventListener("click", (e) => {
                    e.preventDefault();
                    const adjustWindow = open("", "AdjustCard", "popup,width=600,height=350");
                    adjustWindow.addEventListener("unload", () => {
                        window.location.reload();
                    })
                    const adjustElement = (id) => adjustWindow.document.getElementById(id)
                    adjustWindow.document.body.style.backgroundColor = window.getComputedStyle(document.getElementById("collection")).backgroundColor;
                    adjustWindow.document.body.innerHTML = adjustHTML
                    adjustElement("selectedItem").innerText = adjustElement("selectedItem").innerText.replace('{SelectedItem}', `${card.Name} - ${card.Set}`)
                    adjustElement("adjustment_save").addEventListener("click", (e) => {
                        let JSONFormat = {
                            CardID: card.CardID,
                            UserID: -1,
                            Amount: adjustElement("adjustment_amount").value,
                            ReasonCode: adjustElement("adjustment_reason").value
                        }
                        const credentials = { session: JSON.parse(localStorage.getItem('session')), user: JSON.parse(localStorage.getItem('user')) };
                        fetch("adjustments/create", {
                            headers: {
                                "Content-Type": "application/json"
                            },
                            method: "PUT",
                            body: JSON.stringify({session: credentials.session, user: credentials.user, AdjustData: JSONFormat})
                        }).then(res => res.json())
                            .then(data => {
                                if (data.error) {
                                    if (data.status === 401) {
                                        localStorage.removeItem('session');
                                        localStorage.removeItem('user');
                                        window.location.reload();
                                    } else if (data.status === 400 || data.status === 422) {
                                        adjustWindow.alert("Invalid Data, Please fix any empty boxes.")
                                    } else if (data.status === 500) {
                                        adjustWindow.alert("Internal Server Error, Please Try Again Later.")
                                    }
                                    return;
                                }
                                adjustWindow.close()
                                window.location.reload();
                            })
                    })
                })
            }
        })
}

// Authentication Page
window.onload = () => {
    if (localStorage.getItem('session') && localStorage.getItem('user')) {
        const data = { session: JSON.parse(localStorage.getItem('session')), user: JSON.parse(localStorage.getItem('user')) };
        authCompleted(data);
    }
    document.getElementById("auth_register").addEventListener("submit", (e) => {
        e.preventDefault();
        const rUsername = document.getElementById('auth_register_username').value
        const rPassword = document.getElementById('auth_register_password').value
        fetch("auth/register", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ "Username": rUsername, "Password": rPassword})
        }).then((response) => response.json()).then((data) => {
            console.log(data)
            if (data.error) {
                document.getElementById("auth_register_error_message").innerText = data.error
            } else {
                authCompleted(data)
            }
        })
    })
    document.getElementById("auth_register").addEventListener("input", (e) => {
        document.getElementById("auth_register_error_message").innerText = ''
    })
    document.getElementById("auth_login").addEventListener("submit", (e) => {
        e.preventDefault();
        const lUsername = document.getElementById('auth_login_username').value
        const lPassword = document.getElementById('auth_login_password').value
        fetch("auth/login", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ "Username": lUsername, "Password": lPassword})
        }).then((response) => response.json()).then((data) => {
            console.log(data)
            if (data.error) {
                document.getElementById("auth_login_error_message").innerText = data.error
            } else {
                authCompleted(data)
            }
        })
    })
    document.getElementById("auth_login").addEventListener("input", (e) => {
        document.getElementById("auth_login_error_message").innerText = ''
    })
    let r = Math.floor(Math.random() * 64)+192;
    let g = Math.floor(Math.random() * 64)+192;
    let b = Math.floor(Math.random() * 64)+192;

    const screens = document.getElementsByClassName("screen")

    for (let i = 0; i < screens.length; i++) {
        screens[i].style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    }

    const auth = document.getElementsByClassName("auth");

    for (let i = 0; i < auth.length; i++) {
        auth[i].style.backgroundColor = `rgb(${r-64}, ${g-64}, ${b-64})`;
    }
    document.getElementById("collection_create_button").addEventListener("click", async (e) => {
        const detailsWindow = open("", "CreateCard", "popup,width=910,height=1000");
        detailsWindow.addEventListener("unload", () => {
            window.location.reload();
        })
        const detailElement = (id) => detailsWindow.document.getElementById(id)
        let attackAmt = 1
        detailsWindow.document.body.style.backgroundColor = window.getComputedStyle(document.getElementById("collection")).backgroundColor;
        detailsWindow.document.body.innerHTML = detailsHTML
        const groupList = await fetch(`https://tcgcsv.com/tcgplayer/3/groups`, {method: "GET"}).then(res => res.json())
        const card_set_drop = detailElement("card_set")
        for (let group of groupList.results.sort((a, b) => new Date(a.publishedOn) - new Date(b.publishedOn))) {
            card_set_drop.innerHTML += `<option value="${group.name}">${group.name}</option>"`
        }
        const card_parent_drop = detailElement("card_parent")
        if (localStorage.getItem("cards")) {
            for (let card of JSON.parse(localStorage.getItem("cards"))) {
                card_parent_drop.innerHTML += `<option value="${card.CardID}">${card.Name} - ${card.Set}</option>`
            }
        }
        detailElement("card_ability_edit").addEventListener("click", (e) => {
            detailElement("details_screen").style.display = "none";
            try {
                const jsonFormat = JSON.parse(detailElement("card_ability").value)
                detailElement("ability_name").value = jsonFormat.Name
                detailElement("ability_description").value = jsonFormat.Description
            } catch (error) {

            }
            detailElement("ability_screen").style.display = "block";
        })
        detailElement("ability_save").addEventListener("click", (e) => {
            detailElement("ability_screen").style.display = "none";
            const jsonFormat = {Name: detailElement("ability_name").value, Description: detailElement("ability_description").value}
            try {
                if (jsonFormat !== "") {
                    detailElement("card_ability").value = JSON.stringify(jsonFormat);
                }
            } catch (error) {

            }
            detailElement("details_screen").style.display = "flex";
        })
        detailElement("card_attacks_edit").addEventListener("click", (e) => {
            detailElement("attacks_screen").style.display = "none";
            try {
                const jsonFormat = JSON.parse(detailElement("card_attacks").value)
                if (jsonFormat !== "") {
                    for (let i = 0; i < 4; i++) {
                        for (let j = 0; j < 4; j++) {
                            detailElement(`card_attack_${i+1}_cost_${j+1}`).value = jsonFormat[i].Cost[j]
                        }
                        detailElement(`card_attack_${i+1}_name`).value = jsonFormat[i].Name
                        detailElement(`card_attack_${i+1}_damage`).value = jsonFormat[i].Damage
                        detailElement(`card_attack_${i+1}_modifier`).value = jsonFormat[i].Modifier
                        detailElement(`card_attack_${i+1}_description`).value = jsonFormat[i].Description
                    }
                }
            } catch (error) {

            }
            detailElement("attacks_screen").style.display = "block";
        })
        detailElement("attacks_save").addEventListener("click", (e) => {
            detailElement("attacks_screen").style.display = "none";
            try {
                let jsonFormat = [{Cost: [], Name: "", Damage: 0, Modifier: "", Description: ""}, {Cost: [], Name: "", Damage: 0, Modifier: "", Description: ""}, {Cost: [], Name: "", Damage: 0, Modifier: "", Description: ""}, {Cost: [], Name: "", Damage: 0, Modifier: "", Description: ""}];
                for (let i = 0; i < 4; i++) {
                    for (let j = 0; j < 4; j++) {
                        jsonFormat[i].Cost[j] = detailElement(`card_attack_${i+1}_cost_${j+1}`).value
                    }
                    jsonFormat[i].Name = detailElement(`card_attack_${i+1}_name`).value
                    jsonFormat[i].Damage = parseInt(detailElement(`card_attack_${i+1}_damage`).value)
                    jsonFormat[i].Modifier = detailElement(`card_attack_${i+1}_modifier`).value
                    jsonFormat[i].Description = detailElement(`card_attack_${i+1}_description`).value
                    detailElement("card_attacks").value = JSON.stringify(jsonFormat);
                }
            } catch (error) {

            }
            detailElement("details_screen").style.display = "flex";
        })
        detailElement("card_save").addEventListener("click", (e) => {
            const height = parseInt(detailElement("card_height_ft").value)*12+parseInt(detailElement("card_height_in").value)
            if (detailElement("card_ability").value === "") detailElement("card_ability").value = "{\"Name\":\"\",\"Description\":\"\"}"
            if (detailElement("card_attacks").value === "") detailElement("card_attacks").value = "[{\"Cost\":[\"\",\"\",\"\",\"\"],\"Name\":\"\",\"Damage\":null,\"Modifier\":\"\",\"Description\":\"\"},{\"Cost\":[\"\",\"\",\"\",\"\"],\"Name\":\"\",\"Damage\":null,\"Modifier\":\"\",\"Description\":\"\"},{\"Cost\":[\"\",\"\",\"\",\"\"],\"Name\":\"\",\"Damage\":null,\"Modifier\":\"\",\"Description\":\"\"},{\"Cost\":[\"\",\"\",\"\",\"\"],\"Name\":\"\",\"Damage\":null,\"Modifier\":\"\",\"Description\":\"\"}]"
            let JSONFormat = {
                CardType: detailElement("card_card_type").value,
                Name: detailElement("card_name").value,
                Parent: parseInt(detailElement("card_parent").value),
                HP: parseInt(detailElement("card_hp").value),
                Type: detailElement("card_type").value,
                DexNo: parseInt(detailElement("card_dexno").value),
                Breed: detailElement("card_breed").value,
                Height: height,
                Weight: parseFloat(detailElement("card_weight").value),
                Ability: JSON.parse(detailElement("card_ability").value),
                Attacks: JSON.parse(detailElement("card_attacks").value),
                Weakness: detailElement("card_weakness").value,
                Resistance: detailElement("card_resistance").value,
                RetreatCost: parseInt(detailElement("card_retreat_cost").value),
                Set: detailElement("card_set").value,
                SetNumber: parseInt(detailElement("card_set_number").value),
                Rarity: detailElement("card_rarity").value,
                Print: detailElement("card_print").value,
                Lore: detailElement("card_lore").value
            }
            for (let value in JSONFormat) {
                if (JSONFormat[value] === "" || JSONFormat[value] === -1) {
                    JSONFormat[value] = null;
                }
            }
            const credentials = { session: JSON.parse(localStorage.getItem('session')), user: JSON.parse(localStorage.getItem('user')) };
            fetch("cards/create", {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "PUT",
                body: JSON.stringify({session: credentials.session, user: credentials.user, CardData: JSONFormat})
            }).then(res => res.json())
                .then(data => {
                    if (data.error) {
                        if (data.status === 401) {
                            localStorage.removeItem('session');
                            localStorage.removeItem('user');
                            window.location.reload();
                        } else if (data.status === 400 || data.status === 422) {
                            detailsWindow.alert("Invalid Data, Please fix any empty boxes.")
                        }
                        else if (data.status === 500) {
                            detailsWindow.alert("Internal Server Error, Please Try Again Later.")
                        }
                        return;
                    }
                    detailsWindow.close()
                    window.location.reload();
                })
        })
        detailElement("card_delete").style.display = "none";
        detailElement("card_ocr").addEventListener("click", (e) => {
            detailElement("card_ocr").style.display = "none";
            detailElement("scan_button").style.display = "block";
            const videoBox = detailElement("video_box");
            navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {videoBox.srcObject = stream; videoBox.play()}).catch(e => console.error(e));
            videoBox.style.width = '350px'
        })
        detailElement("scan_button").addEventListener("click", async () => {
            const canvas = detailElement("photo_box");
            const videoBox = detailElement("video_box");
            const ocrResult = detailElement("ocr_result");
            const context = canvas.getContext("2d");
            context.fillStyle = "#ffffff";
            context.fillRect(0, 0, canvas.width, canvas.height);
            canvas.width = videoBox.videoWidth;
            canvas.height = videoBox.videoHeight;
            context.drawImage(videoBox, 0, 0, videoBox.videoWidth, videoBox.videoHeight);
            canvas.toBlob(async (blob) => {
                if (!blob) return;
                const formData = new FormData();
                formData.append("image", blob, 'image.jpg');
                try {
                    const response = await fetch('/ocr', {
                        method: 'POST',
                        body: formData,
                    });
                    ocrResult.innerText = await response.text();

                } catch (e) {
                    console.error(e);
                }
            }, "image/jpeg")
        })
    })

}