class Comment < ApplicationRecord
  belongs_to :post
  belongs_to :user

  validates :content, length: {in: 1..1000, message: "keep your comment content between 1 and 1000 characters."}
end
