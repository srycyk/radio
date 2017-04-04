
require 'net/http'

#require 'bbc/fetch'
#require 'bbc/address'

module BBC
  class FetchHtmlNoSave < FetchHtml
    def exists?(*)
      false
    end

    def read
      get
    end

    def write; end # Just in case!
  end
end

if $0 == __FILE__
  require_relative '../bbc'

  puts BBC::FetchHtmlNoSave.new('radio4')
end
