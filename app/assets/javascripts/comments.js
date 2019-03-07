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
  renderEditComment(){
    return Comment.editTemplate(this)
  }
  renderNewForm(){
    return Comment.newTemplate(this)
  }
  renderUpdateForm(){
    return Comment.updateTemplate(this)
  }
}
Comment.getComments = function() {
  $.get(this.baseURL, (comments) => {
    if(comments.length) {
      this.commentsDiv.empty()
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
  let oldComments = $(".comment-content")
  if(!$(".comment-content").length){this.commentsDiv.empty()}
  comments.forEach((comment) => {
    c = new this(comment)
    commentID = c.id
    if(parseInt(c.user.id) === parseInt(this.userID)){
      this.commentsDiv.append(c.renderEditComment())
      $(`#edit-${commentID}`).on("submit", function() {
        let action = this.newForm.attr("action")
        $.get(action, (comment) => {
          $(`data-comment-id="${comment.id}"`).html(new Comment(comment).renderUpdateForm())
        })
      })
    }else{
      this.commentsDiv.append(c.renderComment())
    }
  })
  if(!$(".comments-clear").length){this.addClearButton()}
}
Comment.saveComment = function() {
  let action = this.newForm.attr("action")
  let formData = this.newForm.serialize()
  $.post(action, formData, (comment) => {
    this.renderCommentsDiv([comment])
  })
  this.newCommentDiv.empty()
}
Comment.newCommentForm = function() { 
  this.newCommentDiv.html(new Comment().renderForm())
  this.newForm = $(".new-comment-form") //created above ^
  this.newForm.on("submit", (e) => {
    e.preventDefault()
    this.saveComment()
  })
}
Comment.renderTemplates = function(){
  this.template = Handlebars.compile(document.getElementById("comment-template").innerHTML)
  this.editTemplate = Handlebars.compile(document.getElementById("edit-comment-template").innerHTML)
  this.newTemplate = Handlebars.compile(document.getElementById("new-form-template").innerHTML)
  this.updateTemplate = Handlebars.compile(document.getElementById("update-form-template").innerHTML)
}
Comment.renderAttributes = function(){
  this.userID = $(".user-link").attr("href").slice(-1)
  this.getCommentsForm = $('.get-comments')
  this.newCommentDiv = $('#new-comment')
  this.newCommentButton = $('#new-comment-button')
  this.baseURL = this.getCommentsForm.attr("action") // '/posts/:id/comments'
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