using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class GamesController : BaseApiController
    {
        private readonly DataContext context;

        public GamesController(DataContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Game>>> GetGames()
        {
            return await context.Games.ToListAsync();
        }

        [HttpGet("{id}")] 
        public async Task<ActionResult<Game>> GetGame(Guid id)
        {
            return await context.Games.FirstOrDefaultAsync(g => g.Id == id);
        }
    }
}