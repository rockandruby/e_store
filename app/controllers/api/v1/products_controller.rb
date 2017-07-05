class Api::V1::ProductsController < ApplicationController

  def index
    respond_with Product.all
  end

end
