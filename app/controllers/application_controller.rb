
class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session #:exception

  def index
    render inline: "", layout: true
    #render inline: "#{QuizShow.()}", layout: true
  end
end
