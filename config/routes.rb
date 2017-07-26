Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :orders, only: [:index, :show, :create]
      resources :products, only: [:index, :show]
      resources :users, only: [:update, :create]
      post '/users/fb' => 'users#fb_create'
      post '/users/upload' => 'users#upload'
      resource :sessions, only: [:create, :destroy] do
        get '/current_user' => 'sessions#user_info'
      end
    end
  end

  get '*path', to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
