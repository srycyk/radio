
require 'bbc'

class FetchShow < Struct.new(:station, :date)
  attr_accessor :quiz_show

  def initialize(*)
    super

    self.date = Date.today if date.blank? or date == 'today'

    self.quiz_show = QuizShow.new(station, date)
  end

  def call
    shows = get

    if shows.empty?
      insert

      get
    else
      shows
    end
  end

  def get
    quiz_show.()
  end

  def insert
    Show.insert BBC::Show.atts(station, date)
  end

  private
end

