"use strict";

const turnOver = new Audio("sound/ting.mp3");
const gameOver = new Audio("sound/gameover.mp3");
let turn = "X";
let isGameOver = false;

function changeTurn() {
	return turn === "X" ? "O" : "X";
}

function checkWin() {
	let boxtext = document.getElementsByClassName("boxtext");
	const wins = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	wins.forEach((e) => {
		if (
			boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
			boxtext[e[1]].innerText === boxtext[e[2]].innerText &&
			boxtext[e[0]].innerText !== ""
		) {
			document.querySelector(".info").innerText =
				boxtext[e[0]].innerText + " Won";
			isGameOver = true;
			gameOver.play();
			turnOver.pause();
			return;
		}
	});

	if (Array.from(boxtext).every((box) => box.innerText !== "")) {
		document.querySelector(".info").innerText = "It's a draw";
		isGameOver = true;
		turnOver.pause();
		gameOver.play();
		return;
	}
}

function clickHandler() {
	let boxtext = this.querySelector(".boxtext");
	if (!isGameOver && boxtext.innerText === "") {
		boxtext.innerText = turn;
		turn = changeTurn();
		turnOver.play();
		checkWin();
		if (!isGameOver) {
			document.querySelector(".info").innerText = turn + "'s turn";
		}
	}
}

let boxes = document.getElementsByClassName("box");

Array.from(boxes).forEach((element) => {
	element.addEventListener("click", clickHandler);
});

reset.addEventListener("click", () => {
	let boxtext = document.querySelectorAll(".boxtext");
	Array.from(boxtext).forEach((e) => {
		e.innerText = "";
	});

	turn = "X";
	isGameOver = false;
	document.querySelector(".info").innerText = turn + "'s turn";
});
