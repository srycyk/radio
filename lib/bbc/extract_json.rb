
require 'time'
require 'json'

module BBC
  class ExtractJson
    JSON_RE = /<script type="application\/ld\+json">(.*?)<\/script>/m

    attr_accessor :html, :shows

    def initialize(html)
      self.html = html
    end

    def call
      json_text = html.scan(JSON_RE)[1].first.strip

      json = JSON.parse json_text

      self.shows = json['@graph'].map {|record| extract record }
    end

    def extract(record)
      info = record['publication']

      series = record['partOfSeries'] || {}

      fields = []

      fields << hhmm(info['startDate'])

      fields << title(series['name'], record['name'])

      fields << record['description']

      fields << hhmm(info['endDate'])

      fields << record['url']

      fields
    end

    def title(*values)
      text = ''

      values.each do |value|
        text << ' - ' if present?(text) and present?(value)

        text << value if present?(value)
      end

      text.strip
    end

    def present?(value)
      value and not value.empty?
    end

    def hhmm(date_time)
      date_time = parse_time(date_time)

      date_time.strftime '%H:%M'
    end

    def parse_time(time_string)
      @zone ||= (Time.zone = 'London')

      Time.zone.parse time_string
    rescue
      Time.parse time_string
    end
  end
end

  if $0 == __FILE__
    parser = BBC::ExtractJson.new IO.read 'tmp/in/5live/2018-03-25.html'

    parser.call.each {|show| puts show.inspect }
  end
