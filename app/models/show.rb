
class Show < ApplicationRecord
  STATION_NAMES = { 'radio3' => 'Radio 3',
                    'radio4' => 'Radio 4',
                    'radio4extra' => '4 Extra',
                    '5live' => '5 Live',
                    'worldserviceradio' => 'World Service',
                    '6music' => 'Radio 6' }

  STATIONS = STATION_NAMES.keys

  scope :on_date, -> (date=Date.today) { where on_on: date }

  scope :before_date, -> (date=nil) { on_date before_range(date) }

  scope :from_time, -> (time='00:00') { where 'starts >= ?', time }

  scope :before_time, -> (time=nil) { where 'starts <= ?', ShowTime.hhmm(time) }

  scope :stations, -> (stations) { where station: stations }

  scope :now_on, -> (station='radio4') {
    for_station(station).on_date.before_time.order(starts: :desc).limit(1)
  }

  scope :in_order, -> { order :on_on, :starts }

  class << self
    def insert(atts_list)
      transaction do
        atts_list.map {|atts| add atts }
      end
    end

    def add(atts)
      key_atts = atts.slice :station, :on_on, :starts

      find_or_create_by key_atts do |show|
        show.title = atts[:title]

        show.desc = atts[:desc]

        show.finishes = atts[:finishes]

        show.info_url = atts[:info_url]
      end
    end

    def purge(date=nil)
      before_date(date).delete_all
    end

    def rm(date, stations=STATIONS)
      on_date(date).stations(stations).delete_all
    end

    private

    def before_range(date)
      (5.years.ago...ShowTime.to_date(date))
    end
  end
end

