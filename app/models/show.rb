
class Show < ApplicationRecord
  scope :on_date, -> (date=Date.today) { where on: date }

  scope :before_date, -> (date=nil) { where on: before_range(date) }

  scope :from_time, -> (time='00:00') { where 'starts >= ?', time }

  scope :before_time, -> (time=nil) { where('starts <= ?', time || hhmm) }

  scope :for_station, -> (station='radio4') { where station: station }

  scope :now_on, -> (station='radio4') {
    for_station(station).on_date.before_time.order(starts: :desc).limit(1)
  }

  class << self
    def add(atts)
      key_atts = { station: atts[:station],
                   on: atts[:on],
                   starts: atts[:starts] }

      find_or_create_by key_atts do |show|
        show.title = atts[:title]

        show.desc = atts[:desc]

        show.finishes = atts[:finishes]
      end
    end

    def insert(atts_list)
      atts_list.map {|atts| add atts }
    end

    def rm_old
    end

    def to_date(date, days_ago=0)
      case date
      when String
        Date.parse(date)
      when Date, Time, DateTime
        date
      else
        Date.today
      end
    end

    def before_range(date)
      (5.years.ago..to_date(date) - 1.day)
    end

    def to_mins(time)
      hours, mins = time.split(':')

      (hours.to_i * 60 + mins.to_i)
    end

    def to_hhmm(mins)
      "#{pad mins / 60}:#{pad mins % 60}"
    end

    def hhmm(time=nil)
      time or Time.now.strftime('%H:%M')
    end

    def pad(num)
      (100 + num.to_i).to_s[1..-1]
    end
  end
end

