import express, { Request, Response, NextFunction } from "express";
import { OkPacket } from "mysql";
import MovieModel from "../2-models/movie-model";
import dal from "../4-utils/dal";
import dataService from "../5-services/data-service";

const router = express.Router();

//GET http://localhost:4000/api/theater
router.get("/theater", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const theater = await dataService.getAllTheater();
        response.json(theater);
    }
    catch(err: any) {
        next(err);
    }
});

//GET http://localhost:4000/api/movies-per-theater/:id
router.get("/movies-per-theater/:id([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        const movies = await dataService.getAllMovieByTheater(id);
        response.json(movies);
    }
    catch(err: any) {
        next(err);
    }
});

//POST http://localhost:4000/api/movies
router.post("/movies", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const movie = new MovieModel(request.body);
        const addedMovie = await dataService.addNewMovie(movie);
        response.status(201).json(addedMovie);
    }
    catch(err: any) {
        next(err);
    }
});

//DELETE http://localhost:4000/api/movies/:id
router.delete("/movies/:id([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        await dataService.deleteMovie(id);
        response.sendStatus(204);
    }
    catch(err: any) {
        next(err);
    }
});
export default router;
