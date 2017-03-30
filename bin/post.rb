#! /usr/bin/env ruby

$: << './'

require 'net/http'
require 'json'

require 'bbc'
require 'bbc/send_json'

  URL = ENV['SHOW_URL'] || "http://localhost:3000/shows/create"

  date = ARGV.shift || Date.today.to_s

  stations = ARGV.any? ? ARGV : BBC::STATIONS 

  stations.each do |station|
    json = BBC::Show.json(station, date)

#puts json.inspect

    data = BBC::SendJson.new(URL, json).()

    puts data
  end

  puts "#{date} #{stations * ', '}"

