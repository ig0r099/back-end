const { Router } = require("express");
const mysql = require('mysql2');

const router = Router();

const conn = mysql.createConnection({
    host: 'localhost',
    database: 'provadkp',
    user: 'root',
    password: 'igor'
});


router.get('/listar', function (req, res) {

    try {

        conn.execute(
            `SELECT 
                jog.id,
                tim.nome AS "Time",
                jog.id_time "IdTime",
                jog.nome "Jogador"
            FROM
                tbl_jogadores AS jog
            LEFT JOIN
                tbl_times AS tim ON tim.id = jog.id_time;`, function (err, response, fields) {

            if (err) throw err;

            res.status(200).json({
                msg: 'Sucesso na listagem de jogadores!',
                data: response
            });
        });

    } catch (error) {

        res.status(200).json({
            msg: 'Erro ao listar jogadores!',
            data: error
        });
    }
});

router.post('/cadastrar', function (req, res) {

    try {

        conn.execute('INSERT INTO tbl_jogadores (id_time, nome) VALUES (?, ?);', [req.body.id_time, req.body.nome], function (err, response, fields) {

            if (err) throw err;

            res.status(200).json({
                msg: 'Jogador cadastrado com sucesso!',
                data: response
            });
        });

    } catch (error) {

        res.status(500).json({
            msg: 'Erro ao cadastrar jogador!',
            data: error
        });
    }
});

router.put('/alterar/:id', function (req, res) {

    try {

        conn.execute('UPDATE tbl_jogadores SET id_time = ?, nome = ? WHERE id = ?;', [req.body.id_time, req.body.nome, req.params.id], function (err, response, fields) {

            if (err) throw err;

            res.status(200).json({
                msg: 'Jogador atualizado com sucesso!',
                data: response
            });
        });

    } catch (error) {

        res.status(500).json({
            msg: 'Erro ao atualizar jogador!',
            data: error
        });
    }
});

router.delete('/excluir/:id', function (req, res) {

    try {

        conn.execute('DELETE FROM tbl_jogadores WHERE id = ?;', [req.params.id], function (err, response, fields) {

            if (err) throw err;

            res.status(200).json({
                msg: 'Jogador excluído com sucesso!',
                data: response
            });
        });

    } catch (error) {

        res.status(500).json({
            msg: 'Erro ao excluir jogador!',
            data: error
        });
    }
});

module.exports = router;
