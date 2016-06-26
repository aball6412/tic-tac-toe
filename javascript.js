$(document).ready(function() {
    
    
    
            //Initialize variables
        var user;
        var computer;
        var gamelist = ["holder", "", "", "", "", "", "", "", "", ""];
        var game = "play"; //game = stop when gameover

        //Create the game board for use after we pick our piece
        function gameboard () {
          $(".gameboard").html(
          "<div class='col-md-4 box1'>" +
              "</div>" +
              "<div class='col-md-4 box2'>" +
              "</div>" +
              "<div class='col-md-4 box3'>" +
              "</div>" +
              "<div class='col-md-4 box4'>" +
             " </div>" +
              "<div class='col-md-4 box5'>" +
             "</div>" +
              "<div class='col-md-4 box6'>" +
              "</div>" +
              "<div class='col-md-4 box7'>" +
              "</div>" +
              "<div class='col-md-4 box8'>" +
              "</div>" +
              "<div class='col-md-4 box9'>" +
              "</div>"
          ); 
        } //End of gameboard function


        //Create the computer AI (random for now)
        function ai(computer, user) {

            function winning_move(check, computer) {
              //Map all possible winning combinations
              var winningmoves = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
              var count = 0;

              //Loop through each possible winner and see if there are two out of three
              //Which would mean that we need to move in the third space if available to block or win
              for (var i in winningmoves) {
                  for (var j in winningmoves[i]) {
                    if (gamelist[winningmoves[i][j]] === check) {
                      count++;
                    }
                  } //End small for

                  if (count > 1) {
                    for (var k in winningmoves[i]) {
                        if (gamelist[winningmoves[i][k]] === "") {
                          var box = winningmoves[i][k];
                          gamelist.splice(box, 1, computer);
                          $(".box" + box).html("<h1 class='text-center'>" + computer + "<h1>");
                          count = 0;
                          return "done";
                        }
                    }//end for
                  }
                count = 0;
              } //End big for
            } //End winning move function

          //See if there are any winning moves for computer. If there are then winning_move function makes move.
          var x = winning_move(computer, computer);
          if (x === "done") {
            return;
          }

          //See if any winning moves to block user from. If there are then winning_move function makes move. So we return.
          var y = winning_move(user, computer);
          if (y === "done") {
            return;
          }


          //If no winning moves to make or block then move to a corner #[1,3,7,9]
          //Perhaps make random empty corner at some point
          var corners = [1,3,7,9];
          var current = corners.length-1;
          //Shuffle corners to make more fun
          while (current > 0) {
            //Get random index
            var randindex = Math.floor(Math.random() * 4);
            //Do the swap
            var temp = corners[current];
            corners[current] = corners[randindex];
            corners[randindex] = temp;

            current--;
          }


          for (cornermove in corners) {
            if (gamelist[corners[cornermove]] === "") {
              var box = corners[cornermove];
              gamelist.splice(box, 1, computer);
              $(".box" + box).html("<h1 class='text-center'>" + computer + "<h1>");
              return;
            }
          }

          //If none of the above then move center if available
          if (gamelist[5] === "") {
            gamelist.splice(5, 1, computer);
            $(".box5").html("<h1 class='text-center'>" + computer + "<h1>");
            return;
          }

          //Unlikely that none of the above get triggered. But if not then make random move (all that are left are edges)

          //Get random number 1-9 to represent possible moves
          var random = Math.floor(Math.random() * (10 -1) + 1);

          //If move has been made keep generating random numbers until find empty space
          while (gamelist[random] !== "") {
            random = Math.floor(Math.random() * (10 -1) + 1);
          }

          //Once we have empty space add move to board and list
          gamelist.splice(random, 1, computer);
          $(".box" + random).html("<h1 class='text-center'>" + computer + "<h1>"); 


        } //End ai function


        //Create function for checking winners
        function checkwinner (computer, user) {

          //Create show winner function in case there is a winner
          function show_winner(one, two, three) {
            var color = "#A8ACB7";
            var color2 = "#353A45";
            $(".box" + one).css("background", color);
            $(".box" + two).css("background", color);
            $(".box" + three).css("background", color);

            setTimeout(function() {
              $(".box" + one).css("background", color2);
              $(".box" + two).css("background", color2);
              $(".box" + three).css("background", color2);
            }, 500);

            setTimeout(function() {
              $(".box" + one).css("background", color);
              $(".box" + two).css("background", color);
              $(".box" + three).css("background", color);
            }, 1000);

            setTimeout(function() {
              $(".box" + one).css("background", color2);
              $(".box" + two).css("background", color2);
              $(".box" + three).css("background", color2);
            }, 1500);

            setTimeout(function() {
              $(".box" + one).css("background", color);
            $(".box" + two).css("background", color);
            $(".box" + three).css("background", color);
            }, 2000);

            setTimeout(function() {
              $(".box" + one).css("background", color2);
              $(".box" + two).css("background", color2);
              $(".box" + three).css("background", color2);
              reset();
            }, 2500);
          } //End show_winner function


          //Create show draw function in case of draw
           function show_draw() {
             setTimeout(function() {
               $(".gameboard").css("visibility", "hidden");
             })

             setTimeout(function() {
               $(".gameboard").css("visibility", "visible");
             }, 500)

             setTimeout(function() {
               $(".gameboard").css("visibility", "hidden");
             }, 1000)

             setTimeout(function() {
               $(".gameboard").css("visibility", "visible");
             }, 1500)

             setTimeout(function() {
               $(".gameboard").css("visibility", "hidden");
             }, 2000)

             setTimeout(function() {
               $(".gameboard").css("visibility", "visible");
               reset();
             }, 2500)

           } //End show draw function


          //Check for user wins
          if(gamelist[1] === user && gamelist[2] === user && gamelist[3] === user) {   
            show_winner(1,2,3);
            return user + " wins";
          }
          else if(gamelist[4] === user && gamelist[5] === user && gamelist[6] === user) {
            show_winner(4,5,6);
            return user + " wins";
          }
          else if(gamelist[7] === user && gamelist[8] === user && gamelist[9] === user) {
            show_winner(7,8,9);
            return user + " wins";
          }
          else if(gamelist[1] === user && gamelist[4] === user && gamelist[7] === user) {
            show_winner(1,4,7);
            return user + " wins";
          }
          else if(gamelist[2] === user && gamelist[5] === user && gamelist[8] === user) {
            show_winner(2,5,8);
            return user + " wins";
          }
          else if(gamelist[3] === user && gamelist[6] === user && gamelist[9] === user) {
            show_winner(3,6,9);
            return user + " wins";
          }
          else if(gamelist[1] === user && gamelist[5] === user && gamelist[9] === user) {
            show_winner(1,5,9);
            return user + " wins";
          }
          else if(gamelist[3] === user && gamelist[5] === user && gamelist[7] === user) {
            show_winner(3,5,7);
            return user + " wins";
          }

          //Check for computer wins
          else if(gamelist[1] === computer && gamelist[2] === computer && gamelist[3] === computer) {
            show_winner(1,2,3);
            return computer + " wins";
          }
          else if(gamelist[4] === computer && gamelist[5] === computer && gamelist[6] === computer) {
            show_winner(4,5,6);
            return computer + " wins";
          }
          else if(gamelist[7] === computer && gamelist[8] === computer && gamelist[9] === computer) {
            show_winner(7,8,9);
            return computer + " wins";
          }
          else if(gamelist[1] === computer && gamelist[4] === computer && gamelist[7] === computer) {
            show_winner(1,4,7);
            return computer + " wins";
          }
          else if(gamelist[2] === computer && gamelist[5] === computer && gamelist[8] === computer) {
            show_winner(2,5,8);
            return computer + " wins";
          }
          else if(gamelist[3] === computer && gamelist[6] === computer && gamelist[9] === computer) {
            show_winner(3,6,9);
            return computer + " wins";
          }
          else if(gamelist[1] === computer && gamelist[5] === computer && gamelist[9] === computer) {
            show_winner(1,5,9);
            return computer + " wins";
          }
          else if(gamelist[3] === computer && gamelist[5] === computer && gamelist[7] === computer) {
            show_winner(3,5,7);
            return computer + " wins";
          }
          //Check to see if game is a draw. If not then continue.
          else {
            var check = 0;
            for (var i in gamelist) {
              if(gamelist[i] === "") {
                check++;
              }
            }
            if (check > 0) {
              return "continue";
            }
            else if (check === 0) {
              show_draw();
              return "draw";
            }
            console.log(check);
          }
        } //End checkwinner




        //Create function to reset the game once someone wins
        function reset() {
          //Reset all of the variables except pieces. Keep those the same.
          gamelist = ["holder", "", "", "", "", "", "", "", "", ""];
          game = "play"; 

          //Generate new board
          gameboard();

          //Let computer start game off
          ai(computer, user);
        }


        //Select piece by clicking on X or O when page first loads, generate gameboard and computer move
        $(".x").click(function() {
          user = "X";
          computer = "O";
          gameboard();
          ai(computer, user);
        })

        $(".o").click(function() {
          user = "O";
          computer = "X";
          gameboard();
          ai(computer, user);
        })

        //Once computer moves allow user to select move if available, add move to list/board, checkwinner, have ai go, checkwinner again
        //Once there is a winner then show winning row and reset game
        $(".gameboard").on("click", ".box1", function() {
          //If move available add user move to board and list and checkwinner
          if (gamelist[1] === "" && game === "play") {
            $(".box1").html("<h1 class='text-center'>" + user  + "</h1>");
            gamelist.splice(1, 1, user);
            var x = checkwinner(computer, user);
            //If no winner then have computer go and checkwinner... else reset the game
            if (x === "continue") {
                ai(computer, user);
                var y = checkwinner(computer, user);
                //If  winner then
                if(y !== "continue") {
                  game = "stop";
                } 
            }
            else {
              game = "stop";
            }
          } //End if statement
        })


        $(".gameboard").on("click", ".box2", function() {
          //If move available add user move to board and list
          if (gamelist[2] === "" && game === "play") {
            $(".box2").html("<h1 class='text-center'>" + user  + "</h1>");
            gamelist.splice(2, 1, user);
            var x = checkwinner(computer, user);
            //If no winner then else...
            if (x === "continue") {
                ai(computer, user);
                var y = checkwinner(computer, user);
                //If  winner then
                if(y !== "continue") {
                  game = "stop";
                } 
            }
            else {
              game = "stop";
            }
          } //End if statement
        })


        $(".gameboard").on("click", ".box3", function() {
          //If move available add user move to board and list
          if (gamelist[3] === "" && game === "play") {
            $(".box3").html("<h1 class='text-center'>" + user  + "</h1>");
            gamelist.splice(3, 1, user);
            var x = checkwinner(computer, user);
            //If no winner then else...
            if (x === "continue") {
                ai(computer, user);
                var y = checkwinner(computer, user);
                //If  winner then
                if(y !== "continue") {
                  game = "stop";
                } 
            }
            else {
              game = "stop";
            }
          } //End if statement
        })


        $(".gameboard").on("click", ".box4", function() {
          //If move available add user move to board and list
          if (gamelist[4] === "" && game === "play") {
            $(".box4").html("<h1 class='text-center'>" + user  + "</h1>");
            gamelist.splice(4, 1, user);
            var x = checkwinner(computer, user);
            //If no winner then else...
            if (x === "continue") {
                ai(computer, user);
                var y = checkwinner(computer, user);
                //If  winner then
                if(y !== "continue") {
                  game = "stop";
                } 
            }
            else {
              game = "stop";
            }
          } //End if statement
        })


        $(".gameboard").on("click", ".box5", function() {
          //If move available add user move to board and list
          if (gamelist[5] === "" && game === "play") {
            $(".box5").html("<h1 class='text-center'>" + user  + "</h1>");
            gamelist.splice(5, 1, user);
            var x = checkwinner(computer, user);
            //If no winner then else...
            if (x === "continue") {
                ai(computer, user);
                var y = checkwinner(computer, user);
                //If  winner then
                if(y !== "continue") {
                  game = "stop";
                } 
            }
            else {
              game = "stop";
            }
          } //End if statement
        })


        $(".gameboard").on("click", ".box6", function() {
          //If move available add user move to board and list
          if (gamelist[6] === "" && game === "play") {
            $(".box6").html("<h1 class='text-center'>" + user  + "</h1>");
            gamelist.splice(6, 1, user);
            var x = checkwinner(computer, user);
            //If no winner then else...
            if (x === "continue") {
                ai(computer, user);
                var y = checkwinner(computer, user);
                //If  winner then
                if(y !== "continue") {
                  game = "stop";
                } 
            }
            else {
              game = "stop";
            }
          } //End if statement
        })


        $(".gameboard").on("click", ".box7", function() {
          //If move available add user move to board and list
          if (gamelist[7] === "" && game === "play") {
            $(".box7").html("<h1 class='text-center'>" + user  + "</h1>");
            gamelist.splice(7, 1, user);
            var x = checkwinner(computer, user);
            //If no winner then else...
            if (x === "continue") {
                ai(computer, user);
                var y = checkwinner(computer, user);
                //If  winner then
                if(y !== "continue") {
                  game = "stop";
                } 
            }
            else {
              game = "stop";
            }
          } //End if statement
        })


        $(".gameboard").on("click", ".box8", function() {
          //If move available add user move to board and list
          if (gamelist[8] === "" && game === "play") {
            $(".box8").html("<h1 class='text-center'>" + user  + "</h1>");
            gamelist.splice(8, 1, user);
            var x = checkwinner(computer, user);
            //If no winner then else...
            if (x === "continue") {
                ai(computer, user);
                var y = checkwinner(computer, user);
                //If  winner then
                if(y !== "continue") {
                  game = "stop";
                } 
            }
            else {
              game = "stop";
            }
          } //End if statement
        })


        $(".gameboard").on("click", ".box9", function() {
          //If move available add user move to board and list
          if (gamelist[9] === "" && game === "play") {
            $(".box9").html("<h1 class='text-center'>" + user  + "</h1>");
            gamelist.splice(9, 1, user);
            var x = checkwinner(computer, user);
            //If no winner then else...
            if (x === "continue") {
                ai(computer, user);
                var y = checkwinner(computer, user);
                //If  winner then
                if(y !== "continue") {
                  game = "stop";
                } 
            }
            else {
              game = "stop";
            }
          } //End if statement
        })

    
    
    
    
    
}); // End whole document



