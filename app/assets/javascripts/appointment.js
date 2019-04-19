class Appointment {
  constructor(attributes = {}) {
    this.post = attributes.post
    this.id = attributes.id
    this.title = attributes.title
    this.spots_left = attributes.spots_left
    this.info = attributes.info
    this.start_date = attributes.start_date
    this.end_date = attributes.end_date
    this.owner_id = attributes.owner_id
    this.owner_name = attributes.owner_name
    this.availableId = Appointment.allAppointments.length
    Appointment.allAppointments.push(this)
  }
  renderAppointment() {
    return Appointment.template(this)
  }
  renderFullApp(){
    return Appointment.fullTemplate(this)
  }
}
Appointment.getAppointments = function(){
  $.ajax({
    dataType: "JSON",
    url: '/appointments/available',
    method: "get"
  }).success((appointments) => {
    Appointment.createAppointments(appointments)
    Appointment.renderAppointments()
  })
}
Appointment.createAppointments = function(appointments){
  appointments.forEach((a) => {new Appointment(a)})
}
Appointment.renderAppointments = function(){
  this.appointmentsDiv.empty()
  this.allAppointments.forEach((a) => {
    this.appointmentsDiv.append(a.renderAppointment())
  })
  this.attachMoreInfoListeners()
}
Appointment.attachMoreInfoListeners = function(){
  $(".more-info-button").click(function() {
    Appointment.renderAppointmentById(this.dataset.id)
  })
}
Appointment.renderAppointmentById = function(id){
  Appointment.appointmentsDiv.html(Appointment.allAppointments[id].renderFullApp())
  Appointment.attachNLAButtons(id)
}
Appointment.attachNLAButtons = function(id){
  let appId = parseInt(id)
  $("#next-info-button").click(() => {this.renderAppointmentById(appId + 1)})
  $("#last-info-button").click(() => {this.renderAppointmentById(appId - 1)})
  $("#all-info-button").click(() => {this.renderAppointments()})
}
Appointment.renderTemplates = function(){
  this.template = Handlebars.compile(document.getElementById("appointment-template").innerHTML)
  this.fullTemplate = Handlebars.compile(document.getElementById("full-appointment-template").innerHTML)
}
Appointment.renderAttributes = function(){
  this.appointmentsDiv = $('.appointments')
  this.userID = $(".user-link").attr("href").slice(-1)
  this.allAppointments = []
}
$(
  function() {
    Appointment.renderTemplates()
    Appointment.renderAttributes()
    Appointment.getAppointments()
  }
)