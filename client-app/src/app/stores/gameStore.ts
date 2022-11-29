import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { v4 as uuid } from "uuid";
import { IGame } from "../models/game";

export default class GameStore
{
    games: IGame[] = [];
    selectedGame: IGame | undefined = undefined;
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

    selectGame = (id: string) => {
        this.selectedGame = this.games.find(g => g.id === id);
    }

    cancelSelectedGame = () => {
        this.selectedGame = undefined;
    }

    openForm = (id?: string) => {
        id ? this.selectGame(id) : this.cancelSelectedGame();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    createGame = async (game: IGame) => {
        this.loading = true;
        game.id = uuid();

        try
        {
            await agent.Games.create(game);
            runInAction(()=>{
                this.games.push(game);
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
                this.games = [...this.games.filter(a => a.id !== game.id), game];
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
                this.games = [...this.games.filter(g=>g.id !== id)];
                if(this.selectedGame !== undefined && this.selectedGame.id === id)
                {
                    this.cancelSelectedGame();
                }
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