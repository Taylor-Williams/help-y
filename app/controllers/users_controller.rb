class UsersController < ApplicationController
    before_action :require_user_authentication, except: [:create, :show]
    before_action :require_login, only: [:show]
  
    def create
      @user = User.create(user_params)
      if @user.valid?
        flash[:success] = "Successfully created profile"
        session[:user_id] = @user.id
        redirect_to user_path(@user)
      else
        flash[:error] = @user.errors.full_messages.join(", ")
        render 'static/signup'
      end
    end
  
    def show
      @user = User.find(params[:id])
    end
  
    def destroy
      User.destroy(params[:id])
      session.destroy(:user_id)
      flash[:success] = "Successfully deleted profile"
      render '/'
    end
  
    def update
      @user = User.find(params[:id])
      if @user.update(user_params)
        flash[:success] = "Successfully edited profile"
        redirect_to @user
      else
         flash[:error] = @user.errors.full_messages.join(", ")
         render :edit
      end
    end
  
    private
  
    def user_params
        params.require(:user).permit(:name, :password, :password_confirmation, :bio, :email, :height, :age)
    end
end
