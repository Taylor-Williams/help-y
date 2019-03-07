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
  $.get(this.APIURL, (comments) => {
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
}
Comment.addClearButton = function() {
  this.getCommentsForm.append(this.clearButtonHTML)
  this.clearButton = $(".comments-clear")
  this.clearButton.on("click", (e) => {
    e.preventDefault()
    this.clearComments()
    this.clearButton.remove()
  })
}
Comment.renderCommentsDiv = function(comments){
  this.allComments = $(".comment-content")
  if(!this.allComments.length){this.clearComments()}
  comments.forEach((comment) => {
    this.commentsDiv.append(this.getCommentHTML(new this(comment)))
  })
  if(!$(".comments-clear").length){this.addClearButton()}
}
Comment.getCommentHTML = function(comment) {
  if(parseInt(comment.user.id) === parseInt(this.userID)){
    return comment.renderEditComment()
  }else{
    return comment.renderComment()
  }
}
Comment.attachEditListener = (commentID) => {
  editForm = $(`#edit-${commentID}`)
  editForm.on("submit", function(e) {
    e.preventDefault()
    editform = $(this)
    commentDiv = editform.parent()
    action = editform.attr("action")
    $.get(action, (comment) => {
      commentDiv.html(new Comment(comment).renderUpdateForm())
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
      console.log(comment)
      $(updateForm).parent().html(new Comment(comment).renderEditComment())
    })
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
Comment.newCommentForm = function() { 
  this.newCommentDiv.html(new Comment().renderNewForm())
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
  this.clearButtonHTML = "<input class=\"comments-clear\" type=\"submit\" value=\"Clear Comments\"></input>"
}
Comment.renderAttributes = function(){
  this.userID = $(".user-link").attr("href").slice(-1)
  this.getCommentsForm = $('.get-comments')
  this.newCommentDiv = $('#new-comment')
  this.newCommentButton = $('#new-comment-button')
  this.APIURL = this.getCommentsForm.attr("action") // '/posts/:id/comments'
  this.commentsDiv = $(".comments")
  let digit = new RegExp("(\\d)") 
  this.postID = this.APIURL.split(digit)[1] // the id from the above url
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