class Order < ApplicationRecord
  belongs_to :user
  has_many :order_items

  validates :amount, :address, presence: true
end
