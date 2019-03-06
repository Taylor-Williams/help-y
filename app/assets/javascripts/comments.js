class Comment {
  constructor(attributes = {}) {
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
  $.get(Comment.baseURL, (comments) => {
    if(comments.length) {
      Comment.renderCommentsDiv(comments)
    } else {
      Comment.commentsDiv.text("There are no comments for this post")
    }
  })
}
Comment.renderCommentsDiv = function(comments){
  comments.forEach((comment) => {
    c = new Comment(comment)
    Comment.commentsDiv.append(c.renderComment())
  })
}
Comment.saveComment = function() {
  let $form = $(".comment-form")
  let action = $form.attr("action")
  let formData = $form.serialize()
  $.post(action, formData, (comment) => {
    Comment.renderCommentsDiv([comment])
  })
}
Comment.newCommentForm = function(){ 
  $('#new-comment').html(new Comment().renderForm())
  $(".comment-form").on("submit", function(e){
    e.preventDefault()
    Comment.saveComment()
  })
}
Comment.renderTemplates = function(){
  Comment.source = document.getElementById("comment-template").innerHTML
  Comment.template = Handlebars.compile(Comment.source)
  Comment.commentFormSource = document.getElementById("comment-form-template").innerHTML
  Comment.commentFormTemplate = Handlebars.compile(Comment.commentFormSource)
}
Comment.renderAttributes = function(){
  Comment.userID = $(".user-link").attr("href").slice(-1)
  Comment.baseURL = $('.get-comments').attr("action") // '/posts/:id/comments'
  Comment.commentsDiv = $(".comments")
  let digit = new RegExp("(\\d)") 
  Comment.postID = this.baseURL.split(digit)[1] // the id from the above url
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