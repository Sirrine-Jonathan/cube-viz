import React, { useContext} from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { Plane, OrbitControls } from '@react-three/drei'
import { AppDispatchContext, AppStateContext } from '../State/context'
import ControlDisplay from './ControlDisplay'
import Environment from './Environment'
import useWindowSize from '../Hooks/useWindowSize';

function Scene({
	children,
	displayControls = false,
	displayEnvironment = false,
	displayFloor = false
}){
	const v = useContext(AppStateContext);
	const d = useContext(AppDispatchContext);
	const { windowWidth } = useWindowSize();

	let skyboxes = Array(10).fill(null);
	skyboxes[1] = './space';
	skyboxes[2] = './cube';

	const onCanvasCreated = ({ gl, scene }) => {
		gl.toneMapping = THREE.ACESFilmicToneMapping
		gl.outputEncoding = THREE.sRGBEncoding
		scene.background = new THREE.Color('#000')
	}

	return (
		<Canvas
			camera={{ position: [0,4,6], fov: 90, near: 1, far: 60 }}
			gl={{ antialias: false, alpha: false }}
			shadowMap
			colorManagement
			onCreated={onCanvasCreated}
		>
			<AppStateContext.Provider value={v}>
				<AppDispatchContext.Provider value={d}>
					{ (windowWidth > 20) ? (
						<OrbitControls
							enableDamping
							enableZoom={(windowWidth > 800)}
							enablePan={(windowWidth > 800)}
							dampingFactor={0.5}
							rotateSpeed={(windowWidth > 800) ? 0.8:0.4}
							onChange={(e) => {
								//e.target.update();
								console.log(e);
								console.log('distance', e.target.getDistance());
								console.log('polar angle', e.target.getPolarAngle());
								console.log('azimuthal angle', e.target.getAzimuthalAngle());
								console.log(e.target.object);
								console.log('roation_(x,y,z)', `${e.target.object.rotation._x},${e.target.object.rotation._y},${e.target.object.rotation._z}`);
								console.log('position_(x,y,z)', `${e.target.object.position.x},${e.target.object.position.y},${e.target.object.position.z}`);
							}}
							// minPolarAngle={Math.PI / 3.5}
							// maxPolarAngle={Math.PI / 1.5}
						/>
					):null}
					<ambientLight intensity={0.5}/>
					<directionalLight
						intensity={1}
						castShadow
						shadow-mapSize-height={512}
						shadow-mapSize-width={512}
					/>
					{children}
					{(displayEnvironment) ? (
						<Environment path={skyboxes[v.skybox]} />
					):null}
					{(displayFloor) ? (<Plane
						receiveShadow
						rotation={[-Math.PI / 2, 0, 0]}
						position={[0, -10, 0]}
						args={[1000, 1000]}
					>
						<meshLambertMaterial attach="material" color="#9e5c4c" />
					</Plane>):null}
					{(displayControls) ? (
						<ControlDisplay v={v} />
					):null}
				</AppDispatchContext.Provider>
			</AppStateContext.Provider>
		</Canvas>
	)
}

export default Scene