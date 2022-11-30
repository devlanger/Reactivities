using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Games
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
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
                var game = await _context.Games.FindAsync(request.Id);
                if(game == null)
                {
                    return null;
                }

                _context.Remove(game);

                var result = await _context.SaveChangesAsync() > 0;
                if(!result)
                {
                    return Result<Unit>.Failure("Failed to delete game");
                }

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}