Rails.application.routes.draw do
  get 'static/login'
  get 'static/logout'
  get 'static/signup'
  resources :users
  resources :posts
end
