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
  $postCommentsDiv = $(`#${post.id}-comments`)
  $postCommentsDiv.empty()
  if(post.comments.length){
     post.comments.forEach((comment) => {
      $postCommentsDiv.append(Post.commentTemplate(Object.assign({user:{id: post.user.id, name: post.user.name}}, comment)))
    })
  } else {
    $postCommentsDiv.html("this post has no comments!")
  }
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