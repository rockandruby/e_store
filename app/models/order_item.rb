class OrderItem < ApplicationRecord
  belongs_to :order

  validates :qty, :item_info, :details, presence: true
end
