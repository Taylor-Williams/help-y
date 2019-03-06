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
Comment.clearComments = () => {
  Comment.commentsDiv.empty()
  Comment.removeButton.remove()
}
Comment.addClearButton = () => {
  Comment.getCommentsForm.append("<input id=\"comments-clear\" type=\"submit\" value=\"Clear Comments\"></input>")
  Comment.removeButton = $("#comments-clear")
  Comment.removeButton.on("click", (e) => {
    e.preventDefault()
    Comment.clearComments()
  })
}
Comment.removeClearButton = () => {
  Comment.removeButton.remove()
} 
Comment.renderCommentsDiv = function(comments){
  Comment.commentsDiv.text("")
  comments.forEach((comment) => {
    c = new Comment(comment)
    Comment.commentsDiv.append(c.renderComment())
  })
  Comment.addClearButton()
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
Comment.newCommentForm = function(){ 
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
  Comment.baseURL = Comment.getCommentsForm.attr("action") // '/posts/:id/comments'
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
    Comment.getCommentsForm.on("submit", function(e){
      e.preventDefault()
      Comment.getComments()
    })
  }
)