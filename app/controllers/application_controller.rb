require "application_responder"

class ApplicationController < ActionController::Base
  self.responder = ApplicationResponder
  respond_to :json

  protect_from_forgery with: :null_session

  def require_login
    return head 401 unless authenticate_token
    authenticate_token
  end

  def current_user
    @current_user ||= authenticate_token
  end

  private

  def authenticate_token
    authenticate_with_http_token do |token, options|
      User.find_by(token: token)
    end
  end
end
