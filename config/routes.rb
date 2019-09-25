Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  namespace :api do
    resources :people, only: [:index, :update]
    get 'my_peeps', to: 'peeps#my_peeps'
  end
end
