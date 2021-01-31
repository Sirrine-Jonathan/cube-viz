import React, {useRef, useContext} from 'react'
import { useFrame } from 'react-three-fiber'
import { AppStateContext } from '../State/context'
import Face from './Face'

function Rubiks({ space }){

	const block = useRef()
	const state  = useContext(AppStateContext)

	let speed = 0.15;

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
			<Face space={space} offset="-1" idOffset={0} color="red" type={state.faceConfig} faceID={0} />
			<Face space={space} offset="0" idOffset={1} color="white" type={state.faceConfig} faceID={1} />
			<Face space={space} offset="1" idOffset={2} color="green" type={state.faceConfig} faceID={2} />

		</group>
	)
}

export default Rubiks