
class ShowsController < ApplicationController
  #before_action { logger.warn(params.inspect)

  def index
    shows = QuizShow.new *params.values_at(:station, :date)

    render json: shows.().to_json
  end

  def info
    render json: QuizShow.by_station.to_a
  end

  def create
    json =  params[:_json]

    shows = Show.insert json
#byebug

    render plain: "#{shows.size} shows"
  end
end
