class UsersController < ApplicationController
    before_action :require_user_authentication, except: [:create, :show]
  
    def create
      @user = User.create(user_params)
      if @user.valid?
        session[:user_id] = @user.id
        redirect_to @user, success: "Successfully created profile"
      else
        render 'static/signup', error: @user.errors.full_messages.join(", ")
      end
    end
  
    def show
      @user = User.find(params[:id])
    end
  
    def update
      @user = User.find(params[:id])
      if @user.update(user_params)
        redirect_to @user, success: "Successfully edited profile"
      else
        render :show, error: @user.errors.full_messages.join(", ")
      end
    end

    def destroy
      User.destroy(params[:id])
      session.destroy(:user_id)
      redirect_to home_path, success: "Successfully deleted profile"
    end
  
    private
  
    def user_params
        params.require(:user).permit(:name, :password, :password_confirmation, :bio, :email, :height, :age)
    end
end
