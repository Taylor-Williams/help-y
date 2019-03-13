class AppointmentSerializer < ActiveModel::Serializer
  attributes :id, :start_date, :end_date, :info, :title, :volunteers_count, :owner_id
  belongs_to :post
end
