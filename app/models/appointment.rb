class Appointment < ApplicationRecord
  belongs_to :post
  has_many :volunteers
  has_many :users, through: :volunteers

  validates :info, length: {in: 1..1000, message: "keep your comment info between 1 and 1000 characters."}
  validates :spots, numericality: { only_integer: true, greater_than_or_equal_to: 1 }
  validates :start_date, date: { after_or_equal_to: Proc.new { Date.today }, message: 'cannot be before today\'s date' }, on: :create
  validates :end_date, date: { after: :start_date, message: 'must be after start date' }
  validates :volunteers_count, numericality: { less_than_or_equal_to: :spots }

  def days_left
    (end_date - Date.today).to_i
  end

  def spots_left
    spots - volunteers_count.to_i if spots
  end

  def display_date(date)
    date.strftime("%B %-d %Y at %I:%M %P")
  end

  def active?
    days_left > 0
  end

  def full?
    spots == volunteers_count
  end

  def available?
    active? && !full?
  end

  def owner_id
    self.post.user_id
  end

  def owner_name
    self.post.user.name
  end

  def active_string
    case
    when !active?
      "Closed, appointment end date has passed."
    when active? && full?
      "Active, but full of volunteers. consider emailing the post creator if you're really interested."
    when available?
      "Open for #{days_left} more days and ready to take #{spots_left} volunteers!"
    end
  end

  def has_user?(user_id)
    volunteers.any?{|v| v.user_id = user_id}
  end

  def self.available
    where("end_date >= ?", Time.now) & where.not("volunteers_count = spots").order(end_date: :asc)
  end
end
