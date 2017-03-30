
class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session #:exception

  def index
    info = QuizShow.()

    render inline: "#{info['dates']}", layout: true
  end
end
