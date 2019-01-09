class User < ApplicationRecord
  has_secure_password
  has_many :posts, :volunteers, :comments
  has_many :appointments, through: :volunteers
end
