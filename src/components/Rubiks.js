import React, {useRef, useContext, useState } from 'react'
import { useFrame } from 'react-three-fiber'
import { AppStateContext, AppDispatchContext } from '../State/context'
import Face from './Face'

function Rubiks({ space }){

	const block = useRef()
	const state  = useContext(AppStateContext);
	const dispatch = useContext(AppDispatchContext);
	const [partMoving, setPartMoving] = useState(false);
	const [limit, setLimit] = useState(0);
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

		// rotate faces with letter keys
		if (state.moving){
			// face config zero operations
			if (state.move === 'f'){
				rotateFace(false, 0, 2);
			}
			if (state.move === 'F'){
				rotateFace(true, 0, 2)
			}
			
			if (state.move === 'b'){
				rotateFace(true, 0, 0)
			}

			if (state.move === 'B'){
				rotateFace(false, 0, 0)
			}

			if (state.move === 's'){
				rotateFace(false, 0, 1)
			}

			if (state.move === 'S'){
				rotateFace(true, 0, 1)
			}

			// face config one operations
			if (state.move === 'u'){
				rotateFace(false, 1, 2)
			}

			if (state.move === 'U'){
				rotateFace(true, 1, 2)
			}

			if (state.move === 'd'){
				rotateFace(true, 1, 0)
			}

			if (state.move === 'D'){
				rotateFace(false, 1, 0)
			}

			if (state.move === 'e'){
				rotateFace(true, 1, 1)
			}

			if (state.move === 'E'){
				rotateFace(false, 1, 1)
			}

			// face config two operations
			if (state.move === 'r'){
				rotateFace(false, 2, 2)
			}

			if (state.move === 'R'){
				rotateFace(true, 2, 2)
			}

			if (state.move === 'l'){
				rotateFace(true, 2, 0)
			}

			if (state.move === 'L'){
				rotateFace(false, 2, 0)
			}

			if (state.move === 'm'){
				rotateFace(true, 2, 1)
			}

			if (state.move === 'M'){
				rotateFace(false, 2, 1)
			}
		}

	})

	const rotateFace = (clockwise = true, faceConfig, faceID) => {
		let current = state.rotations[faceConfig][faceID];
		if (!partMoving){
			let limit = (clockwise) ? current + 90:current - 90;
			setLimit(limit);
			setPartMoving(true);
		} else {
			let inc = 5;
			let newVal = (clockwise) ? current + inc:current - inc;
			let check = (clockwise) ? (newVal >= limit):(newVal <= limit);
			if (check){
				newVal = limit;
				setPartMoving(false);
				dispatch({ type: 'endMove' });
			}
			dispatch({ type: 'setRotations', payload: [faceConfig, faceID, newVal] });
		}
	}

	const getRotation = (id) => {
		return state.rotations[state.faceConfig][id];
	}

	return (
		<group ref={block} position={[0,0,0]} rotation={[0.1,-0.6,0]}>
			<Face space={space} offset="-1" idOffset={0} type={state.faceConfig} faceID={0} rotation={getRotation(0)} />
			<Face space={space} offset="0"  idOffset={1} type={state.faceConfig} faceID={1} rotation={getRotation(1)} />
			<Face space={space} offset="1"  idOffset={2} type={state.faceConfig} faceID={2} rotation={getRotation(2)} />
		</group>
	)
}

export default Rubiks