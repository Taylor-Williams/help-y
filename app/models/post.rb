class Post < ApplicationRecord
    belongs_to :user
    has_many :comments, :appointments
    has_many :volunteers, through: :appointments
end
