class CreateShirts < ActiveRecord::Migration[5.1]
  def change
    create_table :shirts do |t|
      t.string :title
      t.string :brand
      t.string :color
      t.string :size
      t.decimal :price, precision: 6, scale: 2
      t.timestamps
    end
  end
end
