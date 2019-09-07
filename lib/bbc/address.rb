#puts $: * "\n"

require 'bbc/format_date'

module BBC
  class Address < Struct.new(:station, :date)
    include FormatDate

    # http://www.bbc.co.uk/radio4/programmes/schedules/2017/02/01
    #URL_TEMPLATE = "http://www.bbc.co.uk/%s/programmes/schedules/%s"
    URL_TEMPLATE = "http://www.bbc.co.uk/schedules/%s/%s"

    def call
      URL_TEMPLATE % [token(station), convert_date(date, sep: '/')]
    end

    def to_s
      "#{call}\n"
    end

    private

    def token(station)
      case station
      when 'radio3'
        'p00fzl8t'
      when 'radio4'
        'p00fzl7j'
      when '5live'
        'p00fzl7g'
      when 'radio4extra'
        'p00fzl7l'
      when 'worldserviceradio'
        'p02zbmb3'
      when '6music'
        'p00fzl65'
      end
    end
  end
end

if $0 == __FILE__
  require_relative '../bbc'

  puts BBC::Address.new('radio4')
end

