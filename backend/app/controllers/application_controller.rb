class ApplicationController < Sinatra::Base
  set :default_content_type, "application/json"

  get "/board_games" do
    board_games = BoardGame.all
    board_games.to_json
  end

  get "/board_games/" do
    board_games = BoardGame.all
    board_games.to_json
  end

  get "/board_games/:id" do
    board_game = BoardGame.find(params[:id])
    rating_average = board_game.average_rating
    board_game_json = board_game.as_json(include: { reviews: { include: :user } })
    board_game_json[:average_rating] = rating_average

    board_game_json.to_json
  end

  get "/board_games/:id/reviews" do
    board_game_reviews = BoardGame.find(params[:id]).reviews
    board_game_reviews.to_json
  end

  post "/login" do
    user = User.authenticate(params[:username], params[:password])

    if user
      { success: true, message: "Login successful", user: user.id }.to_json
    else
      status 401
      { success: false, message: "Invalid username or password" }.to_json
    end
  end

  get "/users/:id" do
    user = User.find(params[:id])
    board_games = Collection.user_collection(params[:id])
    { user: user, collection: board_games }.to_json
  end

  post "/users" do
    user = User.create(
      username: params[:username],
      password: params[:password]
    )
    user.to_json
  end

  post "/collections" do
    collection = Collection.create(
      user_id: params[:user_id]
    )
    { collection_id: collection.id, board_games: collection.board_games }.to_json
  end

  post "/collections/:id" do
    CollectionBoardGame.create(
      board_game_id: params[:board_game_id],
      collection_id: params[:collection_id]
    )
    collection = Collection.find(params[:collection_id])
    { collection_id: collection.id, board_games: collection.board_games }.to_json
  end
end
