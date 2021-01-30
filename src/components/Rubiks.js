import React, {useRef, useContext} from 'react'
import { useFrame } from 'react-three-fiber'
import { AppStateContext } from '../State/context'
import Face from './Face'

function Rubiks({ space }){

	const block = useRef()
	const state  = useContext(AppStateContext)

	let speed = 0.05;

	useFrame(() => {
		
		// whole cube rotation with arrow keys
		if (state.ArrowLeft){
			block.current.rotation.y = block.current.rotation.y -= speed
		}
		if (state.ArrowRight){
			block.current.rotation.y = block.current.rotation.y += speed
		}
		if (state.ArrowUp){
			block.current.rotation.x = block.current.rotation.x -= speed
		}
		if (state.ArrowDown){
			block.current.rotation.x = block.current.rotation.x += speed
		}
	})

	return (
		<group ref={block} position={[0,0,0]} rotation={[0.4,-0.5,0]} castShadow>

			{/* FACE CONFIG MAP */}
			{/* 1, 2, 3 */}

			{/* Back Face,  */}
			<Face space={space} offset="-1" color="blue" type={state.faceConfig} faceID={0} />

			{/* Middle Face,  */}
			<Face space={space} offset="0" color="yellow" type={state.faceConfig} faceID={1} />

			{/* Front Face,  */}
			<Face space={space} offset="1" color="red" type={state.faceConfig} faceID={2} />

		</group>
	)
}

export default Rubiks