class Comment {
  constructor(attributes) {
    this.user = attributes.user
    this.content = attributes.content
    this.post = attributes.post
    this.updated_at = attributes.updated_at
  }
}
$(
  () => {
    Comment.source = document.getElementById("comment-template").innerHTML
    Comment.template = Handlebars.compile(Comment.source)
  }
)
Comment.prototype.renderComment = function() {
  return Comment.template(this)
}
$(
  () => {
    $('.getComments').on("submit", (e) => {
      e.preventDefault()
      address = $('.getComments').attr("action")
      $.get(address, (comments) => {
        if(comments.length) {
          comments.forEach((comment) => {
          c = new Comment(comment)
          $(".comments").append(c.renderComment())})
        } else {
          $(".comments").text("There are no comments for this post")
        }
      })
    })
  }
)