Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      # セッション
      get  'set_csrf_token',            to: 'sessions#set_csrf_token'
      post 'sign_in',                   to: 'sessions#sign_in'
      post 'log_in',                    to: 'sessions#log_in'
      post 'log_out',                   to: 'sessions#log_out'
      get  'send_password_reset_email', to: 'sessions#send_password_reset_email'
      post 'password_reset',            to: 'sessions#password_reset'
      get  'get_current_user',          to: 'sessions#current_user'

      # ユーザー
      resources :users do
        collection do
          post :validates
          get  :csv_export
          post :csv_import
        end
      end
    end
  end
end
