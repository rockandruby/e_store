class Shirt < ApplicationRecord
  include ProductConcern

  validates :title, :price, :brand, :color, :size, presence: true
  has_one :product, as: :productable
end
