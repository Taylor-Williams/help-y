class Comment < ApplicationRecord
    belongs_to :post
    belongs_to :user

    validates :user_id, presence: true
    validates :post_id, presence: true
    validates :content, length: {in: 1..1000, message: "keep your comment content between 1 and 1000 characters."}
end
