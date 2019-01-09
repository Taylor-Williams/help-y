class StaticController < ApplicationController
  before_action :require_login, only:[:logout]

  def home

  end

  def login
    
  end

  def logout
    session.delete(:user_id)
  end

  def signup
  
  end
end
