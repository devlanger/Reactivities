using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Games
{
    public class List
    {
        public class Query : IRequest<Result<List<GameDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<GameDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                this.mapper = mapper;
            }

            public async Task<Result<List<GameDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var games = await _context.Games
                .ProjectTo<GameDto>(mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

                return Result<List<GameDto>>.Success(games);
            }
        }
    }
}