class CreateAppointments < ActiveRecord::Migration[5.2]
  def change
    create_table :appointments do |t|
      t.integer :post_id
      t.integer :spots
      t.date :start_date
      t.date :end_date
      t.text :info
      t.string :title
      t.timestamps
    end
  end
end
