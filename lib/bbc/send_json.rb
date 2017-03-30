
require 'net/http'

module BBC
  class SendJson < Struct.new(:url, :json)
    def call
      http = Net::HTTP.new(uri.host, uri.port)

      request = Net::HTTP::Post.new uri.request_uri, 
                                    'Content-Type' => 'application/json'
       
      request.body = json

      response = http.request(request)

      response.body
    end

    def get
      response = Net::HTTP::get_response uri, json

      response.body
    end

    private

    def uri
      @uri ||= URI.parse(url)
    end
  end
end
