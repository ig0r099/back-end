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

        conn.execute('SELECT * FROM tbl_times;', function (err, response, fields) {

            if (err) throw err;

            res.status(200).json({
                msg: 'Sucesso na listagem de times!',
                data: response
            });
        });

    } catch (error) {

        res.status(200).json({
            msg: 'Erro ao listar times!',
            data: error
        });
    }
});


router.post('/cadastrar', function (req, res) {

    try {

        conn.execute('INSERT INTO tbl_times (nome) VALUES (?);', [req.body.nome], function (err, response, fields) {

            if (err) throw err;

            res.status(200).json({
                msg: 'Time cadastrado com sucesso!',
                data: response
            });
        });

    } catch (error) {

        res.status(500).json({
            msg: 'Erro ao cadastrar time!',
            data: error
        });
    }
});

router.put('/alterar/:id', function (req, res) {

    try {

        conn.execute('UPDATE tbl_times SET nome = ? WHERE id = ?;', [req.body.nome, req.params.id], function (err, response, fields) {

            if (err) throw err;

            res.status(200).json({
                msg: 'Time atualizado com sucesso!',
                data: response
            });
        });

    } catch (error) {


        res.status(500).json({
            msg: 'Erro ao atualizar time!',
            data: error
        });
    }
});

router.delete('/excluir/:id', function (req, res) {

    try {

        conn.execute('DELETE FROM tbl_times WHERE id = ?;', [req.params.id], function (err, response, fields) {

            if (err) throw err;

            res.status(200).json({
                msg: 'Time excluído com sucesso!',
                data: response
            });
        });

    } catch (error) {

        res.status(500).json({
            msg: 'Erro ao excluir time!',
            data: error
        });
    }
});


module.exports = router;
