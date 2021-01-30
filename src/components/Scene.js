import React, { useContext } from 'react'
import { Canvas } from 'react-three-fiber'
import Rubiks from './Rubiks'
import { AppStateContext } from '../State/context'

function Scene(){
	const v = useContext(AppStateContext);
	return (
		<Canvas>
			<AppStateContext.Provider value={v}>
				<ambientLight />
				<pointLight position={[10, 10, 10]} />
				<Rubiks space="1.2"/>
			</AppStateContext.Provider>
		</Canvas>
	)
}

export default Scene