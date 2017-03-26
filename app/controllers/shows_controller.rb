
class ShowsController < ApplicationController
  def index
    shows = QuizShow.new *params.values_at(:station, :date)
    shows = QuizShow.new 'radio4extra', Date.tomorrow
    shows = QuizShow.new %w(radio4 radio4extra), :now

    render json: shows.().to_json
  end

  def info
    render json: QuizShow.()
  end

  def create
    json =  params[:_json]

    shows = Show.insert json
#byebug

    render plain: "#{shows.size} shows"
  end
end
