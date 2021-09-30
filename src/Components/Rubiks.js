import React, {useRef, useContext, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Vector3, MathUtils, Group } from 'three';
import { AppStateContext, AppDispatchContext } from '../State/context'
import { moves } from '../Util/Rotations';
import Cube from './Cube'
import useWindowSize from '../Hooks/useWindowSize';

const Rubiks = () => {

	const block = useRef();
	const degLimit = 90;

	// app state
	const state  = useContext(AppStateContext);
	const dispatch = useContext(AppDispatchContext);

	// internal state
	const [degCount, setDegCount] = useState(0);
	const space = useRef(0.05);

	// config
	const speed = 0.05;
	const degreeIncrement = 5;

	/*
		Animation Loop
		Looks for changes to keyboard and makes changes
	*/
	useFrame(() => {
		// whole cube rotation with arrow keys
		const { section } = state;
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
			rotateFace(degreeIncrement);
		} else if (state.mixing) {
			dispatch({ type: 'doNextMix' });
		}
	})

	const rotateFace = (increment) => {
		let newDegCount = degCount + increment;

		// handle situation where degreeIncrement puts newDegCount over or under limit
		if (newDegCount >= degLimit){
			let customInc = newDegCount % degLimit;
			setDegCount(0);
			dispatch({ type: 'endMove' });
			performRotateFaceAnimation(customInc);
		} else {

			// carry on like normal
			setDegCount(newDegCount);
			performRotateFaceAnimation(increment);
		}
	}

	const shouldAttach = (each, index) => {
		let relevantPositions = moves[state.letterKey.toLowerCase()].positions;
		let relevantCubes = relevantPositions.map(pos => {
			return state.positions[pos];
		});
		return (
			each &&
			each.current &&
			relevantCubes.indexOf(index) >= 0
		);
	}

	const performRotateFaceAnimation = (customInc) => {
		let clockwise = state.letterKey === state.letterKey.toUpperCase();
		if (
			state.letterKey.toUpperCase() === 'L' ||
			state.letterKey.toUpperCase() === 'D' ||
			state.letterKey.toUpperCase() === 'B' ||
			state.letterKey.toUpperCase() === 'M' ||
			state.letterKey.toUpperCase() === 'E'
		){
			clockwise = !clockwise;
		}
		const axis = moves[state.letterKey].mainAxis;
		let degrees = degreeIncrement;
		if (customInc){
			degrees = customInc;
		}
		let group = new Group();
		let { cubeRefs, sceneRef } = state;

		cubeRefs.forEach((each, index) => {
			if (shouldAttach(each, index)){
				group.attach(each.current);
			}
		});
		sceneRef.current.attach(group);
		group.rotateOnWorldAxis(new Vector3(
			(axis === 'x') ? 1:0,
			(axis === 'y') ? 1:0,
			(axis === 'z') ? 1:0
		), MathUtils.degToRad((clockwise) ? degrees:-degrees));
		cubeRefs.forEach((each, index) => {
			if (shouldAttach(each, index)){
				let cubeID = state.positions[index];
				sceneRef.current.attach(each.current);
			}
		});
	}

	const generatePositions = (offset) => {
		let positions = [];
		for (let z = 1; z >= -1; z--){
			for (let y = 1; y >= -1; y--){
				for (let x = -1; x <= 1; x++){
					let pos = [x, y, z].map(e => e * (1 + offset));
					positions.push(pos);
				}
			}
		}
		return positions;
	}

	const getCubes = (offset) => {
		let pos = generatePositions(offset);
		return new Array(27).fill('empty').map(
			(each, index) => (
				<Cube position={pos[index]} ID={index} key={index} />
			)
		);
	}

	useEffect(() => {
		if (typeof dispatch === "function"){
			dispatch({ type: 'setSceneRef', payload: block });
		}
	}, [dispatch])

	return (
		<>
			<group ref={block} position={[0,0,0]} rotation={[0,0,0]/*[0.1,-0.6,0]*/}>
				{ getCubes(space.current) }
			</group>
		</>
	)
}

export default Rubiks