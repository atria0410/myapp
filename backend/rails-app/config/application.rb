require_relative 'boot'

require 'rails/all'

Bundler.require(*Rails.groups)

module RailsApp
  class Application < Rails::Application
    config.load_defaults 7.0

    config.api_only = true

    config.middleware.use ActionDispatch::Cookies
    config.middleware.use ActionDispatch::Session::CookieStore
    config.middleware.use ActionDispatch::ContentSecurityPolicy::Middleware

    config.i18n.default_locale = :ja

    config.time_zone = 'Tokyo'
    config.active_record.default_timezone = :local

    config.action_mailer.raise_delivery_errors = true
    config.action_mailer.delivery_method = :smtp
    config.action_mailer.smtp_settings = {
      port: ENV['EMAIL_PORT'],
      address: ENV['EMAIL_ADDRESS'],
      domain: ENV['EMAIL_DOMAIN'],
      user_name: ENV['EMAIL_USER'],
      password: ENV['EMAIL_PASSWORD'],
      authentication: ENV['EMAIL_AUTH'],
      enable_starttls_auto: true
    }
  end
end
