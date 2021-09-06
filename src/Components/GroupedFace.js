import React, { useRef } from 'react'
import Cube from './Cube'
import { useFrame } from 'react-three-fiber'

function Face({ offset, space }){

	const mesh = useRef()

	useFrame(() => {
		//mesh.current.rotation.x = mesh.current.rotation.y += 0.01
	})

	const getCubes = () => {
		let cubes = [];
		for (let n = -1; n < 2; n++){
			for (let i = -1; i < 2; i++){
				let pos = [i, n, offset].map(e => e * space);
				cubes.push(<Cube position={pos} color="blue"/>);
			}
		}
		return cubes
	}

	return (
		<group ref={mesh}>
			{getCubes()}
		</group>
	)
}

export default Face