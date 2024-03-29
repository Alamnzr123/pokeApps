import db from "../config/db.js";

const userModel = {
    getUserList: function () {
        try {
            return db.query("SELECT * FROM pokemons");
        }
        catch (err) {
            console.log(err.message);
        }
    },

    getUserbyID: function (id) {
        try {
            return db.query(`SELECT * FROM pokemons WHERE id = ${id}`);
        }
        catch (err) {
            console.log(err.message);
        }
    },

    CreateUser: function ({ nickname, imageurl, pokemonid, renamecount }) {
        try {
            return db.query(`INSERT INTO pokemons (nickname, imageurl, pokemonid, renamecount)
            VALUES ('${nickname}', '${imageurl}' , '${pokemonid}', '${renamecount}')`);
        }
        catch (err) {
            console.log(err.message);
        }
    },

    UpdateUser: function ({ id, nickname, imageurl, pokemonid, renamecount }) {
        try {
            return db.query(`UPDATE pokemons SET nickname = '${nickname}', imageurl = '${imageurl}', pokemonid = '${pokemonid}', renamecount = '${renamecount}' WHERE id = ${id}`);
        }
        catch (err) {
            console.log(err.message);
        }
    },

    DeleteUser: function (id) {
        try {
            return db.query(`DELETE FROM pokemons WHERE id = ${id}`);
        }
        catch (err) {
            console.log(err.message);
        }
    },
};

export default userModel;