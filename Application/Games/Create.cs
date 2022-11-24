using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Games
{
    public class Create
    {
        public class Command : IRequest
        {
            public Game Game { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                //This is called in-memory
                _context.Games.Add(request.Game);

                //Call save in the database
                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}