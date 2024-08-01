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
    board_game.to_json(include: { reviews: { include: :user } })
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
    { user: user, board_games: board_games }.to_json
  end

  post "/users" do
    user = User.create(
      username: params[:username],
      password: params[:password]
    )
    user.to_json
  end
end
