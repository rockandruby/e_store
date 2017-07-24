require 'rails_helper'

RSpec.describe Api::V1::UsersController, type: :controller do
  context 'Non authed API' do
    it 'should respond with error', skip_before: true do
      post :create, params: {user: {email: 'foo@foo.com', name: 'Tester'}}
      expect(JSON.parse(response.body)['status']).to eq(422)
    end

    it "responds with token and user entity" do
      post :create, params: {user: {email: 'foo@foo.com', name: 'Tester', password: 123}}
      result = JSON.parse(response.body)
      expect(result['name']).to eq('Tester')
      expect(result.include?('token')).to be true
    end
  end

  context 'Authed API' do
    subject {create(:user)}


    it 'should not update user' do
      patch :update, params: {id: 0, user: {name: 'Foo'}}
      result = JSON.parse(response.body)
      expect(result['status']).to eq(401)
    end

    it 'should update user' do
      request.env['HTTP_AUTHORIZATION'] = "Token token=#{subject.token}"
      patch :update, params: {id: 0, user: {name: 'Foo'}}
      expect(JSON.parse(response.body)['name']).to eq('Foo')
    end

  end
end
