using System.Collections.Generic;
using Application.Games;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class GamesController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Game>>> GetGames()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")] 
        public async Task<ActionResult<Game>> GetGame(Guid id)
        {
            return await Mediator.Send(new Details.Query{ Id = id });
        }

        [HttpPost]
        public async Task<IActionResult> CreateGame(Game game)
        {
            return Ok(await Mediator.Send(new Create.Command{ Game = game }));
        }
    }
}