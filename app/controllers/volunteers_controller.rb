class VolunteersController < ApplicationController
  before_action :require_login

  def create
    volunteer = Volunteer.create(volunteer_params)
    if volunteer.valid?
      flash[:success] = 'successfully signed up to volunteer'
    else
      flash[:danger] = volunteer.errors.full_messages.join(", ")
    end
    redirect_to appointment_path(params[:appointment_id])
  end

  def update
    volunteer = Volunteer.find(params[:id])
    if volunteer && volunteer.update(volunteer_params)
      flash[:success] = 'successfully edited volunteer dates'
    else
      flash[:danger] = volunteer.errors.full_messages.join(", ")
    end
    redirect_to appointment_path(params[:appointment_id])
  end

  def destroy
    volunteer = Volunteer.find(params[:id])
    if volunteer && helpers.is_current_user?(volunteer.user)
      Volunteer.destroy(volunteer.id)
      flash[:success] = 'successfully un-signed up to volunteer'
    else
      flash[:danger] = volunteer.errors.full_messages.join(", ")
    end
    redirect_to appointment_path(params[:appointment_id])
  end

  private
  
  def volunteer_params
    params.require(:volunteer).permit(:start_date, :end_date, :appointment_id, :user_id)
  end
end
