class CommentsController < ApplicationController
  before_action :require_logged_in
  
  def create
    @comment = Comment.create(comment_params)
    if @comment.valid?
      redirect_to comment_path(@comment), :success = "Successfully created commment"
    else
      flash[:error] = @comment.errors.full_messages.join(", ")
      render "posts/show"
    end
  end

  def show
    @comment = Comment.find(params[:id]) || Comment.new()
  end

  def destroy
    comment = Comment.find(params[:id])
    if comment && comment.user_id == session[user_id]
      Comment.destroy(params[:id])
      redirect_to post_path(params[:post_id]), :success = "Successfully deleted commment"
    else
      redirect_to user_path(session[:user_id]), :failure = "Cannot delete comment"
    end
  end

  def update
    @comment = Comment.find(params[:id])
    if @comment.update(comment_params)
      redirect_to @comment, :success = "Successfully edited commment"
    else
       flash[:error] = @comment.errors.full_messages.join(", ")
       render :edit
    end
  end

  private

  def comment_params
      params.require(:comment).permit(:user_id, :post_id, :content)
  end
end
