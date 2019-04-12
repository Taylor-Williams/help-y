j = User.create(name: "john", email: "john@john.com", password: "john", password_confirmation: "john")
d = User.create(name: "david", email: "david@david.com", password: "david", password_confirmation: "david")
s = User.create(name: "samantha", email: "samantha@samantha.com", password: "samantha", password_confirmation: "samantha")
c = User.create(name: "chris", email: "chris@chris.com", password: "chris", password_confirmation: "chris")
a = User.create(name: "andrea", email: "andrea@andrea.com", password: "andrea", password_confirmation: "andrea")
j.posts.create(title: "my great farm", content: "great place to pet pigs and ride the horse(s?)")
d.posts.create(title: "my great ranch", content: "great place to raise cattle and farm crops")
s.posts.create(title: "my great library", content: "great place to read books and learn the arts")
c.posts.create(title: "my great workshop", content: "great place to build anything mechanical")
a.posts.create(title: "my great mansion", content: "great place to play hide-and-go-seek")
todays_date = Date.today
later_date = Date.new(2025)
j.posts.first.appointments.create(spots: 1, start_date: todays_date, end_date: later_date,
  info: "help me paint the farm and wrangle the pigs", title: "farmhand needed")
d.posts.first.appointments.create(spots: 2, start_date: todays_date, end_date: later_date,
  info: "need two cattle herders and seed planters", title: "experience ranch life")
s.posts.first.appointments.create(spots: 3, start_date: todays_date, end_date: later_date,
  info: "book restoration and organization, dewey decimal system learning", title: "fix up a library in need")
c.posts.first.appointments.create(spots: 4, start_date: todays_date, end_date: later_date,
  info: "shop cleaning, tool repleneshing, inventory taking", title: "keep a workshop in good condition")
a.posts.first.appointments.create(spots: 5, start_date: todays_date, end_date: later_date,
  info: "help us cook and clean and entertain us", title: "keep us company in this big mansion")
j.volunteers.build(appointment_id: 2, start_date: todays_date, end_date: later_date)
d.volunteers.build(appointment_id: 3, start_date: todays_date, end_date: later_date)
s.volunteers.build(appointment_id: 4, start_date: todays_date, end_date: later_date)
c.volunteers.build(appointment_id: 5, start_date: todays_date, end_date: later_date)
a.volunteers.build(appointment_id: 1, start_date: todays_date, end_date: later_date)