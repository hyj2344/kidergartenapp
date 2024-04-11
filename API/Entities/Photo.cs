using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    [Table("Photos")]
    public class Photo
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
        public string PublicId { get; set; }
        // Define the relationship between the photos and AppUser, it is a one to many relationship,
        // it force the AppUserId nonnullable in the photo table and ondelete cascade.Based on this reason, we add Appuser and its id
        // AppUser will not appear in the table
        public AppUser AppUser { get; set; }
        public int AppUserId { get; set; }
    }
}
