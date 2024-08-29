require 'spec_helper'

RSpec.describe Collection, type: :model do
  describe 'associations' do
    it 'has belongs to' do
      association = Collection.reflect_on_association(:user)
      expect(association.macro).to eq(:belongs_to)
    end

    it 'has many collection_board_games' do
      association = Collection.reflect_on_association(:collection_board_games)
      expect(association.macro).to eq(:has_many)
    end

    it 'has many board_games' do
      association = Collection.reflect_on_association(:board_games)
      expect(association.options[:through]).to eq(:collection_board_games)
    end
  end

  describe '.user_collection' do
    let(:user) { User.create(username: "John Doe", password: "password123") }
    let(:collection) { Collection.create(user_id: user.id) }
    let!(:board_game1) { BoardGame.create(name: "Catan") }
    let!(:board_game2) { BoardGame.create(name: "Monopoly") }

    before do
      CollectionBoardGame.create(collection: collection, board_game: board_game1)
      CollectionBoardGame.create(collection: collection, board_game: board_game2)
    end

    context 'when a collection exists for the user' do
      it 'returns the collection id and board games' do
        result = Collection.user_collection(user.id)

        expect(result[:collection_id]).to eq(collection.id)
        expect(result[:board_games]).to include(board_game1, board_game2)
      end
    end

    context 'when no collection exists for the user' do
      it 'returns "No collection for user"' do
        result = Collection.user_collection(-1)

        expect(result).to eq("No collection for user")
      end
    end
  end
end
