import React, { useContext } from 'react'
import { Canvas } from 'react-three-fiber'
import Rubiks from './Rubiks'
import { AppDispatchContext, AppStateContext } from '../State/context'

function Scene(){
	const v = useContext(AppStateContext);
	const d = useContext(AppDispatchContext);
	return (
		<Canvas>
			<AppStateContext.Provider value={v}>
				<AppDispatchContext.Provider value={d}>
					<ambientLight />
					<pointLight position={[10, 10, 10]} castShadow/>
					<Rubiks space="1.005" />
				</AppDispatchContext.Provider>
			</AppStateContext.Provider>
		</Canvas>
	)
}

export default Scene