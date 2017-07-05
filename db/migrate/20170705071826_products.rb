class Products < ActiveRecord::Migration[5.1]
  def change
    create_table :products do |t|
      t.string :title
      t.decimal :price, precision: 6, scale: 2
      t.timestamps
    end

    price = 0
    products = (1..1000).map{|i| {title: "Book #{i}", price: price += 1} }
    Product.create(products)
  end
end
