class CommentsController < ApplicationController
  
  def create
    if @comment = Comment.create(comment_params)
      flash[:success] = "Successfully created comment"
    else
      flash[:error] = @comment.errors.full_messages.join(", ")
    end
    redirect_to post_path(params[:post_id])
  end

  def update
    @comment = Comment.find(params[:id])
    if @comment.update(comment_params)
      flash[:success] = "Successfully edited comment"
    else
      flash[:error] = @comment.errors.full_messages.join(", ")
    end
    redirect_to post_path(params[:post_id])
  end

  def destroy
    comment = Comment.find(params[:id])
    if comment && comment.user_id == session[user_id]
      Comment.destroy(params[:id])
      redirect_to post_path(params[:post_id]), success: "Successfully deleted comment"
    else
      redirect_to user_path(session[:user_id]), failure: "Cannot delete comment"
    end
  end

  private

  def comment_params
      params.require(:comment).permit(:user_id, :post_id, :content)
  end
end
