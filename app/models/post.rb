class Post < ApplicationRecord
    belongs_to :user
    has_many :appointments
    has_many :volunteers, through: :appointments
    has_many :comments, inverse_of: :post
    accepts_nested_hash_for :comments

    validates :title, presence: true
    validates :content, length: {in: 10..1000, message: "keep your post content between 10 and 1000 characters."}
end
