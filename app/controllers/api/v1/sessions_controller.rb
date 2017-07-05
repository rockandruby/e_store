class Api::V1::SessionsController < ApplicationController
  before_action :require_login, only: [:logout], raise: false

  def create
    user = User.find_by_email(params[:email])
    if user && user.authenticate(params[:password])
      user.regenerate_token
      render json: {token: user.token}
    else
      head 401
    end
  end

  def logout
    current_user.logout
  end
end
