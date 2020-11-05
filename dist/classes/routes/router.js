"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./../server");
const express_1 = require("express");
const router = express_1.Router();
router.get('/mensajes', (req, res) => {
    console.log('llamando metodo get con el nuevo metodo');
    res.json({
        ok: true,
        mensaje: 'toso esta bien--->get'
    });
});
router.get('/vendors', (req, res) => {
    var vendors = [
        {
            "id": 1,
            "nombre": "jelpit",
            "imagen": "logo-Jelpit.png",
            "email": "jelpit@gmail.com"
        },
        {
            "id": 2,
            "nombre": "andiasistencia",
            "imagen": "logo-andi.png",
            "email": "andiasistencia@gmail.com"
        },
        {
            "id": 3,
            "nombre": "a365",
            "imagen": "logo-A365.png",
            "email": "a365@gmail.com"
        },
        {
            "id": 4,
            "nombre": "integralgroup",
            "imagen": "logo-igs.png",
            "email": "integralgroup@gmail.com"
        }
    ];
    res.json({
        vendors
    });
});
router.post('/mensajes', (req, res) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    console.log('llamando metodo get con el nuevo metodo en el post');
    res.json({
        ok: true,
        cuerpo,
        de
    });
});
router.post('/mensajes/:parametros', (req, res) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const parametros = req.params.parametros;
    console.log('llamando metodo get con el nuevo metodo en el post....***---');
    res.json({
        ok: true,
        cuerpo,
        de,
        ultimo: server_1.ultimo
    });
});
exports.default = router;
