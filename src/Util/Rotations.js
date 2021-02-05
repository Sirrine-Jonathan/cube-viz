const rotatef = (n) => {
	let nn = Array.from(n);
	nn[0] = n[6];
	nn[1] = n[3];
	nn[2] = n[0];

	nn[3] = n[7];
	nn[4] = n[4];
	nn[5] = n[1];

	nn[6] = n[8];
	nn[7] = n[5];
	nn[8] = n[2];
	return nn;
}

const rotateF = (n) => {
	let nn = Array.from(n);
	nn[6] = n[0];
	nn[3] = n[1];
	nn[0] = n[2];

	nn[7] = n[3];
	nn[4] = n[4];
	nn[1] = n[5];
	
	nn[8] = n[6];
	nn[5] = n[7];
	nn[2] = n[8];
	return nn;
}

export {
	rotatef,
	rotateF
}