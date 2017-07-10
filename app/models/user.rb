class User < ApplicationRecord
  has_secure_password
  has_secure_token

  attr_accessor :skip_email

  validates :name, presence: true
  validates :email, presence: true, unless: :skip_email
  validates :email, uniqueness: true, unless: :skip_email
  validates :fb_uid, uniqueness: true, allow_blank: true

  def logout
    update(token: nil)
  end

end
