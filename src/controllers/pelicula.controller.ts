import { Request, Response } from 'express'
import fs from 'fs-extra';
import path from 'path'

// Models
import Pelicula, { IPelicula } from '../models/Pelicula';

export async function getPeliculas(req: Request, res: Response): Promise<Response> {
    const peliculas = await Pelicula.find();
    return res.json(peliculas);
};

export async function createPelicula(req: Request, res: Response): Promise<Response> {
    const { title, description } = req.body;
    const newPelicula = { title, description, imagePath: req.file.path };
    const peliculas = new Pelicula(newPelicula);
    await peliculas.save();
    return res.json({
        message: 'Peliculas Saved Successfully',
        peliculas
    });
};

export async function getPelicula(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const peliculas = await Pelicula.findById(id);
    return res.json(peliculas);
}

export async function deletePelicula(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const pelicula = await Pelicula.findByIdAndRemove(id) as IPelicula;
    if (pelicula) {
        await fs.unlink(path.resolve(pelicula.imagePath));
    }
    return res.json({ message: 'Peliculas Deleted' });
};

export async function updatePelicula(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { title, description } = req.body;
    const updatedPelicula = await Pelicula.findByIdAndUpdate(id, {
        title,
        description
    }, {new: true});
    return res.json({
        message: 'Successfully Updated',
        updatedPelicula
    });
}



