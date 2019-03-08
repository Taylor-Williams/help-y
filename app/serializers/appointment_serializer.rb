class AppointmentSerializer < ActiveModel::Serializer
  attributes :id, :start_date, :end_date, :info, :title, :volunteers_count
  has_many :users
  belongs_to :post, serializer: CommentPostSerializer
end
