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
Comment.clearComments = function() {
  this.commentsDiv.empty()
}
Comment.setToggles = function() {
  this.clearButton.click(() => {
    this.commentsDiv.empty()
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
  this.commentsDiv.append(this.newCommentButtonTemplate())
  $('#new-comment-button').on("click", Comment.newCommentForm)
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
  Comment.commentsDiv.append(new Comment().renderForm())
  $(".new-comment-form").on("submit", Comment.saveComment) //created above ^
  $(this).remove()
}
Comment.saveComment = function(e) {
  e.preventDefault()
  let action = $(this).attr("action")
  let formData = $(this).serialize()
  $.post(action, formData, (comment) => {
    Comment.renderCommentsDiv([comment])
  })
  $(this).remove()
}
Comment.renderTemplates = function(){
  this.newCommentButtonTemplate = Handlebars.compile(document.getElementById("new-comment-button-template").innerHTML)
  this.template = Handlebars.compile(document.getElementById("comment-template").innerHTML)
  this.formTemplate = Handlebars.compile(document.getElementById("form-template").innerHTML)
}
Comment.renderAttributes = function(){
  this.userID = $(".user-link").attr("href").slice(-1)
  this.clearButton = $('#comments-clear')
  this.commentsDiv = $("#comments")
  this.getCommentsForm = $('.get-comments')
}
Comment.getComments = function(e) {
  e.preventDefault()
  console.log(this)
  $.get(this.attributes.action.value, (comments) => {
    if(comments.length) {
      Comment.clearComments()
      Comment.clearButton.toggle()
      Comment.getCommentsForm.toggle()
      Comment.renderCommentsDiv(comments)
    } else {
      Comment.commentsDiv.text("There are no comments for this post")
    }
  })
}
Comment.ready = function(){
  this.renderTemplates()
  this.renderAttributes()
  this.setToggles()
  this.getCommentsForm.on("submit", this.getComments)
}
$(document).on("turbolinks:load", function() {
  Comment.ready()
})