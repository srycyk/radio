
Rails.application.routes.draw do
  match 'shows/index', via: %i(get post)
  match 'shows/station_info', via: %i(get post)
  post 'shows/create'

  #resources :shows, only: %i(index show create)

  root to: 'application#index'
end
