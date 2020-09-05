import { Request, Response } from 'express'
import fs from 'fs-extra';
import path from 'path'

// Models
import Juego, { IJuego } from '../models/Juego';


export async function getJuegos(req: Request, res: Response): Promise<Response> {
    const juegos = await Juego.find();
    return res.json(juegos);
};

export async function createJuego(req: Request, res: Response): Promise<Response> {
    const { title, description } = req.body;
    const newJuego = { title, description, imagePath: req.file.path };
    const juego = new Juego(newJuego);
    await juego.save();
    return res.json({
        message: 'Juego Saved Successfully',
        juego
    });
};

export async function getJuego(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const juego = await Juego.findById(id);
    return res.json(juego);
}

export async function deleteJuego(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const juego = await Juego.findByIdAndRemove(id) as IJuego;
    if (juego) {
        await fs.unlink(path.resolve(juego.imagePath));
    }
    return res.json({ message: 'Juego Deleted' });
};

export async function updateJuego(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { title, description } = req.body;
    const updatedJuego = await Juego.findByIdAndUpdate(id, {
        title,
        description
    }, {new: true});
    return res.json({
        message: 'Successfully updated',
        updatedJuego
    });
}



