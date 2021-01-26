import React from 'react'
import Cube from './Cube'
import { useFrame } from 'react-three-fiber'

function Face({ offset, space, color, type}){


	useFrame(() => {
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
				let pos = [i, n, offset].map(e => e * space);
				cubes.push(<Cube position={pos} color={color}/>);
			}
		}
		return cubes
	}

	const getCubesTypeTwo= () => {
		let cubes = [];
		for (let n = -1; n < 2; n++){
			for (let i = -1; i < 2; i++){
				let pos = [i, n, offset].map(e => e * space);
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
		<>
			{getCubes()}
		</>
	)
}

export default Face