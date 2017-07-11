class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :name
      t.string :token, index: true
      t.string :email, unique: true
      t.string :fb_uid, unique: true
      t.string :password_digest
      t.string :avatar
      t.timestamps
    end
  end
end
