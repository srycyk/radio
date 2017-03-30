#! /usr/bin/env ruby

$: << './'

require 'bbc.rb'

  station = ARGV.shift || 'radio4'
  date = ARGV.shift

  #shows = BBC::Show.ahead(station)
  shows = BBC::Show.list(station, date)

  #shows = BBC::Show.all(5)
  #shows = BBC::Show.all(7, %w(radio3 radio4))

  shows.sort.each {|show| print show }

