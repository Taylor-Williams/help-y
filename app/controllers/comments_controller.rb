class CommentsController < ApplicationController
  before_action :require_login
  before_action :find_post
  before_action :find_comment, only:[:show, :update, :destroy]
  
  def create
    @comment = Comment.new(comment_params)
    if @comment.save
      render json: @comment, status: 200
    else
      render json: {response: 'invalid comment'}, status: 400
    end
  end

  def show
    render json: @comment, status: 200
  end

  def index
    render json: @post.comments, status: 200
  end

  def update
    if @comment.update(comment_params)
      render json: @comment, status: 200
    else
      render json: {response: 'invalid comment params'}, status: 400
    end
  end

  def destroy
    if @comment.user_id == session[:user_id]
      Comment.destroy(params[:id])
      render status: 200
    else
      render json: {response: 'invalid user'}, status: 400
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:user_id, :post_id, :content)
  end
  
  def find_post
    @post = Post.find(params[:post_id])
    flash[danger: "not a valid post"] unless @post
  end

  def find_comment
    @comment = Comment.find(params[:id])
    flash[danger: "not a valid comment"] unless @comment
  end
end
