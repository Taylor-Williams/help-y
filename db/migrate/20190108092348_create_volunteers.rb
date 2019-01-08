class CreateVolunteers < ActiveRecord::Migration[5.2]
  def change
    create_table :volunteers do |t|
      t.integer :user_id
      t.integer :appointment_id
      t.timestamps
    end
  end
end
