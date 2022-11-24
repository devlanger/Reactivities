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
        private readonly IMediator mediator;

        public GamesController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Game>>> GetGames()
        {
            return await mediator.Send(new List.Query());
        }

        [HttpGet("{id}")] 
        public async Task<ActionResult<Game>> GetGame(Guid id)
        {
            return Ok();
        }
    }
}