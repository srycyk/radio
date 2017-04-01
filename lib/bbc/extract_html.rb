
require 'time'
require 'nokogiri'

module BBC
  class ExtractHtml < Nokogiri::XML::SAX::Document
    attr_accessor :html, :shows

    def initialize(html)
      self.html = html
    end

    def call
      reader = ShowPageSAXParser.new

      parser = Nokogiri::HTML::SAX::Parser.new(reader)

      parser.parse(html)

      self.shows = reader.show_list
    end
  end

  class ShowPageSAXParser < Nokogiri::XML::SAX::Document
    attr_accessor :show_list

    def initialize
      @current_date = nil

      self.show_list = []
    end

    def start_element(name, attributes=[])
      atts = as_hash attributes
#puts "#{name} #{atts.inspect}"

      if name == 'h3' and atts['property'] == 'startDate'
        @starts = atts['content']

        @ends = nil
      end

      if name == 'meta' and atts['property'] == 'endDate'
        @ends = atts['content'] unless @ends

        @title = ''
      end

      if name == 'div' and atts['typeof'] == 'RadioEpisode'
        @info_url = atts['resource']
      end

      if name == 'span' and atts['property'] == 'name'
        @in_name = true
      end

      if name == 'span' and atts['property'] == 'description'
        @in_desc = true
      end
    end

    def characters(content)
      if @in_name
        @title << ' - ' unless @title.empty?
        @title << content
        @in_name = false
      elsif @in_desc
        @desc = content
      end
    end

    def end_element(name)
      if name == 'span' and @in_desc
        @in_desc = false

        return if date_changed?(@starts)

        start_hhmm = hhmm @starts

        end_hhmm = hhmm @ends

        self.show_list << [ start_hhmm, @title, @desc, end_hhmm, @info_url ]

#puts "#{@starts} to #{@ends} #@title <#@desc>"
      end
    end

    def end_document
    end

    def as_hash(array)
      #array.reduce({}) {|hash, (key, value)| hash[key.to_sym] = value ; hash }
      Hash[array]
    end

    def date_changed?(time_string)
      @current_date = parse_time(time_string).to_date unless @current_date

      date = parse_time(time_string).to_date

      date != @current_date
    end

    def parse_time(time_string)
      DateTime.parse time_string
    end

    def hhmm(date_time)
      date_time = parse_time(date_time) if String === date_time

      date_time.strftime '%H:%M'
    end
  end
end


  if $0 == __FILE__
    parser = BBC::ExtractHtml.new IO.read 'in/radio4extra/2017-03-28.html'
    parser = BBC::ExtractHtml.new IO.read '2017-03-28.html'

    parser.call

    puts
    parser.shows.each {|show| puts show.inspect }
  end
