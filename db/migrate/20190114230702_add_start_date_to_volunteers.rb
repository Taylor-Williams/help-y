class AddStartDateToVolunteers < ActiveRecord::Migration[5.2]
  def change
    add_column :volunteers, :start_date, :datetime
  end
end
