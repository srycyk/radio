
#require 'bbc/fetch'

module BBC
  class ExtractLynx < Struct.new(:text)
    EOS = "View Programme information"

    #EXTRACT_RE = /.+?(\d\d:\d\d)([^-]*)-[\s\d\/]*(.*?)#{EOS}?/m
    EXTRACT_RE = /.+?(\d\d:\d\d)(.*?)#{EOS}?/m

    def call
      scan
    end

    private

    def scan
      shows = []

      last_time = '00:00'

#puts text
      text.scan EXTRACT_RE do |match|
#0.upto(match.size - 1) {|i| puts "-- #{i}. #{match[i]}" }

        time = match[0]

        break if shows.any? {|show| show.first == time }

        details = clean match[1]

        title, details = details.split(/\n+/m, 2)

        #desc = details.gsub(/\(BBC.+homepage\)/mi, '')
        #desc = collapse trim desc

        desc = collapse trim details

        # finishes
#puts '-' * 30, time, shows.last.inspect, '-' * 30 if time >= '23:30'
        shows.last&.push(time)

        shows << [ time, title, desc ]

#puts show.inspect, ''
#break if time == '09:00'
      end

      shows
    end

    def trim(text)
      text.strip.squeeze(" \r\n")
    end

    def collapse(text)
      text.gsub(/[\r\n]+/m, ' ').squeeze(' ')
    end

    def clean(text)
      text = trim text
#puts text, '---'
      text = text.sub(/GMT\s*/m, ' ')
      text = text.gsub(/\s*on\s+air\s*?/mi, '')
      text = text.gsub(/\s*listen\slive\s*?/mi, '')
      text = text.gsub(/\s*available\snow\s*?/mi, '')

      text = text.sub(/\(BBC.+homepage\)/mi, '')

      text = trim text
#puts text, '---'
      text
    end

=begin
    def present?(time, shows)
      time =~ /^0[0-5]:/ and shows.size > 12
      #(last = shows.last) and last.time > '06:59'
    end
=end
  end
end

if $0 == __FILE__
  require_relative '../bbc'

  puts BBC::Extract.call('radio4')
end
