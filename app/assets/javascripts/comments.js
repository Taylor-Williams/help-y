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
  this.removeButton.remove()
}
Comment.addClearButton = function() {
  let htmlString = "<input id=\"comments-clear\" type=\"submit\" value=\"Clear Comments\"></input>"
  this.getCommentsForm.append(htmlString)
  this.removeButton = $("#comments-clear")
  this.removeButton.on("click", (e) => {
    e.preventDefault()
    Comment.clearComments()
  })
}
Comment.removeClearButton = () => {
  this.removeButton.remove()
} 
Comment.renderCommentsDiv = function(comments){
  this.commentsDiv.text("")
  comments.forEach((comment) => {
    c = new this(comment)
    this.commentsDiv.append(c.renderComment())
  })
  this.addClearButton()
}
Comment.saveComment = function() {
  let $form = Comment.commentForm
  let action = $form.attr("action")
  let formData = $form.serialize()
  $.post(action, formData, (comment) => {
    Comment.renderCommentsDiv([comment])
  })
  Comment.newCommentDiv.empty()
}
Comment.newCommentForm = function() { 
  Comment.newCommentDiv.html(new Comment().renderForm())
  Comment.commentForm = $(".comment-form")
  Comment.commentForm.on("submit", function(e){
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
  Comment.getCommentsForm = $('.get-comments')
  Comment.newCommentDiv = $('#new-comment')
  Comment.newCommentButton = $('#new-comment-button')
  Comment.baseURL = Comment.getCommentsForm.attr("action") // '/posts/:id/comments'
  Comment.commentsDiv = $(".comments")
  let digit = new RegExp("(\\d)") 
  Comment.postID = this.baseURL.split(digit)[1] // the id from the above url
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