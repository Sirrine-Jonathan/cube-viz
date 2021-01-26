import './App.css';
import React, { useReducer, useEffect } from 'react'
import { Canvas } from 'react-three-fiber'
import Rubiks from './components/Rubiks'
import { AppStateContext, AppDispatchContext, DefaultState, reducer } from './State/context'



function App() {

  const [state, dispatch] = useReducer(reducer, DefaultState);
  /* 
  const context = useMemo(() => {
	  return {state, dispatch}
  }, [state, dispatch])
  */

  useEffect(() => {
	//document.addEventListener('keydown', (e) => { dispatch({ type: e.key, payload: true })});
	//document.addEventListener('keyup', (e) => { dispatch({ type: e.key, payload: false })});
  }, [])

  return (
	<AppStateContext.Provider value={state}>
		<AppDispatchContext.Provider value={dispatch}>
		<div className="App">
			<header className="App-header">
				<Canvas>
					<ambientLight />
					<pointLight position={[10, 10, 10]} />
					<Rubiks space="1.2"/>
				</Canvas>
			</header>
		</div>
		</AppDispatchContext.Provider>
	</AppStateContext.Provider>
  )
}

export default App;
