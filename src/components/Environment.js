import { useEffect, useState } from 'react';
import { useThree } from 'react-three-fiber'
import { CubeTextureLoader } from "three"

function Environment({path = './cube'}) {
	const { scene } = useThree();
	const [texture, setTexture] = useState();
	const loader = new CubeTextureLoader();
	
	useEffect(() => {
		// The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
		const texture = loader.load([
			`${path}/px.png`,
			`${path}/nx.png`,
			`${path}/py.png`,
			`${path}/ny.png`,
			`${path}/pz.png`,
			`${path}/nz.png`,
		]);
		setTexture(texture);
		scene.background = texture;
	}, [path])

	// Set the scene background property to the resulting texture.
	scene.background = texture;

	return null;
}

export default Environment;