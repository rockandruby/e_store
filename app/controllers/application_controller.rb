require "application_responder"

class ApplicationController < ActionController::Base
  self.responder = ApplicationResponder
  respond_to :json

  protect_from_forgery with: :null_session

  private

  def require_login
    return render json: {status: 401, error: 'Not authorized'} unless authenticate_token
    @current_user = authenticate_token
  end

  def current_user
    authenticate_token
  end

  def authenticate_token
    authenticate_with_http_token do |token, options|
      User.find_by(token: token)
    end
  end

end
