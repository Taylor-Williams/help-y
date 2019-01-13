class Appointment < ApplicationRecord
  belongs_to :post
  has_many :volunteers
  has_many :users, through: :volunteers

  validates :info, length: {in: 1..1000, message: "keep your comment info between 1 and 1000 characters."}
  validates :spots, numericality: {only_integer: true}
  validates :start_date, date: { after: Proc.new { Date.today }, message: 'must be after today' }, on: :create
  validates :end_date, date: { after: :start_date, message: 'must be after start date' }

  def spots_left
    spots - volunteers.size
  end

  def display_date(date)
    date.strftime("%B %-d %Y at %I:%M %P")
  end

  def active?
    (Time.now - end_date).to_i < 0
  end
end
