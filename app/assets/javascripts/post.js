class Post{}
Post.getPostRequest = function(){
  $.ajax({
    dataType: "JSON",
    url: `/posts/${this.dataset.id}`,
    method: "get"
  }).success(Post.renderAllComments)
  .fail(() => {console.log("there was some error that happened.")})
}
Post.renderAllComments = function(post){
  console.log(post)
  $postCommentsDiv = $(`#${post.id}-comments`)
  $postCommentsDiv.empty()
  post.comments.forEach((comment) => {
    console.log(comment)
    $postCommentsDiv.append(Post.commentTemplate(comment))
  })
}
Post.addCommentsListener = function() {
  $('.get-post-comments').click(this.getPostRequest)
}
Post.ready = function(){
  this.addCommentsListener()
  this.commentTemplate = Handlebars.compile(document.getElementById("comment-template").innerHTML)
}
Post.renderComment = function(comment) {
  return Post.commentTemplate(comment)
}
$(document).on("turbolinks:load", function() {
  Post.ready()
})