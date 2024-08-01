class BoardGame < ActiveRecord::Base
  has_many :reviews
  has_many :collection_board_games
  has_many :users, through: :reviews
  has_many :collections, through: :collection_board_games

  def average_rating
    return 0 if reviews.empty?

    reviews.average(:rating).to_f
  end
end
