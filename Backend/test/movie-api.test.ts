import { describe, it } from "mocha";
import { expect } from "chai";
import app from "../src/app";
import supertest from "supertest";
import MovieModel from "../src/2-models/movie-model";
import exp from "constants";

//this is test all my route in my application 
describe("Testing movies-route.ts", () => {

    it("should return Theaters array", async () => {
        const response = await supertest(app.server).get("/api/theater");
        const theaters = response.body;
        expect(theaters.length).to.be.greaterThanOrEqual(3);
    });

    it("should return movies by theaters", async () => {
        const response = await supertest(app.server).get("/api/movies-per-theater/1");
        const movies = response.body;
        expect(movies).to.not.be.empty;
    });

    it("should add a new movie to the database", async () => {
        const movie = { theaterId: 1, movieName: "Hello World", movieDateTime: "2023-03-25 07:00:00" ,movieSecond: 125 };
        const response = await supertest(app.server).post("/api/movies").send(movie);
        const addedMovie = response.body;
        expect(addedMovie).to.contain(movie);
        expect(addedMovie).to.be.not.empty;
        expect(response.statusCode).to.be.equal(201);
    });

    it("should return 204 status code on successful deletion", async () => {
        const response = await supertest(app.server).delete("/api/movies/2");
        expect(response.statusCode).to.be.equal(204);
    });

    
});