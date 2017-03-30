
#require 'bbc/fetch'
#require 'bbc/address'

module BBC
  class FetchLynx < Fetch
    COMMAND_TEMPLATE = "lynx -dump -nolist %s > %s"

    def write
      system command
    end

    def to_s
     super + "#{command}\n"
    end

    private

    def command
      COMMAND_TEMPLATE % [ url, path ]
    end

    def ext
      'txt'
    end
  end
end

if $0 == __FILE__
  #require_relative '../bbc'

  puts BBC::FetchLynx.new('5live', '2017-03-31')
end
