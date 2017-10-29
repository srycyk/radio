
require 'net/http'

#require 'bbc/fetch'
#require 'bbc/address'

module BBC
  class FetchHtml < Fetch
    def write
      File.open(path, 'w:ASCII-8BIT') {|stream| stream.write get }
    end

    def get
      response = Net::HTTP::get_response(URI.parse url)
      if response.code == "301"
        response = Net::HTTP.get_response(URI.parse(response.header['location']))
      end
      response.body
    end

    def to_s
     super + "#{url}\n"
    end

    def ext
      'html'
    end
  end
end

if $0 == __FILE__
  puts BBC::FetchHtml.new('5live', '2017-10-25')
end

