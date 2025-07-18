import { useEffect, useReducer } from 'react';
import Error from './Error';
import Timer from './Timer';
import Footer from './Footer';
import Question from './Question';
import Header from './Header';
import Main from './Main';
import NextButton from './NextButton';
import Loader from './Loader';
import StartScreen from './StartScreen';
import Progress from './Progress';
import FinishScreen from './FinishScreen';

const SECS_PER_QUESTION = 30; // seconds per question

const initialState = {
    guestions: [],
    // loading, error, ready, active, finished
    status: 'loading',
    index: 0,
    answer: null,
    points: 0,
    highscore: 0,
    secondsRemaining: null,
};

function reducer(state, action) {
    switch (action.type) {
        case 'dataReceived':
            return {
                ...state,
                questions: action.payload,
                status: 'ready',
            };
        case 'dataFailed':
            return {
                ...state,
                status: 'error',
            };
        case 'start':
            return {
                ...state,
                status: 'active',
                secondsRemaining: state.questions.length * SECS_PER_QUESTION,
            };
        case 'newAnswer':
            const question = state.questions[state.index];

            return {
                ...state,
                answer: action.payload,
                points:
                    action.payload === question.correctOption
                        ? state.points + question.points
                        : state.points,
            };
        case 'nextQuestion':
            return {
                ...state,
                index: state.index + 1,
                answer: null,
            };
        case 'finish':
            return {
                ...state,
                status: 'finished',
                highscore:
                    state.points > state.highscore
                        ? state.points
                        : state.highscore,
            };
        case 'restart':
            return {
                ...initialState,
                status: 'active',
                questions: state.questions,
                highscore: state.highscore,
            };
        case 'tick':
            return {
                ...state,
                secondsRemaining: state.secondsRemaining - 1,
                status:
                    state.secondsRemaining === 0 ? 'finished' : state.status,
            };
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
}

export default function App() {
    const [
        {
            questions,
            status,
            index,
            answer,
            points,
            highscore,
            secondsRemaining,
        },
        dispatch,
    ] = useReducer(reducer, initialState);

    const numQuestions = questions?.length;
    const maxPossiblePoints = questions?.reduce(
        (previous, current) => previous + current.points,
        0
    );

    useEffect(function () {
        fetch('http://localhost:8000/questions')
            .then((res) => res.json())
            .then((data) =>
                dispatch({
                    type: 'dataReceived',
                    payload: data,
                })
            )
            .catch((err) =>
                dispatch({
                    type: 'dataFailed',
                })
            );
    }, []);

    return (
        <div className="app">
            <Header />
            <Main>
                {status === 'loading' && <Loader />}
                {status === 'error' && <Error />}
                {status === 'ready' && (
                    <StartScreen
                        numQuestions={numQuestions}
                        dispatch={dispatch}
                    />
                )}
                {status === 'active' && (
                    <>
                        <Progress
                            numQuestions={numQuestions}
                            index={index}
                            points={points}
                            maxPossiblePoints={maxPossiblePoints}
                            answer={answer}
                        />
                        <Question
                            question={questions.at(index)}
                            dispatch={dispatch}
                            answer={answer}
                        />
                        <Footer>
                            <Timer
                                dispatch={dispatch}
                                secondsRemaining={secondsRemaining}
                            />
                            <NextButton
                                dispatch={dispatch}
                                answer={answer}
                                index={index}
                                numQuestions={numQuestions}
                            />
                        </Footer>
                    </>
                )}
                {status === 'finished' && (
                    <FinishScreen
                        maxPossiblePoints={maxPossiblePoints}
                        points={points}
                        highscore={highscore}
                        dispatch={dispatch}
                    />
                )}
            </Main>
        </div>
    );
}
