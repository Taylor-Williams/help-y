class PostsController < ApplicationController
  before_action :require_login, except:[:index]

  def new
    @post = Post.new
  end

  def create
    @post = Post.new(post_params)
    @post.user_id = helpers.current_user
    if @post.save
      redirect_to @post, flash: {success: "Successfully created Post"}
    else
      flash[:danger] = @post.errors.full_messages.join(", ")
      render :new
    end
  end

  def index
    @posts = Post.all
  end

  def show
    @post = Post.find(params[:id])
    unless @post
      redirect_to home_path, flash:{error: "Not a valid Post"}
    end
    @appointments = @post.appointments
    respond_to do |format|
      format.json {render json: @post, status: 200}
      format.html {render :show, status: 200}
    end
  end

  def update
    @post = Post.find(params[:id])
    if @post && @post.update(post_params)
      flash[:success] = "Successfully edited Post"
    else
      flash[:danger] = @post.errors.full_messages.join(", ")
    end
    redirect_to @post
  end


  def destroy
    if Post.find(params[:id])
      Post.destroy(params[:id])
      flash[:success] = "Successfully deleted post"
    else
      flash[:danger] = "Invalid Post to delete"
    end
    redirect_to posts_path
  end

  private

  def post_params
    params.require(:post).permit(:user_id, :title, :content, appointments_attributes:
      [:title, :spots, :info, :start_date, :end_date, :volunteers_count])
  end
end
