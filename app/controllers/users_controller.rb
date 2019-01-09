class UsersController < ApplicationController
    has_secure_password
    before_action :require_user_authentication, except: [:new, :create]

    def new
      @user = User.new
    end
  
    def create
      @user = User.create(user_params)
      if @user.valid?
        session[:user_id] = @user.id
        redirect_to user_path(@user)
      else
        @errors = @user.errors.messages
        render :new
      end
    end

    def index
      @users = Users.new
    end
  
    def show
      @user = User.find(params[:id])
    end
  
    def destroy
      User.destroy(params[:id])
      session.destroy(:user_id)
      redirect_to root_path
    end
  
    def edit
      @user = User.find(params[:id])
    end
  
    def update
      @user = User.find(params[:id])
      if @user.update(user_params)
         redirect_to @user
      else
         flash[:error] = @user.errors.full_messages.join(", ")
         render :edit
      end
    end
  
    private
  
    def user_params
        params.require(:user).permit(:name, :password, :bio, :email, :height, :age)
    end
end
