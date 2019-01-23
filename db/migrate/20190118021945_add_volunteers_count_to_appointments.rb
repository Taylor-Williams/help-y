class AddVolunteersCountToAppointments < ActiveRecord::Migration[5.2]
  def change
    add_column :appointments, :volunteers_count, :integer, default: 0
  end
end
