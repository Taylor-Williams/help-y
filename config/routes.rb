Rails.application.routes.draw do
  root 'static#home'
  post 'login' => 'static#login', as: "login"
  post 'logout' => 'static#logout', as: "logout"
  get 'signup' => 'static#signup', as: "new_user"
  get 'auth/github/callback' => 'sessions#create'
  resources :users, except: [:new, :edit, :index]
  get 'users/new' => 'static#signup'
  resources :posts, except: [:edit] do
    resources :comments, only: [:create, :update, :destroy]
    resources :appointments, only: [:create, :update, :destroy]
  end

  match 'volunteers/:appointment_id/:user_id', to: 'volunteers#manage', via: [:post, :delete], as: 'volunteers'
end
