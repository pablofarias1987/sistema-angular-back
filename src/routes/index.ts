import {Router} from 'express';
const router = Router();

const uuidv4 = require('uuid/v4');

import upload from '../libs/multer';
import { getJuegos, createJuego, deleteJuego, getJuego, updateJuego } from '../controllers/juego.controller';
import { getPeliculas, createPelicula, deletePelicula, getPelicula, updatePelicula } from '../controllers/pelicula.controller';
import multer from '../libs/multer';

// middleware
// router.use(upload.single('image'));

// routes;

router.route('/juegos')
    .get(getJuegos)
    .post(upload.single('image'), createJuego);

router.route('/juegos/:id')
    .get(getJuego)
    .delete(deleteJuego)
    .put(updateJuego);

    router.route('/peliculas')
    .get(getPeliculas)
    .post(upload.single('image'), createPelicula);

router.route('/peliculas/:id')
    .get(getPelicula)
    .delete(deletePelicula)
    .put(updatePelicula);

export default router;

