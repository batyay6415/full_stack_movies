import axios from "axios";
import MovieModel from "../Models/MovieModel";
import theaterModel from "../Models/TheaterModel";
import appConfig from "../Utils/AppConfig";

class DataService {

    public async getAllTheaters(): Promise<theaterModel[]> {
        
        const response = await axios.get<theaterModel[]>(appConfig.theaterUrl);

        const theater = response.data;

        return theater;
    }

    public async getAllMovieByTheater(id: number): Promise<MovieModel[]>{

        const response = await axios.get<MovieModel[]>(appConfig.moviesByTheaterUrl + id);

        const movies = response.data;

        return movies;
    }

    public async addNewMovie(movie: MovieModel): Promise<void>{

        const response = await axios.post<MovieModel>(appConfig.moviesUrl , movie);

        const addMovie = response.data;

    }

    public async deleteMovie(id: number): Promise<void>{

        axios.delete(appConfig.moviesUrl + id);
    }
}

const dataService = new DataService();

export default dataService;
