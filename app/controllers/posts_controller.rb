class PostsController < ApplicationController
  before_action :require_login, except:[:index]

  def new
    @post = Post.new
  end

  def create
    @post = Post.new(post_params)
    @post.user_id = helpers.current_user
    if @post.save
      redirect_to @post, success: "Successfully created Post"
    else
      render :new, error: @post.errors.full_messages.join(", ")
    end
  end

  def index
    @posts = Post.all
  end

  def show
    @post = Post.find(params[:id])
    @post.appointments.build #for making new appointment
    @appointments = @post.appointments
    @post.comments.build(user_id: helpers.current_user) #for making new comment
    @comments = @post.comments
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


  def destroy
    if Post.find(params[:id])
      Post.destroy(params[:id])
      flash[:success] = "Successfully deleted Post"
    else
      flash[:error] = "Invalid Post to delete"
    end
    redirect_to posts_path
  end

  private

  def post_params
      params.require(:post).permit(:user_id, :title, :content)
  end
end
