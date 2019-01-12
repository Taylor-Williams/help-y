module ApplicationHelper

  def logged_in?
    !!session[:user_id]
  end

  def current_user
    session[:user_id] if logged_in?
  end

  def is_current_user?(user)
    user.id == current_user
  end

end
