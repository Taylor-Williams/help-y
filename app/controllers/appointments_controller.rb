class AppointmentsController < ApplicationController
  before_action :require_login
  before_action :find_post, except: [:available, :show]
  before_action :find_appointment, except: [:available, :new, :create]

  def new
    @appointment = @post.appointments.build
    unless helpers.is_current_user?(@post.user)
      redirect_to posts_path, flash: {danger: "You are not authorized to make that appointment"}
    end
    render :new
  end

  def create
    @appointment = Appointment.create(appointment_params)
    if @appointment.valid?
      flash[:success] = "Successfully created appointment"
      redirect_to post_path(params[:post_id])
    else
      flash[:danger] = @appointment.errors.full_messages.join(", ")
      render :new
    end
  end

  def show
    redirect_to available_appointments_path, flash: {danger: "No such appointment"} unless @appointment
    respond_to do |format|
      format.json {render json: @appointment, status: 200}
      format.html {
        if @appointment.has_user?(helpers.current_user)
          @volunteer = Volunteer.find_by(appointment_id: @appointment.id, user_id: helpers.current_user) 
        else
          @volunteer = Volunteer.new
        end
        render :show, status: 302
      }
    end
  end

  def available
    respond_to do |format|
      format.json {render json: Appointment.available, status: 200}
      format.html {render :available, status: 200}
    end
  end

  def update
    if @appointment.update(appointment_params)
      flash[:success] = "Successfully edited appointment"
    else
      flash[:danger] = @appointment.errors.full_messages.join(", ")
    end
    redirect_to post_path(params[:post_id])
  end

  def destroy
    if @appointment.owner_id == helpers.current_user
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

  def find_post
    @post = Post.find(params[:post_id])
    flash[danger: "not a valid post"] unless @post
  end

  def find_appointment
    @appointment = Appointment.find(params[:id])
    flash[danger: "not a valid appointment"] unless @appointment
  end
end
