User.destroy_all
BoardGame.destroy_all
Review.destroy_all
Collection.destroy_all
CollectionBoardGame.destroy_all

puts "🌱 Seeding spices..."

puts "Creating users..."
user1 = User.create(username: "AliceInWonderland33", password: "test1")
user2 = User.create(username: "BobsBurgers", password: "test2")
user3 = User.create(username: "CharliesAngels1", password: "test3")
user4 = User.create(username: "DianaWW", password: "test4")

user5 = User.create(username: "EdwardScissorhands", password: "test5")
user6 = User.create(username: "FrodoBaggins", password: "test6")
user7 = User.create(username: "GandalfTheGrey", password: "test7")
user8 = User.create(username: "HarryPotter", password: "test8")

puts "Creating board games..."
game1 = BoardGame.create(name: "Catan", image: "https://cdn.openart.ai/uploads/image_GSPA1RvZ_1722263694326_raw.jpg",
                         description: "A strategy game about building settlements.")
game2 = BoardGame.create(name: "Ticket to Ride", image: "https://cdn.openart.ai/uploads/image_Twr0mAsq_1722263736380_raw.jpg",
                         description: "A game about building train routes.")
game3 = BoardGame.create(name: "Carcassonne", image: "https://cdn.openart.ai/uploads/image_-TyzzXNj_1722263781459_raw.jpg",
                         description: "A tile-placement game where you build a medieval landscape.")
game4 = BoardGame.create(name: "Pandemic", image: "https://cdn.openart.ai/uploads/image_11iZw04q_1722263917722_raw.jpg",
                         description: "A cooperative game about curing diseases.")

game5 = BoardGame.create(name: "Terraforming Mars", image: "https://cdn.openart.ai/uploads/image_i4tkZ5JO_1722538453210_raw.jpg",
                         description: "A game about colonizing Mars.")
game6 = BoardGame.create(name: "Gloomhaven", image: "https://cdn.openart.ai/uploads/image_uqoZvJ5G_1722538463770_raw.jpg",
                         description: "A cooperative game of tactical combat.")
game7 = BoardGame.create(name: "Azul", image: "https://cdn.openart.ai/uploads/image_P4Ffojj__1722538542578_raw.jpg",
                         description: "A tile-placement game of decorative art.")
game8 = BoardGame.create(name: "Wingspan", image: "https://cdn.openart.ai/uploads/image_-vTBPbdQ_1722538603051_raw.jpg",
                         description: "A game about bird-collecting in nature reserves.")

puts "Creating reviews..."
Review.create(user: user1, board_game: game1, title: "Great game!",
              body: "I really enjoyed playing Catan. Highly recommend it!", rating: 5)
Review.create(user: user2, board_game: game2, title: "Fun and engaging",
              body: "Ticket to Ride is a fantastic game with a lot of replay value.", rating: 4)
Review.create(user: user3, board_game: game3, title: "Interesting mechanics",
              body: "Carcassonne offers a unique gameplay experience.", rating: 4)
Review.create(user: user4, board_game: game4, title: "Thrilling cooperative play",
              body: "Pandemic is a challenging game that requires teamwork.", rating: 5)

Review.create(user: user5, board_game: game5, title: "Amazing!",
              body: "Terraforming Mars is a deep and strategic game.", rating: 5)
Review.create(user: user6, board_game: game6, title: "Great cooperative game",
              body: "Gloomhaven offers a rich and immersive experience.", rating: 5)
Review.create(user: user7, board_game: game7, title: "Beautiful and fun",
              body: "Azul is a visually stunning and enjoyable game.", rating: 4)
Review.create(user: user8, board_game: game8, title: "Love it",
              body: "Wingspan is a delightful game with beautiful art.", rating: 5)

puts "Creating collections..."
collection1 = Collection.create(user: user1)
collection2 = Collection.create(user: user2)
collection3 = Collection.create(user: user3)
collection4 = Collection.create(user: user4)

collection5 = Collection.create(user: user5)
collection6 = Collection.create(user: user6)
collection7 = Collection.create(user: user7)
collection8 = Collection.create(user: user8)

puts "Creating collection board games..."
CollectionBoardGame.create(board_game: game1, collection: collection1)
CollectionBoardGame.create(board_game: game2, collection: collection1)
CollectionBoardGame.create(board_game: game3, collection: collection2)
CollectionBoardGame.create(board_game: game4, collection: collection2)
CollectionBoardGame.create(board_game: game1, collection: collection3)
CollectionBoardGame.create(board_game: game4, collection: collection3)
CollectionBoardGame.create(board_game: game2, collection: collection4)
CollectionBoardGame.create(board_game: game3, collection: collection4)

CollectionBoardGame.create(board_game: game5, collection: collection5)
CollectionBoardGame.create(board_game: game6, collection: collection5)
CollectionBoardGame.create(board_game: game7, collection: collection6)
CollectionBoardGame.create(board_game: game8, collection: collection6)
CollectionBoardGame.create(board_game: game5, collection: collection7)
CollectionBoardGame.create(board_game: game8, collection: collection7)
CollectionBoardGame.create(board_game: game6, collection: collection8)
CollectionBoardGame.create(board_game: game7, collection: collection8)

puts "✅ Done seeding!"
