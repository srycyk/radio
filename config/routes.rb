
Rails.application.routes.draw do
  get 'shows/index'
  post 'shows/create'

  root to: 'application#index'
end
