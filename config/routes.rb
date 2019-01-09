Rails.application.routes.draw do
  root 'static#home'
  get 'static/login'
  get 'static/logout'
  get 'static/signup'
  resources :users
  resources :posts
end
