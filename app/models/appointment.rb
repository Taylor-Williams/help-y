class Appointment < ApplicationRecord
  belongs_to :post
  has_many :volunteers
  has_many :users, through: :volunteers

  validates :post_id, presence: true
  validates :title, presence: true
  validates :info, length: {in: 1..1000, message: "keep your comment info between 1 and 1000 characters."}
  validates :spots, numericality: {only_integer: true}

  def spots_left
    self.spots - self.volunteers.size
  end
end
