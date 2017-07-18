class Book < ApplicationRecord
  include ProductConcern

  validates :title, :description, :author, :price, presence: true

  has_one :product, as: :productable
end
