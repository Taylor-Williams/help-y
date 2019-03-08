class AppointmentSerializer < ActiveModel::Serializer
  attributes :id, :start_date, :end_date, :info, :title, :volunteers_count
  belongs_to :user
  belongs_to :post, serializer: CommentPostSerializer
end
