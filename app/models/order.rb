class Order < ApplicationRecord
  belongs_to :user
  has_many :order_items

  validates :amount, presence: true
end
