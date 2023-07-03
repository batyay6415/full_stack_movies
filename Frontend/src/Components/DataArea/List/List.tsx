import { ChangeEvent, useEffect, useState } from "react";
import MovieModel from "../../../Models/MovieModel";
import theaterModel from "../../../Models/TheaterModel";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";
import "./List.css";

function List(): JSX.Element {

    const [theater, setTheater] = useState<theaterModel[]>([]);

    const [movies, setMovies] = useState<MovieModel[]>([]);

    useEffect(() => {
        dataService.getAllTheaters()
        .then(dbTheater => setTheater(dbTheater))
        .catch(err => notifyService.error(err));
    } , []);

async function getMovie(args: ChangeEvent<HTMLSelectElement>){

    const id = +args.target.value
    await dataService.getAllMovieByTheater(id)
    .then(dbMovies => setMovies(dbMovies))
    .catch(err => notifyService.error(err));
}
//function who go to server:
function deleteMe(id: number){
    try {
        const ok = window.confirm("Are you sure?");
    if(!ok)
    return;
    dataService.deleteMovie(id)
    notifyService.success("movie has been deleted")
    }
    catch(err: any){
        notifyService.error(err)
    }
}

function formatDate(dateStr:string) {
    const dateObj = new Date(dateStr);
    const dateString = dateObj.toLocaleDateString("en-GB");
    const timeString = dateObj.toLocaleTimeString("en-GB", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
    return `${dateString} | ${timeString}`;
    }

    return (
        <div className="List">

			<h2>List Page</h2>

            <select defaultValue="" onChange={getMovie}>

            <option disabled value="">select Theater...</option>

            {theater.map(t => <option key={t.theaterId} value={t.theaterId}>{t.theaterName}</option>)}
            </select>
            
            <br />
            <br />

        <table>
            <thead>
                <tr>
                    <th>Movie Name</th>
                    <th>Date & Time</th>
                    <th>Movie Duration </th>
                    <th>Theater Name</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
               {movies.map(m => <tr>
                <td>{m.movieName}</td>
                <td>{formatDate(m.movieDateTime)}</td>
                <td>{m.movieSecond}</td>
                <td>{m.theaterName}</td>
                <td><button onClick={() => deleteMe(m.movieId)}>✖</button></td>
               </tr>)}
            </tbody>
        </table>

        </div>
    );
}

export default List;
