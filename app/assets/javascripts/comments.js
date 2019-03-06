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
Comment.getComments = () => {
  $.get(Comment.getAddress, (comments) => {
    if(comments.length) {
      Comment.postComments(comments)
    } else {
      $(".comments").text("There are no comments for this post")
    }
  })
}
Comment.postComments = function(comments){
  comments.forEach((comment) => {
    c = new Comment(comment)
    $(".comments").append(c.renderComment())
  })
}
Comment.saveComment = function() {
  let newContent = $("#new-comment-content").text()
  $.post(Comment.saveAddress, {comment: {content: newContent}}, () => {

  })
  this.postComments()
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
  Comment.postID = this.getAddress.split(digit)[1]
  Comment.saveAddress = this.getAddress
}
$(
  function() {
    Comment.renderTemplates()
    Comment.renderAttributes()
    $('#new-comment-button').on("click", function(){
      Comment.newCommentForm()
    })
    $("#create-comment").on("submit", function(e){
      e.preventDefault()
      Comment.saveComment()
    })
    $('.get-comments').on("submit", function(e){
      e.preventDefault()
      Comment.getComments()
    })
  }
)