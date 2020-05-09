import React from "react";
import ReactDOM from "react-dom";
import AuthorQuiz from "./AuthorQuiz";
import { shuffle, sample } from "underscore";
import { BrowserRouter, Route, withRouter } from "react-router-dom";
import AddAuthorForm from "./AddAuthorForm";
import * as ReactRedux from "react-redux";
import * as Redux from "redux";

const authors = [
	{
		name: "Mark Twain",
		imageUrl: "images/authors/marktwain.jpg",
		imageSource: "Wikimedia Commons",
		books: ["The Adventures of Huckleberry Finn"]
	},
	{
		name: "Joseph Conrad",
		imageUrl: "images/authors/josephconrad.png",
		imageSource: "Wikimedia Commons",
		books: ["Heart of Darkness"]
	},
	{
		name: "J.K. Rowling",
		imageUrl: "images/authors/jkrowling.jpg",
		imageSource: "Wikimedia Commons",
		imageAttribution: "Daniel Ogren",
		books: ["Harry Potter and the Sorcerers Stone"]
	},
	{
		name: "Stephen King",
		imageUrl: "images/authors/stephenking.jpg",
		imageSource: "Wikimedia Commons",
		imageAttribution: "Pinguino",
		books: ["The Shining", "IT"]
	},
	{
		name: "Charles Dickens",
		imageUrl: "images/authors/charlesdickens.jpg",
		imageSource: "Wikimedia Commons",
		books: ["David Copperfield", "A Tale of Two Cities"]
	},
	{
		name: "William Shakespeare",
		imageUrl: "images/authors/williamshakespeare.jpg",
		imageSource: "Wikimedia Commons",
		books: ["Hamlet", "Macbeth", "Romeo and Juliet"]
	}
];

function gettingTurnDataAnotherWay(authors) {
	let fourRandomObjects = shuffle(authors).slice(0, 4);
	let answerObj = sample(fourRandomObjects);
	console.log("getting another way data");
	console.log(fourRandomObjects, answerObj);

	let allBooks = fourRandomObjects.reduce((p, c, i) => {
		return p.concat(c.books);
	}, []);

	// we dont know if slice will contain right answer obj book. So, this approach does't work.
	// as single owener is writng more than 1 book.
	return allBooks.slice(0, 4);
}

function getTurnData(authors) {
	/* 	
   Same As reduce functionality.
  let emptyArr = [];

	for (let item of authors) {
		for (let elem of item.books) {
			emptyArr.push(elem);
		}
	} */

	// To get books of all the authors into a single array.
	const allBooks = authors.reduce((p, c, i) => {
		return p.concat(c.books);
	}, []);

	// uses underscore library, shuffles & gets 4 books.
	// Next, we get the one book out of 4 books and be it our answer
	const fourRandomBooks = shuffle(allBooks).slice(0, 4);
	const answer = sample(fourRandomBooks);

	/* 	console.log(fourRandomBooks, answer);
	console.log(
		authors.find(author => author.books.some(title => title === answer))
	); */

	// sending the 4 books & object of the answer value we got from sample()
	return {
		books: fourRandomBooks,
		author: authors.find(author => author.books.some(title => title === answer))
	};

	// console.log(JSON.stringify(allBooks) === JSON.stringify(emptyArr)); // true
}

function reducer(
	state = { authors, turnData: getTurnData(authors), highlight: "" },
	action
) {
	switch (action.type) {
		case "ANSWER_SELECTED":
			//console.log("in case answer selected.");
			//console.log(state.turnData.author);
			const isCorrect = state.turnData.author.books.some(
				title => title === action.answer
			);

			return Object.assign({}, state, {
				highlight: isCorrect ? "correct" : "wrong"
			});

		// On Continue, we need to regenerate the question by sending resetting the state.
		case "CONTINUE":
			return Object.assign({}, state, {
				highlight: "",
				turnData: getTurnData(state.authors)
			});
		case "ADD_AUTHOR":
			return Object.assign({}, state, {
				authors: state.authors.concat([action.author])
			});
		default:
			return state;
	}
}

// store creation.
let store = Redux.createStore(
	reducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
	<BrowserRouter>
		<ReactRedux.Provider store={store}>
			<React.Fragment>
				<Route exact path="/" component={AuthorQuiz} />
				<Route exact path="/add" component={AddAuthorForm} />
			</React.Fragment>
		</ReactRedux.Provider>
	</BrowserRouter>,
	document.getElementById("root")
);

// function AuhtorWrapper() {
// 	return (
// 		<AddAuthorForm
// 			onAddAuthor={author => {
// 				authors.push(author);
// 			}}
// 		/>
// 	);
// }
// As it is only client-side, we cannot navigate across the pages.
// So,  using history prop, we can push the new path to the root.
