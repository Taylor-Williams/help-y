class CreateAppointments < ActiveRecord::Migration[5.2]
  def change
    create_table :appointments do |t|
      t.integer :post_id
      t.integer :spots
      t.datetime :start_date
      t.datetime :end_date
      t.text :info
      t.string :title
      t.timestamps
    end
  end
end
