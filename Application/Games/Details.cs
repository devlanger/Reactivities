using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Games
{
    public class Details
    {
        public class Query : IRequest<Result<GameDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<GameDto>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<Result<GameDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var game = await context.Games
                    .ProjectTo<GameDto>(mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(x => x.Id == request.Id);

                return Result<GameDto>.Success(game);
            }
        }
    }
}