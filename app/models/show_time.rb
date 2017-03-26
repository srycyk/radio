
class ShowTime
  class << self
    def to_date(date, day_offset=0)
      case date
      when String
        Date.parse(date)
      when Date, Time, DateTime
        date
      else
        Date.today
      end
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

    private

    def pad(num)
      (100 + num.to_i).to_s[1..-1]
    end
  end
end

