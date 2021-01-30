import React, {useRef, useState, useEffect, useContext} from 'react'
import { useFrame } from 'react-three-fiber'
import { AppStateContext } from '../State/context'
import Face from './Face'

function Rubiks({ space }){

	const block = useRef()
	const state  = useContext(AppStateContext)

	let speed = 0.05;

	useFrame(() => {
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
		<group ref={block} position={[0,0,0]}>

			{/* FACE CONFIG MAP */}
			{/* 1, 2, 3 */}

			{/* Back Face,  */}
			<Face space={space} offset="-1" color="blue" type={state.faceConfig} />

			{/* Middle Face,  */}
			<Face space={space} offset="0" color="yellow" type={state.faceConfig} />

			{/* Front Face,  */}
			<Face space={space} offset="1" color="red" type={state.faceConfig} />
		</group>
	)
}

export default Rubiks