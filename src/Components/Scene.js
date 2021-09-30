import React, { useContext, useRef, useMemo, useReducer } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Plane, OrbitControls } from '@react-three/drei'
import { AppDispatchContext, AppStateContext, DefaultState, reducer } from '../State/context'
import ControlDisplay from './ControlDisplay'
import Environment from './Environment';
import useWindowSize from '../Hooks/useWindowSize';


function Scene(props){

	const onCanvasCreated = ({ gl, scene }) => {
		gl.toneMapping = THREE.ACESFilmicToneMapping
		gl.outputEncoding = THREE.sRGBEncoding
		scene.background = new THREE.Color('#000')
	}

	return (
		<Canvas
			camera={{ position: [0,4,6], fov: 90, near: 1, far: 60, rotation: [0,0,0] }}
			gl={{ antialias: false, alpha: false }}
			shadowMap
			colorManagement
			onCreated={onCanvasCreated}
		>
			<SceneInner {...props} />
		</Canvas>
	)
}

const SceneInner = ({
	children,
	displayControls = false,
	displayEnvironment = false,
	displayFloor = false,
	onSectionChange
}) => {

	const state = useContext(AppStateContext);
	const dispatch = useContext(AppDispatchContext);
	const { windowWidth } = useWindowSize();
	const controls = useRef();
	const sectionRef = useRef(0);
	const updateSectionOnNext = useRef(false);

	let skyboxes = Array(10).fill(null);
	skyboxes[1] = './space';
	skyboxes[2] = './cube';

	const onOrbitControlsChange = (e) => {
		let azi = e.target.getAzimuthalAngle();
		const total = Math.PI * 2;

		// get the offset
		const section_width = Math.PI * 2 / 4;
		let offset = section_width / 2;
		let azi_adj = azi + Math.PI + offset;

		// wrap
		let azi_adj_wrap;
		if (azi_adj - Math.PI < 0){
			azi_adj_wrap = total - Math.PI + azi_adj;
		} else {
			azi_adj_wrap = azi_adj - Math.PI;
		}
		const section = Math.floor(azi_adj_wrap / section_width);

		if (sectionRef.current !== section){
			sectionRef.current = section;
			console.log('new section', section);
			updateSectionOnNext.current = true;
		}
	}

	useFrame(() => {
		if (updateSectionOnNext.current){
			console.log('update section triggered');
			onSectionChange(sectionRef.current);
			updateSectionOnNext.current = false;
		}
	})

	return (
		<AppStateContext.Provider value={state}>
			<AppDispatchContext.Provider value={dispatch}>
				<ambientLight intensity={0.5} />
				<directionalLight
					intensity={1}
					castShadow
					shadow-mapSize-height={512}
					shadow-mapSize-width={512}
				/>
				<OrbitControls
					enableDamping
					enableZoom={(windowWidth > 800) || true}
					enablePan={(windowWidth > 800)}
					dampingFactor={0.5}
					rotateSpeed={(windowWidth > 800) ? 0.8:0.4}
					ref={controls}
					onChange={onOrbitControlsChange}
					// minPolarAngle={Math.PI / 3.5}
					// maxPolarAngle={Math.PI / 1.5}
				/>
				{ children }
				{(displayEnvironment) ? (
					<Environment path={skyboxes[state.skybox]} />
				):null}
				{(displayFloor) ? (<Plane
					receiveShadow
					rotation={[-Math.PI / 2, 0, 0]}
					position={[0, -20, 0]}
					args={[1000, 1000]}
				>
					<meshPhongMaterial attach="material" color="#9e5c4c" />
				</Plane>):null}
				{(displayControls) ? (
					<ControlDisplay state={state} />
				):null}
			</AppDispatchContext.Provider>
		</AppStateContext.Provider>
	)
}

export default Scene