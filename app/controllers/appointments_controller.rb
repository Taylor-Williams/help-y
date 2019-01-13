class AppointmentsController < ApplicationController
  def create
    if @appointment = Appointment.create(appointment_params)
      redirect_to post_path(params[:post_id]) success: "Successfully created appointment"
    else
      render 'posts/show', error: @appointment.errors.full_messages.join(", ")
    end
  end

  def update
    @appointment = Appointment.find(params[:id])
    if @appointment.update(appointment_params)
      flash[:success] = "Successfully edited appointment"
    else
      flash[:error] = @appointment.errors.full_messages.join(", ")
    end
    redirect_to post_path(params[:post_id])
  end

  def destroy
    appointment = Appointment.find(params[:id])
    if appointment && appointment.user_id == session[user_id]
      Appointment.destroy(params[:id])
      flash[:success] = "Successfully deleted appointment"
    else
      flash[:failure] = "Cannot delete appointment"
    end
    redirect_to post_path(params[:post_id])
  end

  private

  def appointment_params
      params.require(:appointment).permit(:user_id, :post_id, :spots, :start_date, :end_date, :info, :title)
  end
end
