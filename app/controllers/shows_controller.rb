
class ShowsController < ApplicationController
  def index
    station, date = params.values_at(:station, :date)

    shows = FetchShow.new(station, date).()

    render json: shows.to_json
  end

  def station_info
    render json: Show::STATION_NAMES.to_a
  end

  def create
    json =  params[:_json]

    shows = Show.insert json

    render plain: "#{shows.size} shows"
  end

  private

  def xinfo
    render json: QuizShow.by_station.to_a
  end
end

