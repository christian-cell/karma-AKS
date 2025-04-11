namespace Karma.Models.Responses;

public class UserResponse
{
    public Guid Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string DocumentNumber { get; set; }
    public string Email { get; set; }
        
    public UserResponse(string firstName, string lastName, string documentNumber, string email, Guid id)
    {
        FirstName = firstName;
        LastName = lastName;
        DocumentNumber = documentNumber;
        Email = email;
        Id = id;
    }
}