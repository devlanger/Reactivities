using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Games
{
    public class Create
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
            
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                //This is called in-memory
                _context.Games.Add(request.Game);

                //Call save in the database
                var result =  await _context.SaveChangesAsync() > 0;

                if(!result)
                {
                    return Result<Unit>.Failure("Failed to create game");
                }

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}