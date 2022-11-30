using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Games
{
    public class List
    {
        public class Query : IRequest<Result<List<Game>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Game>>>
        {
            private readonly DataContext _context;
            
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Game>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Game>>.Success(await _context.Games.ToListAsync(cancellationToken));
            }
        }
    }
}