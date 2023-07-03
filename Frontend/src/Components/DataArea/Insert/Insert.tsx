import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import MovieModel from "../../../Models/MovieModel";
import theaterModel from "../../../Models/TheaterModel";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";
import "./Insert.css";

function Insert(): JSX.Element {

    //Create State order to use in object of theater who get from theater database
    const[theater, setTheater] = useState<theaterModel[]>([]);

    //Use in react hook by useForm who give me object and function : object to arrive to input in form  
    const{register, handleSubmit} = useForm<MovieModel>();

    const navigate = useNavigate();

    useEffect(() => {
        dataService.getAllTheaters()
        .then(dbTheater => setTheater(dbTheater))
        .catch(err => notifyService.error(err));
    } , []);

    function send(movie: MovieModel): void{
        dataService.addNewMovie(movie)
        .then(() => notifyService.success("movie has been added"))
        .catch((err) => notifyService.error(err));
        navigate("/list");
    }
   
    function checkDate(){}
    
    return (
        <div className="Insert">

            <form onSubmit={handleSubmit(send)}>

                <label>Theater:</label>
                <select defaultValue=""{...register("theaterId")}>
                    <option disabled value="">Select Theater...</option>
                    {theater.map(t => <option key={t.theaterId} value={t.theaterId}>{t.theaterName}</option>)}
                </select>

                <label>Movie Name:</label>
                <input type="text" {...register("movieName")} />

                <label>Date & Time:</label>
                <input type="datetime-local" {...register("movieDateTime")} />

                <label>Duration:</label>
                <input type="number" {...register("movieSecond")} />

                <br />

                <button>Add</button>
            </form>

			
            
        </div>
    );
}

export default Insert;
