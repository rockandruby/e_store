class Products < ActiveRecord::Migration[5.1]
  def change
    create_table :products do |t|
      t.belongs_to :productable, index: true
      t.string :productable_type, index: true
      t.timestamps
    end
  end
end
