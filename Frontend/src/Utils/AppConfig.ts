class AppConfig {
    public theaterUrl = "http://localhost:4000/api/theater/";
    public moviesByTheaterUrl = "http://localhost:4000/api/movies-per-theater/";
    public moviesUrl = "http://localhost:4000/api/movies/";
}

const appConfig = new AppConfig();

export default appConfig;
