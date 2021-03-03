import React, {useRef, useContext, useState } from 'react'
import { useFrame } from 'react-three-fiber'
import { AppStateContext, AppDispatchContext } from '../State/context'
import Cube from './Cube'

function Rubiks(){

	const block = useRef()
	const state  = useContext(AppStateContext);
	const dispatch = useContext(AppDispatchContext);
	const [partMoving, setPartMoving] = useState(false);
	const [limit, setLimit] = useState(0);
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


			// debug moves 
			if (state.debug_move === 'x'){
				rotateCube(false, 0);
			}
			if (state.debug_move === 'X'){
				rotateCube(true, 0);
			}
			if (state.debug_move  === 'y'){
				rotateCube(false, 1);
			}
			if (state.debug_move  === 'Y'){
				rotateCube(true, 1);
			}
			if (state.debug_move  === 'z'){
				rotateCube(false, 2);
			}
			if (state.debug_move  === 'Z'){
				rotateCube(true, 2);
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
				dispatch({ type: 'setRotations', payload: {faceConfig, faceID, newVal} });
				dispatch({ type: 'endMove' });
			} else {
				dispatch({ type: 'setRotations', payload: {faceConfig, faceID, newVal} });
			}
		}
	}

	const rotateCube = (reverse = false, axis) => {
		let current = state.cubeRotations[0][axis];
		//let current = state.spin[0];
		if (!partMoving){
			let limit = (reverse) ? current + 90:current - 90;
			setLimit(limit);
			setPartMoving(true);
		} else {
			let inc = 1;
			let newVal = (reverse) ? current + inc:current - inc;
			let check = (reverse) ? (newVal >= limit):(newVal <= limit);
			console.log({newVal});
			if (check){
				newVal = limit;
				setPartMoving(false);
				dispatch({ type: 'setDebugSpin', payload: { newVal, axis }});
				dispatch({ type: 'endDebugMove' });
			} else {
				dispatch({ type: 'setDebugSpin', payload: { newVal, axis }});
			}
		}
	}

	let faceConfig = 0;

	return (
		(state.pos.length >= 8) ? (
			<group ref={block} position={[0,0,0]} rotation={[0.1,-0.6,0]}>
				(faceConfig === 0) ? (
					<group>
				):null
				<Cube position={state.pos[0]}  ID={0}  />
				<Cube position={state.pos[1]}  ID={1}  />
				<Cube position={state.pos[2]}  ID={2}  />
				<Cube position={state.pos[3]}  ID={3}  />
				<Cube position={state.pos[4]}  ID={4}  />
				<Cube position={state.pos[5]}  ID={5}  />
				<Cube position={state.pos[6]}  ID={6}  />
				<Cube position={state.pos[7]}  ID={7}  />
				<Cube position={state.pos[8]}  ID={8}  />
				(faceConfig === 0) ? (
					</group>
				):null
				(faceConfig === 0) ? (
					<group>
				):null
				<Cube position={state.pos[9]}  ID={9}  />
				<Cube position={state.pos[10]} ID={10} />
				<Cube position={state.pos[11]} ID={11} />
				<Cube position={state.pos[12]} ID={12} />
				<Cube position={state.pos[13]} ID={13} />
				<Cube position={state.pos[14]} ID={14} />
				<Cube position={state.pos[15]} ID={15} />
				<Cube position={state.pos[16]} ID={16} />
				<Cube position={state.pos[17]} ID={17} />
				(faceConfig === 0) ? (
					</group>
				):null
				(faceConfig === 0) ? (
					<group>
				):null
				<Cube position={state.pos[18]} ID={18} />
				<Cube position={state.pos[19]} ID={19} />
				<Cube position={state.pos[20]} ID={20} />
				<Cube position={state.pos[21]} ID={21} />
				<Cube position={state.pos[22]} ID={22} />
				<Cube position={state.pos[23]} ID={23} />
				<Cube position={state.pos[24]} ID={24} />
				<Cube position={state.pos[25]} ID={25} />
				<Cube position={state.pos[26]} ID={26} />
				(faceConfig === 0) ? (
					</group>
				):null
			</group>
		):null 
	)
}

export default Rubiks