class User < ApplicationRecord
  has_secure_password
  has_secure_token

  def logout
    update(token: nil)
  end

end
