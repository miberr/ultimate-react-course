function NextButton({ dispatch, answer, index, numQuestions }) {
    if (answer === null) {
        return null; // Don't show the button if no answer has been selected
    }

    if (index < numQuestions - 1) {
        return (
            <button
                className="btn btn-ui"
                onClick={() => dispatch({ type: 'nextQuestion' })}
            >
                Next
            </button>
        );
    }

    if (index === numQuestions - 1) {
        return (
            <button
                className="btn btn-ui"
                onClick={() => dispatch({ type: 'finish' })}
            >
                Finish
            </button>
        );
    }
}

export default NextButton;
