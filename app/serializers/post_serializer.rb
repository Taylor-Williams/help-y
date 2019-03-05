class PostSerializer < ActiveModel::Serializer
  attributes :id, :content, :title
  belongs_to :user
end
