Rails.application.routes.draw do
  root 'static#home'
  post 'login' => 'static#login', as: "login"
  post 'logout' => 'static#logout', as: "logout"
  get 'signup' => 'static#signup', as: "new_user"
  get 'auth/github/callback', to: 'sessions#create'
  resources :users, except: [:new, :edit, :index]
  resources :posts, except: [:edit] do
    resources :comments, except: [:index, :new, :edit]
  end
  get 'users/new' => 'static#signup'
end
