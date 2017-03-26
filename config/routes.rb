
Rails.application.routes.draw do
  get 'shows/index'
  get 'shows/info'
  post 'shows/create'

  #resources :shows, only: %i(index show create)

  root to: 'application#index'
end
