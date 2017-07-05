class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :name
      t.string :token, index: true
      t.string :email, unique: true
      t.string :password_digest

      t.timestamps
    end

    User.create(name: 'bugs', email: 'bugs@rubyplus.com', password: '123456')
    User.create(name: 'daffy', email: 'daffy@rubyplus.com', password: '12345')
  end
end
