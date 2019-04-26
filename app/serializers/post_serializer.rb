class PostSerializer < ActiveModel::Serializer
  attributes :id, :content, :title
  has_many :comments
  belongs_to :user
end
