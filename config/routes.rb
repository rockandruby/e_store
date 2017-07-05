Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :products
      resource :sessions, only: :create
      delete '/logout' => 'sessions#logout'
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
