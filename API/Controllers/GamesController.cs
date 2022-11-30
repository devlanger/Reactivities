using System.Collections.Generic;
using Application.Games;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class GamesController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult> GetGames()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")] 
        public async Task<ActionResult<Game>> GetGame(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{ Id = id }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateGame(Game game)
        {
            return HandleResult(await Mediator.Send(new Create.Command{ Game = game }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditGame(Guid id, Game game)
        {
            game.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{ Game = game }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGame(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{ Id = id }));
        }
    }
}