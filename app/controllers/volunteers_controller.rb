class VolunteersController < ApplicationController
  before_action :require_login

  def manage
    volunteer = Volunteer.find_by(volunteer_params)
    if volunteer
      Volunteer.destroy(volunteer.id)
      flash[:success] = 'successfully un-signed up to volunteer'
    else
      volunteer = Volunteer.create(volunteer_params)
      if volunteer.valid?
        flash[:success] = 'successfully signed up to volunteer'
      else
        flash[:danger] = volunteer.errors.full_messages.join(", ")
      end
    end
    redirect_to post_path(params[:post_id])
  end

  private
  
  def volunteer_params
    params.require(:volunteer).permit(:appointment_id, :user_id)
  end
end
