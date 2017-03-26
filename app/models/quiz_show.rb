
class QuizShow < Struct.new(:station, :date, :hhmm)
  def initialize(*)
    super

    if date == :now
      self.hhmm = Time.now.strftime '%H:%M'

      self.date = Date.today
    else
      self.hhmm ||= '00:00'

      self.date ||= Date.today
    end
  end

  def call
    Show.stations(station).on_date(date).from_time(hhmm).in_order
  end

  private

  class << self
    def call
      sql = %<select station, on_on from shows group by station, on_on>

      whats_on = { 'stations' => Show::STATIONS, 'dates' => [] }

      query(sql).reduce(whats_on) do |acc, entry|
        date = entry['on_on'].to_s

        acc['dates'] << date unless acc['dates'].include? date

        (acc[entry['station']] ||= []) << date

        acc
      end
    end

    def by_station
      call.slice *Show::STATIONS
    end

    private

    def query(sql)
      ActiveRecord::Base.connection.execute(sql)
    end
  end
end

