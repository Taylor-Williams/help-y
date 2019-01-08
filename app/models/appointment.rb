class Appointment < ApplicationRecord
    belongs_to :post
    has_many :volunteers
    has_many :users, through: :volunteers
end
