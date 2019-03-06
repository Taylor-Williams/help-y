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
  renderForm(){
    return Comment.commentFormTemplate(this)
  }
}
Comment.getComments = () => {
  $.get(Comment.baseURL, (comments) => {
    if(comments.length) {
      Comment.renderComments(comments)
    } else {
      $(".comments").text("There are no comments for this post")
    }
  })
}
Comment.renderComments = function(comments){
  comments.forEach((comment) => {
    c = new Comment(comment)
    $(".comments").append(c.renderComment())
  })
}
Comment.saveComment = function() {
  let newContent = $("#new-comment-content").text()
//   $.post('/games', gameData, function(game) {
//     currentGame = game.data.id;
//     $('#games').append(`<button id="gameid-${game.data.id}">${game.data.id}</button><br>`);
//     $("#gameid-" + game.data.id).on('click', () => reloadGame(game.data.id));
//   });
  $.ajax({
    type: 'post',
    url: Comment.baseURL,
    data: {comment: {content: newContent, user_id: Comment.userID, post_id: Comment.postID}}
  })
}
Comment.newCommentForm = function(){
  let newComment = new Comment({user: {id:Comment.userID},post: {id: Comment.postID}}) 
  $('#new-comment').html(newComment.renderForm())
}
Comment.renderTemplates = function(){
  Comment.source = document.getElementById("comment-template").innerHTML
  Comment.template = Handlebars.compile(Comment.source)
  Comment.commentFormSource = document.getElementById("comment-form-template").innerHTML
  Comment.commentFormTemplate = Handlebars.compile(Comment.commentFormSource)
}
Comment.renderAttributes = function(){
  Comment.userID = $(".user-link").attr("href").slice(-1)
  Comment.baseURL = $('.get-comments').attr("action") // '/posts/:id/comments'
  let digit = new RegExp("(\\d)") 
  Comment.postID = this.baseURL.split(digit)[1] // the id from the above url
}
$(
  function() {
    Comment.renderTemplates()
    Comment.renderAttributes()
    $('#new-comment-button').on("click", function(){
      Comment.newCommentForm()
    })
    $("#create-comment").on("submit", function(e){
      e.preventDefault()
      Comment.saveComment()
    })
    $('.get-comments').on("submit", function(e){
      e.preventDefault()
      Comment.getComments()
    })
  }
)
// some logic for later: when there is no comment being shown there is no "#comment-content"
// in (".comments"). there may be some inner html.
// if (currentGame) {
//   $.ajax({
//     type: 'PATCH',
//     url: `/games/${currentGame}`,
//     data: gameData
//   });
// } else {
//   $.post('/games', gameData, function(game) {
//     currentGame = game.data.id;
//     $('#games').append(`<button id="gameid-${game.data.id}">${game.data.id}</button><br>`);
//     $("#gameid-" + game.data.id).on('click', () => reloadGame(game.data.id));
//   });
// }
// copied from tictactoe lab