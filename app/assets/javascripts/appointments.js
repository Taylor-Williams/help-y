class Appointment {
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
    return Appointment.template(this)
  }
  renderForm(){
    return Appointment.formTemplate(this)
  }
}
Appointment.renderTemplates = function(){

}
Appointment.renderAttributes = function(){

}
$(
  function() {
    Appointment.renderTemplates()
    Appointment.renderAttributes()
  }
)