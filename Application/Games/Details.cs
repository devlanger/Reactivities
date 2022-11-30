using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Games
{
    public class Details
    {
        public class Query : IRequest<Result<Game>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Game>>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<Game>> Handle(Query request, CancellationToken cancellationToken)
            {
                var game = await context.Games.FindAsync(request.Id);
                return Result<Game>.Success(game);
            }
        }
    }
}