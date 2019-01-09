class User < ApplicationRecord
  has_secure_password
  has_many :posts
  has_many :volunteers
  has_many :comments
  has_many :appointments, through: :volunteers

  def self.find_or_create_from_auth_hash(auth_hash)
    self.find_or_create_by(email: auth_hash['info']['email']) do |u|
      u.name = auth_hash['info']['name']
      u.bio = auth_hash['extra']['raw_info']['bio']
      u.password = SecureRandom.hex
    end
  end
end
