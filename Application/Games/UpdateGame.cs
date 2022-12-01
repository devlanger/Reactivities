using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Games
{
    public class UpdateGame
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;
            private readonly IUserAccessor userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                this.context = context;
                this.userAccessor = userAccessor;
            }
            
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var game = await context.Games
                    .Include(g => g.Participants)
                    .ThenInclude(u => u.AppUser)
                    .SingleOrDefaultAsync(x => x.Id == request.Id);

                if(game == null)
                {
                    return null;
                }

                var user = await context.Users.FirstOrDefaultAsync(u => u.UserName == userAccessor.GetUsername());

                if(user == null)
                {
                    return null;
                }

                var hostUsername = game.Participants.FirstOrDefault(x => x.IsHost)?.AppUser?.UserName;

                var participant = game.Participants.FirstOrDefault(x => x.AppUser.UserName == user.UserName);

                if(participant != null && hostUsername == user.UserName)
                {
                    game.IsFinished = !game.IsFinished;
                }

                if(participant != null && hostUsername != user.UserName)
                {
                    game.Participants.Remove(participant);
                }

                if(participant == null)
                {
                    participant = new Domain.GameUser()
                    {
                        AppUser = user,
                        Game = game,
                        IsHost = false
                    };

                    game.Participants.Add(participant);
                }
                var result = await context.SaveChangesAsync() > 0;

                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem updating game");
            }
        }
    }
}