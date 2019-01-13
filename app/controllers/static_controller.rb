class StaticController < ApplicationController
  before_action :require_login, only:[:logout]

  def home

  end

  def login
    @user = User.find_by(email: params[:email])
    if @user && @user.authenticate(params[:password])
      session[:user_id] = @user.id
      redirect_to @user
    else
      redirect_to root_path, flash: {error: "email and/or password was incorrect"}
    end
  end

  def logout
    session.delete(:user_id) if session[:user_id]
    redirect_to root_path, flash: {success: "You have logged out"}
  end

  def signup
    @user = User.new
  end
end
