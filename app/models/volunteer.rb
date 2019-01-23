class Volunteer < ApplicationRecord
  belongs_to :user
  belongs_to :appointment, counter_cache: true

  validates :start_date, date: { after_or_equal_to: Proc.new { |obj| obj.appointment.start_date },
    after_or_equal_to: Proc.new { Date.today },
    message: 'must be after today and appointment start date' }, on: :create

  validates :end_date, date: { after: :start_date,
    before_or_equal_to: Proc.new { |obj| obj.appointment.end_date },
    message: 'must be after start date and before appointment end date' }
end
