class Appointments {
  constructor(attributes = {}) {
    this.user = attributes.user
    this.content = attributes.content
    this.id = attributes.id
    this.post = attributes.post
    this.updated_at = attributes.updated_at
    this.isCurrentUser = (this.user && this.user.id && parseInt(this.user.id) === parseInt(Comment.userID))
  }
  renderComment() {
    return Comment.template(this)
  }
  renderForm(){
    return Comment.formTemplate(this)
  }
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