require 'rails_helper'

RSpec.describe Api::V1::ProductsController, type: :controller do

  subject{create(:book)}

  it "should return products" do
    subject
    get :index, format: :json
    expect(JSON.parse(response.body).count).to eq 1
  end

  it "should return product" do
    post :show, params: {id: subject.id}, format: :json
    expect(JSON.parse(response.body)['item']['title']).to eq(subject.title)
  end
end
