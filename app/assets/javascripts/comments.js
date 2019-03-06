class Comment {
  constructor(attributes) {
    this.user = attributes.user
    this.content = attributes.content
    this.post = attributes.post 
  }
}
$(
  () => {
    Comment.source = document.getElementById("comment-template").innerHTML;
    Comment.template = Handlebars.compile(Comment.source);
    console.log(Comment.template())
  }
)
Comment.prototype.renderComment = () => {
  return Comment.template(this)
}
$(
  () => {
    $('.getComments').on("submit", (e) => {
      e.preventDefault()
      address = $('.getComments').attr("action")
      $.get(address, (comments) => {
        console.log(comments)
        comments.forEach((comment) => {
          c = new Comment(comment)
          console.log(c)
          console.log(c.renderComment())
          $(".comments").append(c.renderComment())})
      })
    })
  }
)