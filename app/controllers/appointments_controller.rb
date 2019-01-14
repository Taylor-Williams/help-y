class AppointmentsController < ApplicationController
  before_action :require_login

  def new
    @post = Post.find(params[:post_id])
    unless @post && helpers.is_current_user(@post.user)
      redirect_to posts_path, flash: {danger: "You are not authorized to make that appointment"}
    end
    render :new
  end

  def create
    @appointment = Appointment.create(appointment_params)
    if @appointment.valid? 
      flash[:success] = "Successfully created appointment"
    else
      flash[:danger] = @appointment.errors.full_messages.join(", ")
    end
    redirect_to post_path(params[:post_id])
  end

  def update
    @appointment = Appointment.find(params[:id])
    if @appointment.update(appointment_params)
      flash[:success] = "Successfully edited appointment"
    else
      flash[:danger] = @appointment.errors.full_messages.join(", ")
    end
    redirect_to post_path(params[:post_id])
  end

  def destroy
    appointment = Appointment.find(params[:id])
    if appointment && appointment.user_id == session[user_id]
      Appointment.destroy(params[:id])
      flash[:success] = "Successfully deleted appointment"
    else
      flash[:danger] = "Cannot delete appointment"
    end
    redirect_to post_path(params[:post_id])
  end

  private

  def appointment_params
    params.require(:appointment).permit(:post_id, :spots, :start_date, :end_date, :info, :title)
  end
end
