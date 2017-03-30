
#require 'bbc/address'

module BBC
  class Fetch < Struct.new(:station, :date)
    include FormatDate

    def call
      write unless exists? path

      read
    end

    def read
      IO.read path
    end

    def rm
      File.unlink path
    end

    def to_s
      "#{call}\n"
    end

    private

    def url
      Address.new(station, date).()
    end

    def exists?(path)
      File.file?(path) and File.size(path) > 10
    end

    def path
      File.join(mkdir, "#{convert_date date}.#{ext}")
    end

    def mkdir(dirs=save_dirs, dir='')
      if subdir = dirs.shift
        dir = dir.empty? ? subdir : File.join(dir, subdir)

        Dir.mkdir dir unless File.directory? dir

        mkdir dirs, dir
      else
        dir
      end
    end

    def save_dirs
      [ "tmp", "in", station ]
    end

    def ext
      'tmp'
    end
  end
end

if $0 == __FILE__
  require_relative '../bbc'

  puts BBC::Fetch.new('radio4')
end
