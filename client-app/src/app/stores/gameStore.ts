import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { IGame } from "../models/game";

export default class GameStore
{
    games: IGame[] = [];
    game: IGame | null = null;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor(){
        makeAutoObservable(this)
    }

    loadGames = async () => {
        this.setLoadingInitial(true);
        try{
            const games = await agent.Games.list();
            games.forEach(game => {
                game.releaseDate = game.releaseDate.split('T')[0];
                this.games.push(game);
              })

            this.setLoadingInitial(false);
        }
        catch(error){
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
}