class PostSerializer < ActiveModel::Serializer
  attributes :id, :content, :title
  belongs_to :user
  has_many :comments
end
