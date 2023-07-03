class MovieModel {

    public movieId: number;
    public theaterId: number;
    public movieName: string;
    public movieDateTime: string;
    public movieSecond: number;

    public constructor(movie: MovieModel){
        this.movieId = movie.movieId;
        this.theaterId = movie.theaterId;
        this.movieName = movie.movieName;
        this.movieDateTime = movie.movieDateTime;
        this.movieSecond = movie.movieSecond;
    }
}

export default MovieModel;