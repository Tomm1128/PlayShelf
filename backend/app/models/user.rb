class User < ActiveRecord::Base
  has_many :reviews

  def self.authenticate(username, password)
    user = find_by(username: username)
    user if user && user.password == password
  end
end
