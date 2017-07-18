# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
books = (1..20).map do |i|
  {title: "Book #{i}", description: "Description #{i}", author: "Author #{i}", price: i + 1.12}
end

shirts = (1..20).map do |i|
  {title: "Shirt #{i}", brand: "Brand #{i}", color: "Color #{i}", size: i.even? ? 'L' : 'XL', price: i + 1.12}
end

Book.create!(books)
Shirt.create!(shirts)