require 'rails_helper'

RSpec.describe Api::V1::SessionsController, type: :controller do
  subject{create(:user)}

  context 'Non authed API' do
    it "should login user" do
      post :create, params: {email: subject.email, password: subject.password}
      result = JSON.parse(response.body)
      expect(result.include?('token')).to eq true
    end

    it "should not login user" do
      post :create, params: {email: 'foo@foo.com', password: subject.password}
      expect(JSON.parse(response.body)['status']).to eq 422
    end
  end

  context 'Authed API' do
    it "should destroy session" do
      request.env['HTTP_AUTHORIZATION'] = "Token token=#{subject.token}"
      delete :destroy
      expect(response.code).to eq '204'
      subject.reload
      expect(subject.token).to eq nil
    end

    it "should not destroy session" do
      request.env['HTTP_AUTHORIZATION'] = "Token token=123"
      delete :destroy
      subject.reload
      expect(subject.token).not_to eq nil
    end

    it "should get user info" do
      request.env['HTTP_AUTHORIZATION'] = "Token token=#{subject.token}"
      get :user_info
      expect(JSON.parse(response.body)['name']).to eq('Test')
    end

    it "should not get user info" do
      request.env['HTTP_AUTHORIZATION'] = "Token token=123"
      get :user_info
      expect(JSON.parse(response.body)['status']).to eq 401
    end
  end
end
