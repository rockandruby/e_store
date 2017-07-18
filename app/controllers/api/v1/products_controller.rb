class Api::V1::ProductsController < ApplicationController

  def index
    products = Product.includes(:productable).map{|p| {id: p.id, item: p.productable}  }
    respond_with products
  end

  def show
    product = Product.find_by_id(params[:id])
    return respond_with product: product, item: product.productable if product
    respond_with product
  end

end
