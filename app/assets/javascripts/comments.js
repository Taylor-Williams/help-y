class Comment {
  constructor(attributes) {
    this.user = attributes.user
    this.content = attributes.content
    this.id = attributes.id
    this.post = attributes.post
    this.updated_at = attributes.updated_at
  }
  renderComment() {
    return Comment.template(this)
  }
  renderForm(){
    return Comment.commentFormTemplate(this)
  }
}
Comment.getComments = function() {
  $.get(getAddress, (comments) => {
    if(comments.length) {
      comments.forEach((comment) => {
      c = new Comment(comment)
      $(".comments").append(c.renderComment())})
    } else {
      $(".comments").text("There are no comments for this post")
    }
  })
}
Comment.newCommentForm = function(){
  let newComment = new Comment({user: {id:Comment.userID},post: {id: Comment.postID}}) 
  $('#new-comment').html(newComment.renderForm())
}
Comment.renderTemplates = function(){
  Comment.source = document.getElementById("comment-template").innerHTML
  Comment.template = Handlebars.compile(Comment.source)
  Comment.commentFormSource = document.getElementById("comment-form-template").innerHTML
  Comment.commentFormTemplate = Handlebars.compile(Comment.commentFormSource)
}
Comment.renderAttributes = function(){
  Comment.userID = $(".user-link").attr("href").slice(-1)
  Comment.getAddress = $('.get-comments').attr("action")
  let digit = new RegExp("(\\d)") 
  Comment.postID = Comment.getAddress.split(digit)[1]
}
$(
  function() {
    Comment.renderTemplates()
    Comment.renderAttributes()
    $('#new-comment-button').on("click", function(){
      Comment.newCommentForm()
    })
    $('.get-comments').on("submit", function(e){
      e.preventDefault()
      Comment.getComments()
    })
  }
)