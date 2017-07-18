class CreateBooks < ActiveRecord::Migration[5.1]
  def change
    create_table :books do |t|
      t.string :title
      t.string :description
      t.string :author
      t.decimal :price, precision: 6, scale: 2
      t.timestamps
    end
  end
end
