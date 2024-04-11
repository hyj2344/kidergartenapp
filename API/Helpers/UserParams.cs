namespace API;

public class UserParams : PaginationParams
{
    public string CurrentUsername { get; set; }
    public string Gender { get; set; }
    public int MinAge { get; set; } = 0;
    public int MaxAge { get; set; } = 18;
    public string OrderBy { get; set; } = "lastActive";
}
