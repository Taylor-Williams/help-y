class Comment {
  constructor(attributes) {
    this.user = attributes.user
    this.content = attributes.content
    this.id = attributes.id
    this.post = attributes.post
    this.updated_at = attributes.updated_at
  }
  renderComment() {
    return Comment.template(this)
  }
}
Comment.getComments = function() {
  address = $('.get-comments').attr("action")
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
    Comment.commentFormSource = document.getElementById("comment-form-template").innerHTML
    Comment.commentFormTemplate = Handlebars.compile(Comment.commentFormSource)
    console.log(Comment.commentFormTemplate())
    Comment.userID = $(".user-link").attr("href").slice(-1)
    $('#new-comment').text(Comment.commentFormTemplate(new Comment({user: Comment.userID})))
    $('.get-comments').on("submit", function(e){
      e.preventDefault()
      Comment.getComments()
    })
  }
)