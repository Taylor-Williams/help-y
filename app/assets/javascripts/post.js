class Post{
  constructor(attributes = {}){
    this.comments = comments
  }
}
Post.getPostRequest = function(){
  $.ajax({
    dataType: "JSON",
    url: `/posts/{this.dataset.id}`,
    method: "get"
  })
}
Post.renderAllComments = function(post){
  post.comments.forEach((comment) => {

  }
}
Post.addCommentsListener = function() {
  $('.get-post-comments').click(this.getPostRequest)
  .success(this.renderAllComments)
}
Post.ready = function(){
  Post.addCommentsListener()
}
$(document).on("turbolinks:load", function() {
  Post.ready()
})