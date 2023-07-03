import dal from "../4-utils/dal";
import { OkPacket } from "mysql";
import theaterModel from "../2-models/theater-model";
import MovieModel from "../2-models/movie-model";
import { ResourceNotFoundError } from "../2-models/client-errors";

//Get all theater from data base:
async function getAllTheater(): Promise<theaterModel[]> {

    const sql = "SELECT * FROM theater";

    const theater = await dal.execute(sql);

    return theater;

}

//Get all movie by theater id that 
async function getAllMovieByTheater(id: number): Promise<MovieModel[]>{

    const sql = `SELECT * , theater.theaterName
                FROM movie
                JOIN theater ON movie.theaterId = theater.theaterId
                WHERE movie.theaterId = ?`;
   
    const movies = await dal.execute(sql , [id]);

    if(!id) throw new ResourceNotFoundError(id);

    // const movie = movies[0];

    return movies;
}

async function addNewMovie(movie: MovieModel): Promise<MovieModel>{

    const sql = "INSERT INTO movie VALUES(DEFAULT, ?,?,?,?)";
    
    const result:OkPacket = await dal.execute(sql, [movie.theaterId, movie.movieName, movie.movieDateTime, movie.movieSecond ]);

    result.insertId = movie.movieId;

    return movie;

}

async function deleteMovie(id: number): Promise<void>{

    const sql = "DELETE FROM movie WHERE movieId = ?";

    const result:OkPacket = await dal.execute(sql, [id]);

    if(result.affectedRows === 0) throw new ResourceNotFoundError(id);
}

export default {
    getAllTheater,
    getAllMovieByTheater,
    addNewMovie,
    deleteMovie
};

