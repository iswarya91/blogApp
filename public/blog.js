
$("#delete_blog").on("click", function() {
    var blogId = $(this).attr("data-blogId");
    $.ajax({
    type: "DELETE",
    url: "/blogs/" + blogId ,
    success: function(msg){
        alert("Data Deleted: " + msg);
    }
    });
}); 
