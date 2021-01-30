import React, {useContext, useState, useRef} from 'react'
import Cube from './Cube'
import { Math } from 'three'
import { useFrame } from 'react-three-fiber'
import { AppDispatchContext, AppStateContext } from '../State/context'

function Face({ offset, space, color, type, faceID}){

	const mesh = useRef()
	const [partMoving, setPartMoving] = useState(false);
	const [lastMoveVal, setLastMoveVal] = useState(null);
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
			if (state.move === 'f' && faceID === 2){
				console.log('part is moving');
				if (!partMoving){
					setLastMoveVal(Math.radToDeg(mesh.current.rotation.x));
					setPartMoving(true);
				} else {
					mesh.current.rotation.z += Math.degToRad(5);
					
					console.log({
						lastMoveVal: Math.radToDeg(mesh.current.rotation.x),
						stopper: Math.radToDeg(mesh.current.rotation.x) + 90,
						currentMoveVale: Math.radToDeg(mesh.current.rotation.z),
					})
					let limit = Math.radToDeg(lastMoveVal) + 90; //(lastMoveVal + (90 * (Math.PI / 180)));
					if (Math.radToDeg(mesh.current.rotation.z)>= limit){
						if (Math.radToDeg(mesh.current.rotation.z) >= limit){
							mesh.current.rotation.z = Math.degToRad(limit);
						}
						setPartMoving(false);
						setLastMoveVal(Math.radToDeg(mesh.current.rotation.x));
						dispatch({ type: 'endMove' });
					}
				}
			}
		}
		//mesh.current.rotation.x = mesh.current.rotation.y += 0.01
	})

	const getCubesTypeZero = () => {
		let cubes = [];
		for (let n = -1; n < 2; n++){
			for (let i = -1; i < 2; i++){
				let pos = [i, n, offset].map(e => e * space);
				cubes.push(<Cube position={pos} color={color}/>);
			}
		}
		return cubes
	}
	
	const getCubesTypeOne = () => {
		let cubes = [];
		for (let n = -1; n < 2; n++){
			for (let i = -1; i < 2; i++){
				let pos = [n, offset, i].map(e => e * space);
				console.log(pos);
				cubes.push(<Cube position={pos} color={color}/>);
			}
		}
		return cubes
	}
	
	const getCubesTypeTwo = () => {
		let cubes = [];
		for (let n = -1; n < 2; n++){
			for (let i = -1; i < 2; i++){
				let pos = [offset, i, n].map(e => e * space);
				cubes.push(<Cube position={pos} color={color}/>);
			}
		}
		return cubes
	}

	const getCubes = () => {
		if (type === 0){
			return getCubesTypeZero();
		} else if (type === 1){
			return getCubesTypeOne();
		} else if (type === 2){
			return getCubesTypeTwo();
		}
	}

	return (
		<group ref={mesh}>
			{getCubes()}
		</group>
	)
}

export default Face