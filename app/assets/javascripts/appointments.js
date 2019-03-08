class Appointment {
  constructor(attributes = {}) {
    this.user = attributes.user
    this.post = attributes.post
    this.id = attributes.id
    this.info = attributes.info
    this.start_date = attributes.start_date
    this.end_date = attributes.end_date
    //this.isCurrentUser = (parseInt(this.user.id) === parseInt(Appointment.userID))
  }
  renderAppointment() {
    return Appointment.template(this)
  }
  renderForm(){
    return Appointment.formTemplate(this)
  }
}
Appointment.renderTemplates = function(){
  this.template = Handlebars.compile(document.getElementById("appointment-template").innerHTML)
  this.formTemplate = Handlebars.compile(document.getElementById("form-template").innerHTML)
}
Appointment.renderAttributes = function(){
  this.appointmentsDiv = $('.appointments')
  this.userID = $(".user-link").attr("href").slice(-1)
}
$(
  function() {
    Appointment.renderTemplates()
    Appointment.renderAttributes()
    console.log("hello")
    $.ajax({
      url: '/appointments/available',
      method: "get",
      dataType: "json",
    }).success((appointments) => {
      console.log(appointments)
      appointments.forEach((appointment) => {Appointment.appointmentsDiv.append(new Appointment(appointment).renderAppointment())})
    })
  }
)