var redPlayer = "R", yellowPlayer = "Y", currPlayer = yellowPlayer, gameOver = false, board, rowNo = 6, collNo = 7, curColHeights;

window.onload = function () {

    setBoard()

    var info_h2 = $("#info")

    function setBoard() {
        board = []
        curColHeights = [5, 5, 5, 5, 5, 5, 5]

        for (let r = 0; r < rowNo; r++) {

            let row = []

            let html_rowDiv = document.createElement("div")
            html_rowDiv.classList.add("row")

            for (let c = 0; c < collNo; c++) {
                row.push(" ")

                $('<div>', {
                    id: r.toString() + "-" + c.toString(),
                    class: 'tile',
                }).appendTo(html_rowDiv);

            }

            document.getElementById("gameBoard").append(html_rowDiv)
            board.push(row)

        }

    }


    $(".tile").click(function () {
        if (gameOver) {
            return;
        }

        let elem_cNo = parseInt(this.id.split("-")[1])
        let elem_rNo = curColHeights[elem_cNo]

        if (elem_rNo < 0) {
            return;
        }

        board[elem_rNo][elem_cNo] = currPlayer;

        let tile = $(`#${elem_rNo}-${elem_cNo}`)

        if (currPlayer == yellowPlayer) {

            tile.addClass("yellow")
            currPlayer = redPlayer
            info_h2.html(`<span id="turn"></span>Red's Turn`).css("--color", "red")
        }
        else {

            tile.addClass("red")
            currPlayer = yellowPlayer
            info_h2.html(`<span id="turn"></span>Yellow's Turn`).css("--color", "yellow")
        }

        elem_rNo -= 1 //updating row height to fill column from bottom
        curColHeights[elem_cNo] = elem_rNo

        checkWinner()
    })


    function checkWinner() {

        // for match in row
        for (let r = 0; r < rowNo; r++) {
            for (let c = 0; c < collNo - 3; c++) {
                if (board[r][c] != " ") {
                    //check if the current position is filled or not
                    if (board[r][c] == board[r][c + 1] && board[r][c + 1] == board[r][c + 2] && board[r][c + 2] == board[r][c + 3]) {
                        setWinner(r, c)
                        return
                    }

                }

            }
        }

        // for match in column
        for (let c = 0; c < collNo; c++) {
            for (let r = 0; r < rowNo - 3; r++) {
                if (board[r][c] != " ") {
                    //check if the current position is filled or not
                    if (board[r][c] == board[r + 1][c] && board[r + 1][c] == board[r + 2][c] && board[r + 2][c] == board[r + 3][c]) {
                        setWinner(r, c)
                        return
                    }

                }

            }
        }
    }

    function setWinner(r, c) {
        let winnerDiv = $("#winner")

        if (board[r][c] == redPlayer) {
            info_h2.html(`<span id="winner">Red</span>Won the game 🎉`).css("--color", "red")
        }
        else {
            info_h2.html(`<span id="winner">Yellow</span>Won the game 🎉`).css("--color", "yellow")

        }

        gameOver = true
    }

}