Rails.application.routes.draw do
  root 'static#home'
  get 'signup' => 'static#signup', as: "new_user"
  post 'login' => 'sessions#login', as: "login"
  post 'logout' => 'sessions#logout', as: "logout"
  get 'auth/github/callback' => 'sessions#create'
  resources :users, except: [:new, :edit, :index]
  get 'users/new' => 'static#signup'
  resources :posts, except: [:edit] do
    resources :comments, only: [:create, :update, :destroy]
    resources :appointments, only: [:new, :create, :show, :update, :destroy]
  end
  resources :appointments, only: [] do
    resources :volunteers, only: [:create, :update, :destroy]
  end
end
