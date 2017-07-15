Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :order_items
      resources :orders
      resources :products
      resources :users, only: [:update, :create]
      post '/users/fb' => 'users#fb_create'
      post '/users/upload' => 'users#upload'
      resource :sessions, only: [:create, :destroy] do
        get '/current_user' => 'sessions#user_info'
      end
    end
  end
end
