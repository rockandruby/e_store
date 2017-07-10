class Api::V1::UsersController < ApplicationController
  def create
    user = User.create!(user_params)
    render json: { email: user.email,  name: user.name, token: user.token}
  end

  def fb_create
    if params[:token]
      response = HTTParty.get("https://graph.facebook.com/me?fields=email,name&access_token=#{params[:token]}")
      data = JSON.parse response.body
      return render json: {status: 422, error: 'Invalid token'} unless data['id']
      user = User.find_or_create_by!(fb_uid: data['id']) do |u|
        u.skip_email =  true
        u.name = data['name']
        u.email = data['email']
        u.password = rand(1000..100000).to_s
      end
      user.regenerate_token if user.persisted?
      render json: { email: user.email,  name: user.name, token: user.token}
    else
      render json: {status: 422, error: 'Token not provided'}
    end
  end

  private

  def user_params
    params.require(:user).permit(%i(name email password fb_uid))
  end
end
