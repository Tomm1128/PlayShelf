class Collection < ActiveRecord::Base
  belongs_to :user
  has_many :collection_board_games
  has_many :board_games, through: :collection_board_games

  def self.user_collection(id)
    collection = Collection.find_by(user_id: id)
    if collection
      { collection_id: collection.id, board_games: collection.board_games }
    else
      "No collection for user"
    end
  end
end
