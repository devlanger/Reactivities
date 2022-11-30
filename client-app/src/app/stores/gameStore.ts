import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { v4 as uuid } from "uuid";
import { IGame } from "../models/game";

export default class GameStore
{
    gameRegistry = new Map<string, IGame>();
    selectedGame: IGame | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor(){
        makeAutoObservable(this)
    }

    get gamesByDate() {
        return Array.from(this.gameRegistry.values()).sort((a, b) => 
            Date.parse(a.releaseDate) - Date.parse(b.releaseDate));
    }

    loadGames = async () => {
        try{
            const games = await agent.Games.list();
            games.forEach(game => {
                this.setGame(game);
              })

            this.setLoadingInitial(false);
        }
        catch(error){
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadGame = async (id: string) => {
        let game = this.getGame(id);
        if(game)
        {
            this.selectedGame = game;
        }
        else
        {
            this.loadingInitial = true;
            try{
                game = await agent.Games.details(id);
                this.setGame(game);
                this.setLoadingInitial(false);
            }
            catch(error)
            {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setGame = (game: IGame) => {
        game.releaseDate = game.releaseDate.split('T')[0];
        this.gameRegistry.set(game.id, game);
    } 

    private getGame = (id: string) => {
        return this.gameRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createGame = async (game: IGame) => {
        this.loading = true;
        game.id = uuid();

        try
        {
            await agent.Games.create(game);
            runInAction(()=>{
                this.gameRegistry.set(game.id, game);
                this.selectedGame = game;
                this.editMode = false;
                this.loading = false;
            })
        }
        catch(error)
        {
            console.log(error);
            runInAction(()=>{
                this.loading = false;
            })
        }
    }

    updateGame = async (game: IGame) => {
        this.loading = true;
        try{
            await agent.Games.update(game);
            runInAction(()=>{
                this.gameRegistry.set(game.id, game);
                this.selectedGame = game;
                this.editMode = false;
                this.loading = false;
            })
        }
        catch(error)
        {
            console.log(error);
            runInAction(()=>{
                this.loading = false;
            })
        }
    }

    deleteGame = async (id: string) => {
        this.loading = true;
        try{
            await agent.Games.delete(id);
            runInAction(()=>{
                this.gameRegistry.delete(id);
                this.loading = false;
            })
        }
        catch(error)
        {
            console.log(error);
            runInAction(()=>{
                this.loading = false;
            })
        }
    }
}