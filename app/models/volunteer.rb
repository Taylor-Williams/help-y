class Volunteer < ApplicationRecord
    belongs_to :user, :appointment
end
