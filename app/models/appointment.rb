class Appointment < ApplicationRecord
  belongs_to :post
  has_many :volunteers
  has_many :users, through: :volunteers

  validates :info, length: {in: 1..1000, message: "keep your comment info between 1 and 1000 characters."}
  validates :spots, numericality: {only_integer: true}

  def spots_left
    spots - volunteers.size
  end

  def display_date(date)
    date.strftime("%B %-d %Y at %I:%M %P")
  end
end
