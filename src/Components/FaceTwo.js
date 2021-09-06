import React from 'react'
import Cube from './Cube2'
import { Math } from 'three'

function Face({ offset, type, space, idOffset, rotation}){
	
	const getCubes = () => {
		let cubes = [];
		for (let n = -1; n < 2; n++){
			for (let i = -1; i < 2; i++){
				let pos = [offset, i, n].map(e => e * space);
				cubes.push(pos);
			}
		}
		return cubes.map((pos, ind) => <Cube type={type} position={pos} colorID={ind + (idOffset * 9)} />);
	}

	return (
		<group rotation={[Math.degToRad(rotation), 0, 0]}>
			{getCubes()}
		</group>
	)
}

export default Face