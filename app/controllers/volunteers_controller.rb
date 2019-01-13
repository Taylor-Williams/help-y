class VolunteersController < ApplicationController
  def manage
    volunteer = Volunteer.find_by(appointment_id: params[:appointment_id], user_id: params[:user_id])
    if volunteer
      Volunteer.destroy(volunteer.id)
      flash[:success] = 'successfully un-signed up to volunteer'
    else
      volunteer = Volunteer.create(appointment_id: params[:appointment_id], user_id: params[:user_id])
      if volunteer.valid?
        flash[:success] = 'successfully signed up to volunteer'
      else
        flash[:danger] = volunteer.errors.full_messages.join(", ")
      end
    end
    redirect_to post_path(params[:post_id])
  end
end
