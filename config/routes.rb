Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :products
      resources :users, only: [:edit, :create]
      post '/users/fb' => 'users#fb_create'
      post '/users/upload' => 'users#upload'
      resource :sessions, only: [:create, :destroy] do
        get '/current_user' => 'sessions#user_info'
      end
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
