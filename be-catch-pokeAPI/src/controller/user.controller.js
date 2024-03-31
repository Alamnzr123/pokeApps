import axios from "axios";
import model from "../model/user.model.js";

function generateFibonacciNumber(num) {
    var a = 1,
        b = 0,
        temp;

    while (num >= 0) {
        temp = a;
        a = a + b;
        b = temp;
        num--;
    }
    return b;
}

const userController = {
    listUser: async function (req, res) {
        try {
            const response = await axios.get("https://pokeapi.co/api/v2/pokemon/");
            const pokemonList = response.data.results.map((pokemon) => pokemon.name);
            res.status(200).send(pokemonList);

            console.log(response.data.results[0].url);
        } catch (err) {
            res.status(400).send(err);
        }

    },

    listMyPokemons: async function (req, res) {
        try {
            const result = await model.getUserList();
            console.log(result);
            res.status(200).send(result);
        } catch (err) {
            res.status(400).send(err);
        }
    },

    listUserbyId: async function (req, res) {
        try {
            const pokemonName = req.params.name;
            const response = await axios.get(
                `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
            );
            res.status(200).send(response.data);
        } catch (err) {
            res.status(404).send("Pokemon not found");
        }
    },

    checkProbability: async function (req, res) {
        try {
            const successRate = Math.ceil(Math.random() * 4);

            if (successRate > 2) {
                res.status(200).send({
                    status: "Success",
                    catchStatus: "Success",
                });
            } else {
                res.status(200).send({
                    status: "Success",
                    catchStatus: "Failed",
                });
            }
        } catch (error) {
            res.status(500).send({
                status: "Failed",
                message: "Internal Server Error",
            });
        }
    },

    catchPokemon: async function (req, res) {
        try {

            const { pokemonid, nickname
                , imageurl } = req.body;

            const data = {
                nickname
                , imageurl
                , pokemonid
                , renamecount: "0"
            };

            const result = await model.CreateUser(data);
            console.log(result);
            res.status(200);
            res.json({
                message: "User create Success.",
                data: result
            });
        } catch (error) {
            res.status(500).send({
                status: "Failed",
                message: error.message
            });
        }
    },

    checkNumber: async function (req, res) {
        try {
            const number = Math.ceil(Math.random() * 30);

            res.status(200).send({
                status: "Success",
                number
            });
        } catch (error) {
            res.status(500).send({
                status: "Failed",
                message: "Internal Server Error",
            });
        }
    },

    releasePokemon: async function (req, res) {
        try {
            const { id } = req.params;

            const { rowCount } = await model.getUserbyID(id);

            if (!rowCount) {
                res.status(404).send({
                    status: "Failed",
                    message: "Pokemon not Found",
                });
            }

            await model.DeleteUser(id);

            res.status(200).send({
                status: "Success",
                message: "Pokemon Released",
            });
        } catch (error) {
            res.status(500).send({
                status: "Failed",
                message: "Internal Server Error",
            });
        }
    },

    renamePokemon: async function (req, res) {
        try {
            const { id } = req.params;
            const data = req.body;

            const resultgetID = await model.getUserbyID(id);

            if (!resultgetID.rowCount) {
                res.status(404).send({
                    status: "Failed",
                    message: "Pokemon not Found",
                });
            }

            const fibonacciIndex = Number(resultgetID.rows[0].renamecount) - 1;
            const fibonacciNumber = generateFibonacciNumber(fibonacciIndex);
            const pokemon = {
                id,
                nickname: `${data.nickname} - ${fibonacciNumber}`,
                imageurl: data.imageurl,
                pokemonid: data.pokemonid,
                renamecount: Number(resultgetID.rows[0].renamecount) + 1,
            };

            // const pokemon = {
            //     id,
            //     nickname: data.nickname,
            //     imageurl: data.imageurl,
            //     pokemonid: data.pokemonid,
            //     renamecount: data.renamecount,
            // };

            const result = await model.UpdateUser(pokemon);
            console.log(result);

            res.status(200).send({
                status: "Success",
                pokemon: result,
            });
        } catch (error) {
            res.status(500).send({
                status: "Failed",
                message: error.message,
            });
        }
    }

};

export default userController;