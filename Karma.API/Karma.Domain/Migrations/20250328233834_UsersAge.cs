using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Karma.Domain.Migrations
{
    /// <inheritdoc />
    public partial class UsersAge : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Age",
                schema: "core",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Age",
                schema: "core",
                table: "Users");
        }
    }
}
