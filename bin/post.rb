#! /usr/bin/env ruby

$: << './'

require 'net/http'
require 'json'

require 'bbc'
require 'bbc/send_json'

  host = ENV['SHOW_HOST'] || "localhost:3000"
  url = "http://%s/shows/create" % host

  date = ARGV.shift || Date.today.to_s

  stations = ARGV.any? ? ARGV : BBC::STATIONS 

  stations.each do |station|
    json = BBC::Show.json(station, date)

#puts json.inspect

    data = BBC::SendJson.new(url, json).()

    puts data
  end

  puts "#{date} #{stations * ', '}"

