require 'spec_helper'

RSpec.describe BoardGame, type: :model do
  describe 'associations' do
    it 'has many reviews' do
      association = BoardGame.reflect_on_association(:reviews)
      expect(association.macro).to eq(:has_many)
    end

    it 'has many collection_board_games' do
      association = BoardGame.reflect_on_association(:collection_board_games)
      expect(association.macro).to eq(:has_many)
    end

    it 'has many users through reviews' do
      association = BoardGame.reflect_on_association(:users)
      expect(association.macro).to eq(:has_many)
      expect(association.options[:through]).to eq(:reviews)
    end

    it 'has many collections through collection_board_games' do
      association = BoardGame.reflect_on_association(:collections)
      expect(association.macro).to eq(:has_many)
      expect(association.options[:through]).to eq(:collection_board_games)
    end
  end

  describe '#average_rating' do
    let(:board_game) do
      BoardGame.create(
      name: "Catan",
      image: "Link",
      description: "It's Catan."
      )
    end

    context 'when there are no reviews' do
      it 'returns 0' do
        expect(board_game.average_rating).to eq(0)
      end
    end

    context 'when there are reviews' do
      before do
        Review.create(board_game: board_game, rating: 4)
        Review.create(board_game: board_game, rating: 5)
      end

      it 'returns the average rating' do
        expect(board_game.average_rating).to eq(4.5)
      end
    end
  end
end
