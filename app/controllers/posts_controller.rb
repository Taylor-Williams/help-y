class PostsController < ApplicationController
  before_action :require_login, except:[:index, :show]

  def new
    @post = Post.new
  end

  def create
    @post = Post.new(post_params)
    @post.user_id = helpers.current_user
    if @post.save
      redirect_to @post, success: "Successfully created Post"
    else
      flash[:error] = @post.errors.full_messages.join(", ")
      render :new
    end
  end

  def index
    @posts = Post.all
  end

  def show
    @post = Post.find(params[:id])
    @post.comments.build(user_id: helpers.current_user) #for making new comment
    @comments = @post.comments
  end

  def destroy
    if Post.find(params[:id])
      Post.destroy(params[:id])
      flash[:success] = "Successfully deleted Post"
    else
      flash[:error] = "Invalid Post"
    end
    redirect_to home_path
  end

  def update
    @post = Post.find(params[:id])
    if @post && @post.update(post_params)
      flash[:success] = "Successfully edited Post"
    else
      flash[:error] = @post.errors.full_messages.join(", ")
    end
    render :show
  end

  private

  def post_params
      params.require(:post).permit(:user_id, :title, :content)
  end
end
