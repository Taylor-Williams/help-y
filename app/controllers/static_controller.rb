class StaticController < ApplicationController
  before_action :require_login, only:[:logout]

  def home

  end

  def login
    
  end

  def logout
    session.delete(:user_id)
    redirect_to root_path
  end

  def signup
    @user = User.new
  end
end
