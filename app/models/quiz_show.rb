
class QuizShow < Struct.new(:station, :date, :hhmm)
  def initialize(*)
    super

    if date.blank? or date == 'now'
      self.hhmm = Time.now.strftime '%H:%M'

      self.date = Date.today
    else
      self.hhmm ||= '00:00'

      self.date ||= Date.today
    end
  end

  def call
    #Show.stations(station).on_date(date).from_time(hhmm).in_order
    Show.stations(station).on_date(date).in_order
  end

  private

  class << self
    def call
      sql = %{select station, on_on from shows group by station, on_on order by on_on}

      whats_on = { 'stations' => Show::STATIONS, 'dates' => [] }

      query(sql).reduce(whats_on) do |acc, entry|
        date = entry['on_on'].to_s

        acc['dates'] << date unless acc['dates'].include? date

        (acc[entry['station']] ||= []) << date

        acc
      end
    end

    def by_station(for_upcoming=true)
      today = Date.today.to_s

      station_dates = call.slice *Show::STATIONS

      if for_upcoming
        station_dates.each do |station, dates|
          station_dates[station] = dates.select {|date| date >= today }
        end
      end

      station_dates
    end

    private

    def query(sql)
      ActiveRecord::Base.connection.execute(sql)
    end
  end
end

