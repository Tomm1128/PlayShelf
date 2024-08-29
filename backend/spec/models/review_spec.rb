require 'spec_helper'

RSpec.describe Review, type: :model do
  describe 'associations' do
    it 'has belongs to board_game' do
      association = Review.reflect_on_association(:board_game)
      expect(association.macro).to eq(:belongs_to)
    end

    it 'has belongs to user' do
      association = Review.reflect_on_association(:user)
      expect(association.macro).to eq(:belongs_to)
    end
  end
end
