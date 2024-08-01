class Collection < ActiveRecord::Base
  belongs_to :user
  has_many :collection_board_games
  has_many :board_games, through: :collection_board_games

  def self.user_collection(id)
    collection = Collection.find_by(user_id: id)
    if(collection)
      collection.board_games
    else
      "No board games"
    end
  end
end
