import React from 'react'
import Cube from './Cube'
import { Math } from 'three'

function Face({ offset, type, space, idOffset, rotation}){

	const getCubes = () => {
		let cubes = [];
		for (let n = -1; n < 2; n++){
			for (let i = -1; i < 2; i++){
				let pos = [i, n, offset].map(e => e * space);
				cubes.push(pos);
			}
		}
		return cubes.map((pos, ind) => <Cube type={type} position={pos} colorID={ind + (idOffset * 9)} />);
	}

	return (
		<group rotation={[0,0,Math.degToRad(rotation)]}>
			{getCubes()}
		</group>
	)
}

export default Face