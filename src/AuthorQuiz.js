import React from "react";
import "./bootstrap.min.css";
import "./app.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/* class AuthorQuiz extends Component {
	render() {
		return <div className="container-fluid"> Author Quiz </div>;
	}
} */

function Book(props) {
	return (
		<div
			className="answer"
			onClick={() => {
				props.onBookClick(props.title);
			}}
		>
			{" "}
			<h4> {props.title} </h4>{" "}
		</div>
	);
}

function Hero(props) {
	return (
		<div className="row">
			<div className="jumbotron col-10 offset-1">
				{" "}
				<h1> Author Quiz</h1>
				<p> Select the book written by the author shown </p>
			</div>
		</div>
	);
}

function Turn({ author, books, highlight, onAnswerSelected }) {
	function getHighlightColorToBg(highlight) {
		const mapping = {
			none: "",
			wrong: "red",
			correct: "green"
		};

		return mapping[highlight];
	}

	return (
		<div
			className="row turn"
			style={{ backgroundColor: getHighlightColorToBg(highlight) }}
		>
			<div className="col-4 offset-1">
				{/* this is where author picture comes. */}
				<img src={author.imageUrl} className="authorimage" alt="Author" />
				<strong align="right"> {author.name}</strong>
			</div>
			<div className="col-6">
				{/* This is where all the options come. */}
				{books.map(title => (
					<Book title={title} key={title} onBookClick={onAnswerSelected} />
				))}
			</div>
		</div>
	);
}

// Validating the Turn Component parameters at RUN_TIME.
Turn.propTypes = {
	// Validating single author object.
	author: PropTypes.shape({
		name: PropTypes.string.isRequired,
		imageUrl: PropTypes.string.isRequired,
		imageSource: PropTypes.string.isRequired,
		books: PropTypes.arrayOf(PropTypes.string.isRequired)
	}),
	books: PropTypes.arrayOf(PropTypes.string.isRequired),
	highlight: PropTypes.string.isRequired,
	onAnswerSelected: PropTypes.func.isRequired
};

function Continue(props) {
	return <div />;
}

function Footer(props) {
	return (
		<div id="footer" className="row">
			<div className="col-12">
				{" "}
				<p className="text-muted credit">
					All images are from{" "}
					<a href="http://commons.wikimedia.org/wiki/Main_Page">
						Wikemedia Commons
					</a>{" "}
					and are in the public domain.
				</p>
			</div>
		</div>
	);
}

function AuthorQuiz({ turnData, highlight, onAnswerSelected }) {
	return (
		<div className="container-fluid">
			<Hero />
			<Turn
				{...turnData}
				highlight={highlight}
				onAnswerSelected={onAnswerSelected}
			/>
			<Continue />
			<Link to="/add">click here to add an author </Link>
			<Footer />
		</div>
	);
}

export default AuthorQuiz;
