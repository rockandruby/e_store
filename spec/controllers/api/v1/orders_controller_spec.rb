require 'rails_helper'

RSpec.describe Api::V1::OrdersController, type: :controller do
  subject{create(:user)}

  before(:each) do
    request.env['HTTP_AUTHORIZATION'] = "Token token=#{subject.token}"
  end

  it "should list user's orders" do
    get :index, format: :json
    expect(JSON.parse(response.body).size).to eq(subject.orders.size)
  end

  it "should show order details" do
    get :show, params: {id: subject.orders.take.id}
    expect(JSON.parse(response.body)['items'].size).to eq(subject.orders.take.order_items.size)
  end

  it "should create order" do
    create(:book)
    post :create, params: {address: 'Address', amount: 1000, cart: [{id: Product.take.id, qty: 2}]}
    expect(JSON.parse(response.body)).to eq({})
  end
end
