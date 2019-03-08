class Appointments {
  constructor(attributes = {}) {
    this.user = attributes.user
    this.post = attributes.post
    this.id = attributes.id
    this.info = attributes.info
    this.start_date = attributes.start_date
    this.end_date = attributes.end_date
    this.isCurrentUser = (parseInt(this.user.id) === parseInt(Appointment.userID))
  }
  renderAppointment() {
    return Appointments.template(this)
  }
  renderForm(){
    return Appointments.formTemplate(this)
  }
}
$(
  function() {
    Appointments.renderTemplates()
    Appointments.renderAttributes()
    Appointments.newAppointmentsButton.on("click", function(){
      Appointments.newAppointmentsForm()
    })
    Appointments.getAppointmentssForm.on("submit", function(e){
      e.preventDefault()
      Appointments.getAppointmentss()
    })
  }
)