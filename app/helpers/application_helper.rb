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

  def flash_class(level)
    case level
      when :notice then "alert alert-info"
      when :success then "alert alert-success"
      when :error then "alert alert-error"
      when :alert then "alert alert-error"
    end
  end

end
