class Comment {
  constructor(attributes) {
    this.user = attributes.user
    this.content = attributes.content
    this.post = attributes.post
    this.updated_at = attributes.updated_at
  }
  renderComment() {
    return Comment.template(this)
  }
}
Comment.getComments = function() {
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
}
$(
  function() {
    Comment.source = document.getElementById("comment-template").innerHTML
    Comment.template = Handlebars.compile(Comment.source)
    $('.getComments').on("submit", function(e){
      e.preventDefault()
      Comment.getComments()
    })
  }
)