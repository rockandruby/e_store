class Api::V1::OrdersController < ApplicationController
  before_action :require_login

  def index
    respond_with @current_user.orders
  end

  def show
    order = @current_user.orders.find_by_id(params[:id])
    respond_with order
  end
end
