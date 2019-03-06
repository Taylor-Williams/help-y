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
Comment.getComments = function() {
  $.get(this.baseURL, (comments) => {
    if(comments.length) {
      this.renderCommentsDiv(comments)
    } else {
      this.commentsDiv.text("There are no comments for this post")
    }
  })
}
Comment.clearComments = function() {
  this.commentsDiv.empty()
  this.removeClearButton()
}
Comment.addClearButton = function() {
  let htmlString = "<input class=\"comments-clear\" type=\"submit\" value=\"Clear Comments\"></input>"
  this.getCommentsForm.append(htmlString)
  this.clearButton = $(".comments-clear")
  this.clearButton.on("click", (e) => {
    e.preventDefault()
    this.clearComments()
  })
}
Comment.removeClearButton = function() {
  this.clearButton.remove()
} 
Comment.renderCommentsDiv = function(comments){
  this.commentsDiv.text("")
  comments.forEach((comment) => {
    c = new this(comment)
    this.commentsDiv.append(c.renderComment())
  })
  if(!$(".comments-clear").length){this.addClearButton()}
}
Comment.saveComment = function() {
  let $form = Comment.commentForm
  let action = $form.attr("action")
  let formData = $form.serialize()
  $.post(action, formData, (comment) => {
    this.renderCommentsDiv([comment])
  })
  this.newCommentDiv.empty()
}
Comment.newCommentForm = function() { 
  this.newCommentDiv.html(new Comment().renderForm())
  this.commentForm = $(".comment-form")
  this.commentForm.on("submit", function(e){
    e.preventDefault()
    this.saveComment()
  })
}
Comment.renderTemplates = function(){
  this.source = document.getElementById("comment-template").innerHTML
  this.template = Handlebars.compile(Comment.source)
  this.commentFormSource = document.getElementById("comment-form-template").innerHTML
  this.commentFormTemplate = Handlebars.compile(Comment.commentFormSource)
}
Comment.renderAttributes = function(){
  this.userID = $(".user-link").attr("href").slice(-1)
  this.getCommentsForm = $('.get-comments')
  this.newCommentDiv = $('#new-comment')
  this.newCommentButton = $('#new-comment-button')
  this.baseURL = Comment.getCommentsForm.attr("action") // '/posts/:id/comments'
  this.commentsDiv = $(".comments")
  let digit = new RegExp("(\\d)") 
  this.postID = this.baseURL.split(digit)[1] // the id from the above url
}
$(
  function() {
    Comment.renderTemplates()
    Comment.renderAttributes()
    Comment.newCommentButton.on("click", function(){
      Comment.newCommentForm()
    })
    Comment.getCommentsForm.on("submit", function(e){
      e.preventDefault()
      Comment.getComments()
    })
  }
)