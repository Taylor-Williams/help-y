class SessionsController < ApplicationController
  before_action :require_login, only:[:logout]

  def create
    @user = User.find_or_create_from_auth_hash(auth_hash)
    session[:user_id] = @user.id
    redirect_to @user, flash: {success: "Successfully logged in"}
  end

  def login
    user = User.find_by(email: params[:email])
    if user && user.authenticate(params[:password])
      @user = user
      session[:user_id] = @user.id
      redirect_to @user, flash: {success: "Successfully logged in"}
    else
      redirect_to root_path, flash: {danger: "email and/or password was incorrect"}
    end
  end

  def logout
    session.delete(:user_id) if session[:user_id]
    redirect_to root_path, flash: {success: "You have logged out"}
  end

  protected

  def auth_hash
    request.env['omniauth.auth']
  end
end
