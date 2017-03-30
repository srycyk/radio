
require 'date'

module BBC
  module FormatDate
    def convert_date(date, sep: '-')
      case date
      when ::Date, ::Time
        date = date.to_date
        date.strftime "%Y#{sep}%m#{sep}%d"
      else
        date.tr('-', sep)
      end
    end

    def to_time(date, time='00:00')
      date = Date.parse(date) if String === date

      Time.local(date.year, date.month, date.day, *time.split(':'))
    end

    extend self
  end
end

if $0 == __FILE__
  puts BBC::FormatDate.convert_date
end

