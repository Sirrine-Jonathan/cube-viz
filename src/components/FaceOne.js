import React, {useContext, useState, useRef} from 'react'
import Cube from './Cube'
import { Math } from 'three'
import { useFrame } from 'react-three-fiber'
import { AppDispatchContext, AppStateContext } from '../State/context'

function Face({ offset, type, space, color, faceID, idOffset}){

	const mesh = useRef()
	const [partMoving, setPartMoving] = useState(false);
	const [limit, setLimit] = useState(null);
	const dispatch = useContext(AppDispatchContext);
	const state  = useContext(AppStateContext);

	useFrame(() => {
		if (state.moving){
			/*
			const moves = [
				'u', 'l', 'f', 'r', 'b', 'd', // clockwise
				'U', 'L', 'F', 'R', 'B', 'D', // counter clockwise
				'm', 'M', 'e', 'E', 's', 'S', // slice turns
			];
			*/
			if (state.move === 'u' && faceID === 2){
				rotateFace(false, 'y')
			}

			if (state.move === 'U' && faceID === 2){
				rotateFace(true, 'y')
			}

			if (state.move === 'd' && faceID === 0){
				rotateFace(true, 'y')
			}

			if (state.move === 'D' && faceID === 0){
				rotateFace(false, 'y')
			}

			if (state.move === 'e' && faceID === 1){
				rotateFace(true, 'y')
			}

			if (state.move === 'E' && faceID === 1){
				rotateFace(false, 'y')
			}
		}
	})

	const rotateFace = (clockwise = true, axis) => {
		if (!partMoving){
			let lastMove = Math.radToDeg(mesh.current.rotation[axis]);
			let limit = (clockwise) ? lastMove + 90:lastMove - 90;
			setLimit(limit);
			setPartMoving(true); 
		} else {
			let inc = Math.degToRad(5)
			mesh.current.rotation[axis] = (clockwise) ? mesh.current.rotation[axis] + inc:mesh.current.rotation[axis] - inc;
			let currentPos = Math.radToDeg(mesh.current.rotation[axis]);
			let check = (clockwise) ? (currentPos >= limit):(currentPos <= limit);
			if (check){
				mesh.current.rotation[axis] = Math.degToRad(limit);
				setPartMoving(false);
				dispatch({ type: 'endMove' });
			}
		}
	}


	const getCubes = () => {
		let cubes = [];
		for (let n = -1; n < 2; n++){
			for (let i = -1; i < 2; i++){
				let pos = [n, offset, i].map(e => e * space);
				cubes.push({pos, color});
			}
		}
		return cubes.map((obj, ind) => <Cube type={type} position={obj.pos} color={obj.color} colorID={ind + (idOffset * 9)} />);
	}

	return (
		<group ref={mesh}>
			{getCubes()}
		</group>
	)
}

export default Face