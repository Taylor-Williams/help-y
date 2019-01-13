class ApplicationController < ActionController::Base
   private

   def require_login
    flash[:danger] = "You must be logged in to access this page"
    redirect_to root_path unless helpers.logged_in?
   end
 
   def require_user_authentication
    flash[:danger] = "You must be logged in to the right account access this page"
    redirect_to root_path unless helpers.current_user == params[:id].to_i
   end
  
end
