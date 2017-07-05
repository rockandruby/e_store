class Api::V1::ProductsController < ApplicationController

  before_action :require_login, only: :index

  def index
    respond_with Product.all
  end

end
