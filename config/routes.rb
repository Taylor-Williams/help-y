Rails.application.routes.draw do
  root 'static#home'
  get 'static/login', as: "login"
  post 'static/logout', as: "logout"
  get 'static/signup', as: "new_user"
  resources :users, except: [:new]
  resources :posts
  get 'users/new' => 'static#signup'
end
