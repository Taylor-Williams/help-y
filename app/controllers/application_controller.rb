class ApplicationController < ActionController::Base
   private

   def require_login
    unless helpers.logged_in?
      flash[:danger] = "You must be logged in to access this page"
      redirect_to root_path
    end
   end
 
   def require_user_authentication
    unless helpers.current_user == params[:id].to_i
      flash[:danger] = "You must be logged in to the right account access this page"
      redirect_to root_path
    end
   end
  
end
