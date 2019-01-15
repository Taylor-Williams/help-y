class AddEndDateToVolunteers < ActiveRecord::Migration[5.2]
  def change
    add_column :volunteers, :end_date, :datetime
  end
end
