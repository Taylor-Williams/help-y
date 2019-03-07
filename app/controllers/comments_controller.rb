class CommentsController < ApplicationController
  before_action :require_login
  
  def create
    @comment = Comment.new(comment_params)
    if @comment.save
      respond_to do |f|
        f.json {render json: @comment, status: 200}
        f.html {redirect_to post_path(params[:post_id])}
      end
    else
      respond_to do |f|
        f.json {render json: {response: 'invalid comment'}, status: 400}
        f.html {redirect_to post_path(params[:post_id])}
      end
    end
  end

  def show
    post = Post.find(params[:post_id])
    comment = Comment.find(params[:id])
    if post && comment
      render json: comment, status: 200
    else
      render json: {response: 'invalid Post id'}, status: 400
    end
  end

  def index
    post = Post.find(params[:post_id])
    if post
      render json: post.comments, status: 200
    else
      render json: {response: 'invalid Post id'}, status: 400
    end
  end

  def update
    if Post.find(params[:post_id])
      @comment = Comment.find(params[:id])
      if @comment.update(comment_params)
        binding.pry
        respond_to do |f|
          f.json {render json: @comment, status: 200}
          f.html {redirect_to post_path(params[:post_id])}
        end
      else
        respond_to do |f|
          f.json {render json: {response: 'invalid comment'}, status: 400}
          f.html {redirect_to post_path(params[:post_id])}
        end
      end
    end
  end

  def destroy
    comment = Comment.find(params[:id])
    if comment && comment.user_id == session[:user_id]
      Comment.destroy(params[:id])
      redirect_to post_path(params[:post_id]), flash: {success: "Successfully deleted comment"}
    else
      redirect_to user_path(session[:user_id]), flash: {danger: "Cannot delete comment"}
    end
  end

  private

  def comment_params
      params.require(:comment).permit(:user_id, :post_id, :content)
  end
end
