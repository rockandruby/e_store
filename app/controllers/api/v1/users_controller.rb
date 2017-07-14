class Api::V1::UsersController < ApplicationController
  before_action :require_login, only: [:upload]

  def create
    user = User.create(user_params)
    if user.errors
      render json: {status: 422, error: user.errors.full_messages}
    else
      render json: { email: user.email,  name: user.name, token: user.token}
    end
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
      render json: { email: user.email,  name: user.name, avatar: user.avatar, token: user.token}
    else
      render json: {status: 422, error: 'Token not provided'}
    end
  end

  def upload
    s3 = Aws::S3::Client.new
    bucket = 'igor-pog-bucket'
    key = 'i_' + rand(10000000..999999999).to_s + ".#{params[:type].split('/').last}"
    body = Base64.strict_decode64(params[:file].split(',').last)
    s3.put_object(
      acl: 'public-read',
      bucket: bucket,
      key: key,
      body: body,
      content_type: params[:type]
    )
    s3.delete_object(bucket: bucket, key: @current_user.avatar.split('/').last) if @current_user.avatar
    avatar = Aws::S3::Object.new(bucket, key).public_url
    @current_user.update!(avatar: avatar)
    render json: {avatar: avatar}
  end

  private

  def user_params
    params.require(:user).permit(%i(name email password fb_uid))
  end
end
