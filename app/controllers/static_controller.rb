class StaticController < ApplicationController

  def home

  end

  def signup
    @user = User.new
  end
end
