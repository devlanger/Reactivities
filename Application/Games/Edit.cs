using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Games
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Game Game { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(g => g.Game).SetValidator(new GameValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var game = await _context.Games.FindAsync(request.Game.Id);

                if(game == null)
                {
                    return null;
                }

                _mapper.Map(request.Game, game);
                var result = await _context.SaveChangesAsync() > 0;
                if(!result)
                {
                    return Result<Unit>.Failure($"Couldnt update game with id {request.Game.Id}");
                }

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}