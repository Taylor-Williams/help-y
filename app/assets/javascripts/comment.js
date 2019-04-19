class Comment {
  constructor(attributes = {}) {
    this.user = attributes.user
    this.content = attributes.content
    this.id = attributes.id
    this.post = attributes.post
    this.updated_at = attributes.updated_at
    this.isCurrentUser = this.checkUser()
  }
  checkUser(){
    return (this.user && this.user.id && parseInt(this.user.id) === parseInt(Comment.userID))
  }
  renderComment() {
    return Comment.template(this)
  }
  renderForm(){
    return Comment.formTemplate(this)
  }
}
Comment.getComments = function() {
  $.get(this.APIURL, (comments) => {
    if(comments.length) {
      this.commentsDiv.empty()
      this.clearButton.toggle()
      this.getCommentsForm.toggle()
      this.renderCommentsDiv(comments)
    } else {
      this.commentsDiv.text("There are no comments for this post")
    }
  })
}
Comment.clearComments = function() {
  this.commentsDiv.empty()
}
Comment.setToggles = function() {
  this.clearButton.click(() => {
    this.clearComments()
    this.clearButton.toggle()
    this.getCommentsForm.toggle()
  })
}
Comment.renderCommentsDiv = function(comments){
  this.allComments = $(".comment-content")
  if(!this.allComments.length){this.clearComments()}
  comments.forEach((comment) => {
    this.commentsDiv.append(new this(comment).renderComment())
  })
  this.attachEditListeners()
}
Comment.attachEditListeners = () => {
  editForms = $(".edit-comment-form")
  editForms.on("submit", function(e) {
    e.preventDefault()
    editform = $(this)
    commentDiv = editform.parent()
    action = editform.attr("action")
    $.get(action, (comment) => {
      commentDiv.html(new Comment(comment).renderForm())
      Comment.attachUpdateListener(commentDiv.children()[0])
    })
  })
}
Comment.attachUpdateListener = (updateForm) => {
  $(updateForm).on("submit", (e) => {
    e.preventDefault()
    let updateAction = $(updateForm).attr("action")
    let updateData = $(updateForm).serialize()
    $.ajax({
      type: 'PATCH',
      url: updateAction,
      data: updateData
    }).success((comment) => {
      $(updateForm).parent().html(new Comment(comment).renderComment())
      Comment.attachEditListeners()
    })
  })
}
Comment.newCommentForm = function() { 
  this.newCommentDiv.html(new Comment().renderForm())
  this.newForm = $(".new-comment-form") //created above ^
  this.newForm.on("submit", (e) => {
    e.preventDefault()
    this.saveComment()
  })
}
Comment.saveComment = function() {
  let action = this.newForm.attr("action")
  let formData = this.newForm.serialize()
  $.post(action, formData, (comment) => {
    this.renderCommentsDiv([comment])
  })
  this.newCommentDiv.empty()
}
Comment.renderTemplates = function(){
  this.template = Handlebars.compile(document.getElementById("comment-template").innerHTML)
  this.formTemplate = Handlebars.compile(document.getElementById("form-template").innerHTML)
}
Comment.renderAttributes = function(){
  this.userID = $(".user-link").attr("href").slice(-1)
  this.getCommentsForm = $('.get-comments')
  this.clearButton = $('#comments-clear')
  this.newCommentDiv = $('#new-comment')
  this.newCommentButton = $('#new-comment-button')
  this.APIURL = this.getCommentsForm.attr("action") // '/posts/:id/comments'
  this.commentsDiv = $(".comments")
  let digit = new RegExp("(\\d)") 
  this.postID = this.APIURL.split(digit)[1] // the id from the above url
}
$(document).on("turbolinks:load", function() {
  Comment.renderTemplates()
  Comment.renderAttributes()
  Comment.setToggles()
  Comment.newCommentButton.on("click", function(){
    Comment.newCommentForm()
  })
  Comment.getCommentsForm.on("submit", function(e){
    e.preventDefault()
    Comment.getComments()
  })
})