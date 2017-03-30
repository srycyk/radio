
class ShowsController < ApplicationController
  def index
    station, date = params.values_at(:station, :date)

    shows = FetchShow.new(station, date).()

    render json: shows.to_json
  end

  def info
    render json: QuizShow.by_station.to_a
  end

  def create
    json =  params[:_json]

    shows = Show.insert json

    render plain: "#{shows.size} shows"
  end

  private

end

