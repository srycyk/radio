
require 'date'

#require 'bbc/struct_utils'

module BBC
  class Show < Struct.new(:station, :on_on, :starts,
                          :title, :desc, :finishes, :info_url)
    include Comparable

    include FormatDate

    def to_s
      "#{on_on} #{starts} - #{station} #{finishes} #{EOL} #{title}#{EOL}  #{desc}#{EOL}#{EOL}"
    end

    def to_atts
      to_h
    end

    def <=>(other)
      %i(on_on starts station).each do |field_name|
        this, that = self[field_name], other[field_name]

        if this < that
          return -1
        elsif this > that
          return 1
        end
      end
      0
    end

    class << self
      def list(station, date=nil)
        date ||= Date.today

        puts "  #{date} #{station}"

        if Dir.exists? 'tmp/in'
          extractor station, date
        else
          extractor station, date, fetch_class: BBC::FetchHtmlNoSave
        end
      end

      def extractor(station, date, fetch_class: BBC::FetchHtml,
                                   extract_class: BBC::ExtractJson)
                                   #extract_class: BBC::ExtractHtml)
        date = date.to_s

        data = fetch_class.new(station, date).()

        extract_class.new(data).().map {|details| new station, date, *details }
      end

      def json_extractor(station, date, fetch_class: BBC::FetchHtml)
        extractor station, date, fetch_class: fetch_class,
                                 extract_class: BBC::ExtractJson
      end

      def html_extractor(station, date)
        extractor station, date, fetch_class: BBC::FetchHtml,
                                 extract_class: BBC::ExtractHtml
      end

      def lynx_extractor(station, date)
        extractor station, date, fetch_class: BBC::FetchLynx,
                                 extract_class: BBC::ExtractLynx
      end

      def ahead(station, days=7)
        starts = Date.today

        ends = starts + days.to_i

        (starts..ends).reduce([]) {|acc, on| acc += list station, on }
      end

      def all(days=nil, stations=STATIONS)
        days ||= 0

        stations.reduce([]) {|acc, station| acc += ahead station, days }
      end

      def atts(*args)
        list(*args).sort.map(&:to_atts)
      end

      def json(*args)
        list(*args).sort.map(&:to_atts).to_json
      end
    end
  end
end

