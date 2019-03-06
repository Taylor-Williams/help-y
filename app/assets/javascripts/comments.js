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