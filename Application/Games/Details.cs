using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Games
{
    public class Details
    {
        public class Query : IRequest<Game>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Game>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Game> Handle(Query request, CancellationToken cancellationToken)
            {
                await context.Games.FindAsync(request.Id);
            }
        }
    }
}