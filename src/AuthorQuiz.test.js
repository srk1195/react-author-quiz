// Using JEST for testing the components.
import React from "react";
import ReactDOM from "react-dom";
import AuthorQuiz from "./AuthorQuiz";
import Enzyme, { mount, shallow, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// Configuring the Enzyme adapter.
// Connecting the Enzyme to Enzyme React adapter
Enzyme.configure({ adapter: new Adapter() });

const state = {
	turnData: {
		books: [
			"The Shining",
			"IT",
			"A Tale of Two Cities",
			"Harry Potter and the Sorcerers Stone"
		],
		author: {
			name: "Charles Dickens",
			imageUrl: "images/authors/charlesdickens.jpg",
			imageSource: "Wikimedia Commons",
			books: ["David Copperfield", "A Tale of Two Cities"]
		}
	},
	highlight: "none"
};

//Test Cases
describe("Author Quiz", () => {
	it("Renders without crashing", () => {
		const div = document.createElement("div");
		ReactDOM.render(<AuthorQuiz {...state} onAnswerSelected={() => {}} />, div);
	});

	describe("When no answer has been selected", () => {
		let wrapper;
		beforeAll(() => {
			wrapper = mount(<AuthorQuiz {...state} onAnswerSelected={() => {}} />);
		});

		it("should have no bcakgorund color", () => {
			expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe(
				""
			);
		});
	});

	describe("When wrong answer has been selected", () => {
		let wrapper;
		beforeAll(() => {
			wrapper = mount(
				// passing an object with state and overwriting the highlight to 'wrong'
				<AuthorQuiz
					{...Object.assign({}, state, { highlight: "wrong" })}
					onAnswerSelected={() => {}}
				/>
			);
		});

		it("should have red bcakgorund color", () => {
			expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe(
				"red"
			);
		});
	});

	describe("When correct answer has been selected", () => {
		let wrapper;
		beforeAll(() => {
			wrapper = mount(
				// passing an object with state and overwriting the highlight to 'wrong'
				<AuthorQuiz
					{...Object.assign({}, state, { highlight: "correct" })}
					onAnswerSelected={() => {}}
				/>
			);
		});

		it("should have green bcakgorund color", () => {
			expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe(
				"green"
			);
		});
	});

	// testing the DOM level click.
	describe("When the first answer is selected", () => {
		let wrapper;
		// We are creating a mock function, which will be triggered when the answer is selected.
		const handleAnswerSelected = jest.fn();

		beforeAll(() => {
			wrapper = mount(
				<AuthorQuiz {...state} onAnswerSelected={handleAnswerSelected} />
			);

			// finding the first answer element out of 4 and clicking it.
			wrapper
				.find(".answer")
				.first()
				.simulate("click");
		});

		it("onAnswerSelected has been called", () => {
			expect(handleAnswerSelected).toHaveBeenCalled();
		});

		it("Should receieve The Shining", () => {
			expect(handleAnswerSelected).toHaveBeenCalledWith("The Shining");
		});
	});
});
