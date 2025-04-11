using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Karma.Domain.Migrations
{
    /// <inheritdoc />
    public partial class activeField : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Active",
                schema: "core",
                table: "Users",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Active",
                schema: "core",
                table: "Users");
        }
    }
}
