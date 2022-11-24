using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Games
{
    public class List
    {
        public class Query : IRequest<List<Game>> { }

        public class Handler : IRequestHandler<Query, List<Game>>
        {
            private readonly DataContext _context;
            
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Game>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Games.ToListAsync();
            }
        }
    }
}