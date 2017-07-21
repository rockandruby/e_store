class Api::V1::OrdersController < ApplicationController
  before_action :require_login

  def index
    respond_with @current_user.orders
  end

  def show
    order = @current_user.orders.find_by_id(params[:id])
    render json:  {order: order, items: order.order_items}
  end

  def create
    total = 0
    items_hash = {}
    product_ids = params[:cart].map{|i| i[:id]}
    products = Product.where(id: product_ids).includes(:productable)
    products.each do |i|
      items_hash["#{i.id}"] = i.productable
    end
    items = params[:cart].map do |i|
      total += (items_hash["#{i[:id]}"].price * i[:qty].to_i).round(2)
      {product_id: i[:id], qty: i[:qty], details: i[:details].to_json, item_info: items_hash["#{i[:id]}"].to_json}
    end
    order = @current_user.orders.build(address: params[:address], amount: total)
    order.order_items.build(items)
    if order.save
      render json: {}
    else
      render json: {status: 422, error: user.errors.full_messages}
    end
  end
end
