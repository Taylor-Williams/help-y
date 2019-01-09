class PostsController < ApplicationController
  before_action :require_login

  def new
    @post = post.new
  end

  def create
    @post = Post.create(post_params)
    if @post.valid?
      flash[:success] = "Successfully created Post"
      render :show
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
  end

  def destroy
    if Post.find(params[:id])
      post.destroy(params[:id])
      flash[:success] = "Successfully Deleted Post"
    else
      flash[:error] = "Invalid Post"
    end
    render '/'
  end

  def update
    @post = Post.find(params[:id])
    if @post.update(post_params)
      flash[:success] = "Successfully created Post"
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
