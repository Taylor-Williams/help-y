class AppointmentSerializer < ActiveModel::Serializer
  attributes :id, :start_date, :end_date, :info, :title, :volunteers_count, :owner_id, :owner_name, :spots_left
  belongs_to :post
end
