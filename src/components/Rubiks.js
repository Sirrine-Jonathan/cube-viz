import React, {useRef, useState, useEffect} from 'react'
import { useFrame } from 'react-three-fiber'
import Face from './Face'

function Rubiks({ space }){

	const block = useRef()
	const [state, setState] = useState({
		ArrowLeft: false,
		ArrowRight: false,
		ArrowUp: false,
		ArrowDown: false,
		faceConfig: 0,
	})

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

	useEffect(() => {
		document.addEventListener('keydown', (e) => { setState({ [e.key]: true })});
		document.addEventListener('keyup', (e) => { setState({ [e.key]: false})});
	}, [])

	console.log('render', state);

	return (
		<group ref={block} position={[0,0,0]}>

			{/* FACE CONFIG MAP */}
			{/* 1, 2, 3 */}

			{/* Back Face,  */}
			<Face space={space} offset="-1" color="blue" type={0} />

			{/* Middle Face,  */}
			<Face space={space} offset="0" color="yellow" type={0} />

			{/* Front Face,  */}
			<Face space={space} offset="1" color="red" type={0} />
		</group>
	)
}

export default Rubiks