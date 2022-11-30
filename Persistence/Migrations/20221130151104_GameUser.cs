using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    public partial class GameUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GameUsers",
                columns: table => new
                {
                    AppUserId = table.Column<string>(type: "TEXT", nullable: false),
                    GameId = table.Column<Guid>(type: "TEXT", nullable: false),
                    IsHost = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GameUsers", x => new { x.AppUserId, x.GameId });
                    table.ForeignKey(
                        name: "FK_GameUsers_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GameUsers_Games_GameId",
                        column: x => x.GameId,
                        principalTable: "Games",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GameUsers_GameId",
                table: "GameUsers",
                column: "GameId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GameUsers");
        }
    }
}
