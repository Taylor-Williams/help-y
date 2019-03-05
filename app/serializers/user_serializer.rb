class UserSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :comments, :posts
end
