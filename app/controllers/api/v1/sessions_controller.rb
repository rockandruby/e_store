class Api::V1::SessionsController < ApplicationController
  before_action :require_login, except: [:create], raise: false

  def create
    user = User.find_by_email(params[:email])
    if user && user.authenticate(params[:password])
      user.regenerate_token
      render json: {token: user.token}
    else
      render json: {status: 422, error: 'Not valid credentials'}
    end
  end

  def destroy
    @current_user.logout
  end

  def user_info
    render json: {name: @current_user.name, avatar: @current_user.avatar, address: @current_user.address}
  end
end
