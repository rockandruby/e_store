require 'active_support/concern'

module ProductConcern
  extend ActiveSupport::Concern

  included do
    after_create :create_product
  end

  def create_product
    self.create_product!(productable_type: self.class, productable_id: self.id)
  end
end