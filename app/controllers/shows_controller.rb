
class ShowsController < ApplicationController
  def index
    render json: [ {"station":"radio4","on":"2017-03-21","starts":"19:45","title":"15 Minute Drama — Revelation, Episode 2","desc":"2/10 Shardlake accuses the king's coroner of covering up the murder of Roger Elliard. (R)","finishes":"20:00"},{"station":"radio4","on":"2017-03-21","starts":"20:00","title":"File on 4 — Councils in Crisis","desc":"The local councils turning to commercial investments to balance the books.","finishes":"20:40"},{"station":"radio4","on":"2017-03-21","starts":"20:40","title":"In Touch — 21/03/2017","desc":"News, views and information for people who are blind or partially sighted.","finishes":"21:00"},{"station":"radio4","on":"2017-03-21","starts":"21:00","title":"Inside Health — 21/03/2017","desc":"Dr Mark Porter presents a series that aims to demystify perplexing health issues.","finishes":"21:30"},{"station":"radio4","on":"2017-03-21","starts":"21:30","title":"The Long View — The Long View of Targeted Fake News","desc":"Jonathan Freedland on targeted fake news and the murder myth of a boy in Medieval Norwich. (R)","finishes":"22:00"} ]
  end

  def index
    now = Time.now.strftime '%H:%M'

    shows = Show.on_date.from_time(now)

    render json: shows
  end

  def create
    json =  params[:_json]

    Show.insert json
#byebug
  end
end
