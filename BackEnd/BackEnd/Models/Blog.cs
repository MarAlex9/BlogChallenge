using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Models
{
    public class Blog
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [Column(TypeName = "varchar(200)")]
        public string titulo { get; set; }
        [Required]
        [Column(TypeName = "varchar(3000)")]
        public string descripcion { get; set; }
        
        [Column(TypeName = "datetime")]
        public DateTime fecha { get; set; }
        [Column(TypeName = "varbinary(max)")]
        public byte[] imagen { get; set; }
    }
}
