class Comment {
  constructor(attributes){
    this.user = attributes.user
    this.content = attributes.content
    this.post = attributes.post
  }
  
} 
$(
  () => {
    $('.getComments').on("submit", (e) => {
      e.preventDefault()
      address = $('.getComments').attr("action")
      $.get(address, (comments) => {
        comments.forEach((comment) => {$(".comments").append(comment.content)})
      })
    })
  }
)