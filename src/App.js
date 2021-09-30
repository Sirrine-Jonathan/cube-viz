import './App.css';
import React, { useReducer, useMemo, useEffect, useState, useRef } from 'react'
import { AppStateContext, AppDispatchContext, DefaultState, reducer } from './State/context'
import Scene from './Components/Scene'
import Title from './Components/Title'
import Cubemap from './Components/Cubemap'
import Help from './Components/Help'
import useGestures from './Hooks/useGestures';
import useWindowSize from './Hooks/useWindowSize';
import Rubiks from './Components/Rubiks'

function App() {

	// App state setup
	const [state, dispatch] = useReducer(reducer, DefaultState);
	const context = useMemo(() => {
		return {state, dispatch}
	}, [state, dispatch])

	const padRef = useRef(null);
	const Gestures = useGestures(padRef);
	const { windowWidth } = useWindowSize();

	const [showHelp, setShowHelp] = useState(false);

	// global key listeners - on key press
	const turnKeyOn = (e) => {

		// setup keys for undo function
		if (e.key === 'Backspace'){
			dispatch({ type: 'undo' });
		}

		// arrow keys for rotating the cube
		if (e.key.includes('Arrow')){
			dispatch({ type: e.key, payload: true });
		}

		// https://ruwix.com/the-rubiks-cube/notation/
		const letterKeys = [
			'u', 'l', 'f', 'r', 'b', 'd', // clockwise
			'U', 'L', 'F', 'R', 'B', 'D', // counter clockwise
			'm', 'M', 'e', 'E', 's', 'S', // slice turns
		];

		// hook in dispatch to letters
		if (letterKeys.includes(e.key)){
			if (!state.moving){
				dispatch({ type: 'letterKey', payload: e.key });
			}
		}

		// include support for changing skybox view number keys
		const numbers = '0123456789'.split('');
		if (numbers.includes(e.key)){
			dispatch({ type: 'changeSkybox', payload: e.key });
		}
	}

	// global key listeners - on key release
	const turnKeyOff = (e) => {
		dispatch({ type: e.key, payload: false});
		if (e.key === 'h' || e.key === 'H'){
			setShowHelp(!showHelp);
		}
	}

	// attach listeners
	useEffect(() => {
		if (windowWidth > 800){
			window.addEventListener('keyup', turnKeyOff);
			window.addEventListener('keydown', turnKeyOn);
			return () => {
				window.removeEventListener('keyup', turnKeyOff);
				window.removeEventListener('keydown', turnKeyOn);
			}
		}
	}, [windowWidth])

	
	useEffect(() => {
		if (windowWidth <= 800){

			const give_alerts = false;
			const alertt = (msg) => (give_alerts) ? alert(msg):null;
			Gestures.subscribe('top-right', () => {
				if (!state.moving){
					dispatch({ type: 'letterKey', payload: 'u' });
					alertt('top-right');
				}
			});
			Gestures.subscribe('top-left', () => {
				if (!state.moving){
					dispatch({ type: 'letterKey', payload: 'U' });
					alertt('top-left');
				}
			});
			Gestures.subscribe('bottom-left', () => {
				if (!state.moving){
					dispatch({ type: 'letterKey', payload: 'D' });
					alertt('bottom-left');
				}
			});
			Gestures.subscribe('bottom-right', () => {
				if (!state.moving){
					dispatch({ type: 'letterKey', payload: 'd' });
					alertt('bottom-right');
				}
			});
			Gestures.subscribe('left-up', () => {
				if (!state.moving){
					dispatch({ type: 'letterKey', payload: 'L' });
					alertt('left-up');
				}
			});
			Gestures.subscribe('left-down', () => {
				if (!state.moving){
					dispatch({ type: 'letterKey', payload: 'l' });
					alertt('left-down');
				}
			});
			Gestures.subscribe('right-up', () => {
				if (!state.moving){
					dispatch({ type: 'letterKey', payload: 'r' });
					alertt('right-up');
				}
			});
			Gestures.subscribe('right-down', () => {
				if (!state.moving){
					dispatch({ type: 'letterKey', payload: 'R' });
					alertt('right-down');
				}
			});
			Gestures.subscribe('tap-top-left', () => {
				if (!state.moving){
					dispatch({ type: 'letterKey', payload: 'F' });
					alertt('tap-top-left');
				}
			});
			Gestures.subscribe('tap-top-right', () => {
				if (!state.moving){
					dispatch({ type: 'letterKey', payload: 'f' });
					alertt('tap-top-right');
				}
			});
			Gestures.subscribe('tap-bottom-right', () => {
				if (!state.moving){
					dispatch({ type: 'letterKey', payload: 'B' });
					alertt('tap-bottom-right');
				}
			});
			Gestures.subscribe('tap-bottom-left', () => {
				if (!state.moving){
					dispatch({ type: 'letterKey', payload: 'b' });
					alertt('tap-bottom-left');
				}
			});

			return () => {
				Gestures.unsubscribe('top-right');
				Gestures.unsubscribe('top-left');
				Gestures.unsubscribe('bottom-left');
				Gestures.unsubscribe('bottom-right');
				Gestures.unsubscribe('left-up');
				Gestures.unsubscribe('left-down');
				Gestures.unsubscribe('right-up');
				Gestures.unsubscribe('right-down');
				Gestures.unsubscribe('tap-top-left');
				Gestures.unsubscribe('tap-top-right');
				Gestures.unsubscribe('tap-bottom-right');
				Gestures.unsubscribe('tap-bottom-left');
			}
		}
	}, [])

	return (
		<AppStateContext.Provider value={context.state}>
			<AppDispatchContext.Provider value={context.dispatch}>
				<div className="App" ref={padRef}>
					<header className="App-header">
						<Title />
						<Cubemap />
						<Help show={showHelp} />
						<Scene
							displayEnvironment={true}
							displayFloor={false}
							onSectionChange={(section) => {
								console.log('section changed to ', section);
								//dispatch({type: 'updateSection', payload: section});
							}}
						>
							<Rubiks />
						</Scene>
					</header>
				</div>
			</AppDispatchContext.Provider>
		</AppStateContext.Provider>
	)
}

export default App;
