// moves according to this source
// https://ruwix.com/the-rubiks-cube/notation/

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

const rotateb = (n) => {
	let nn = Array.from(n);
	nn[18] = n[20];
	nn[19] = n[23];
	nn[20] = n[26];

	nn[21] = n[19];
	nn[22] = n[22];
	nn[23] = n[25];
	
	nn[24] = n[18];
	nn[25] = n[21];
	nn[26] = n[24];
	return nn;
}

const rotateB = (n) => {
	let nn = Array.from(n);
	nn[20] = n[18];
	nn[23] = n[19];
	nn[26] = n[20];

	nn[19] = n[21];
	nn[22] = n[22];
	nn[25] = n[23];
	
	nn[18] = n[24];
	nn[21] = n[25];
	nn[24] = n[26];
	return nn;
}

const rotates = (n) => {
	let nn = Array.from(n);
	nn[9] = n[15];
	nn[10] = n[12];
	nn[11] = n[9];

	nn[12] = n[16];
	nn[13] = n[13];
	nn[14] = n[10];
	
	nn[15] = n[17];
	nn[16] = n[14];
	nn[17] = n[11];
	return nn;
}

const rotateS = (n) => {
	let nn = Array.from(n);
	nn[15] = n[9];
	nn[12] = n[10];
	nn[9] = n[11];

	nn[16] = n[12];
	nn[13] = n[13];
	nn[10] = n[14];
	
	nn[17] = n[15];
	nn[14] = n[16];
	nn[11] = n[17];
	return nn;
}

const rotateu = (n) => {
	let nn = Array.from(n);
	nn[0] = n[2];
	nn[1] = n[11];
	nn[2] = n[20];

	nn[9] = n[1];
	nn[10] = n[10];
	nn[11] = n[19];
	
	nn[18] = n[0];
	nn[19] = n[9];
	nn[20] = n[18];
	return nn;
}

const rotateU = (n) => {
	let nn = Array.from(n);
	nn[2] = n[0];
	nn[11] = n[1];
	nn[20] = n[2];

	nn[1] = n[9];
	nn[10] = n[10];
	nn[19] = n[11];
	
	nn[0] = n[18];
	nn[9] = n[19];
	nn[18] = n[20];
	return nn;
}

const rotated = (n) => {
	let nn = Array.from(n);
	nn[6] = n[24];
	nn[7] = n[15];
	nn[8] = n[6];

	nn[15] = n[25];
	nn[16] = n[16];
	nn[17] = n[7];
	
	nn[24] = n[26];
	nn[25] = n[17];
	nn[26] = n[8];
	return nn;
}

const rotateD = (n) => {
	let nn = Array.from(n);
	nn[24] = n[6];
	nn[15] = n[7];
	nn[6] = n[8];

	nn[25] = n[15];
	nn[16] = n[16];
	nn[7] = n[17];
	
	nn[26] = n[24];
	nn[17] = n[25];
	nn[8] = n[26];
	return nn;
}

const rotatee = (n) => {
	let nn = Array.from(n);
	nn[3] = n[21];
	nn[4] = n[12];
	nn[5] = n[3];

	nn[12] = n[22];
	nn[13] = n[13];
	nn[14] = n[4];
	
	nn[21] = n[23];
	nn[22] = n[14];
	nn[23] = n[5];
	return nn;
}

const rotateE = (n) => {
	let nn = Array.from(n);
	nn[21] = n[3];
	nn[12] = n[4];
	nn[3] = n[5];

	nn[22] = n[12];
	nn[13] = n[13];
	nn[4] = n[14];
	
	nn[23] = n[21];
	nn[14] = n[22];
	nn[5] = n[23];
	return nn;
}

const rotatel = (n) => {
	let nn = Array.from(n);
	nn[0] = n[18];
	nn[3] = n[9];
	nn[6] = n[0];

	nn[9] = n[21];
	nn[12] = n[12];
	nn[15] = n[3];
	
	nn[18] = n[24];
	nn[21] = n[15];
	nn[24] = n[6];
	return nn;
}

const rotateL = (n) => {
	let nn = Array.from(n);
	nn[18] = n[0];
	nn[9] = n[3];
	nn[0] = n[6];

	nn[21] = n[9];
	nn[12] = n[12];
	nn[3] = n[15];
	
	nn[24] = n[18];
	nn[15] = n[21];
	nn[6] = n[24];
	return nn;
}

const rotater = (n) => {
	let nn = Array.from(n);
	nn[2] = n[8];
	nn[11] = n[5];
	nn[20] = n[2];

	nn[5] = n[17];
	nn[14] = n[14];
	nn[23] = n[11];
	
	nn[8] = n[26];
	nn[17] = n[23];
	nn[26] = n[20];
	return nn;
}

const rotateR = (n) => {
	let nn = Array.from(n);
	nn[8] = n[2];
	nn[5] = n[11];
	nn[2] = n[20];

	nn[17] = n[5];
	nn[14] = n[14];
	nn[11] = n[23];
	
	nn[26] = n[8];
	nn[23] = n[17];
	nn[20] = n[26];
	return nn;
}

const rotatem = (n) => {
	let nn = Array.from(n);
	nn[1] = n[19];
	nn[10] = n[22];
	nn[19] = n[25];

	nn[4] = n[10];
	nn[13] = n[13];
	nn[22] = n[16];
	
	nn[7] = n[1];
	nn[16] = n[4];
	nn[25] = n[7];
	return nn;
}

const rotateM = (n) => {
	let nn = Array.from(n);
	nn[19] = n[1];
	nn[22] = n[10];
	nn[25] = n[19];

	nn[10] = n[4];
	nn[13] = n[13];
	nn[16] = n[22];
	
	nn[1] = n[7];
	nn[4] = n[16];
	nn[7] = n[25];
	return nn;
}

const moves = {
	'f':{
		mainAxis: 'z',
		order: 2,
		operation: rotatef,
		positions: [0,1,2,3,4,5,6,7,8]
	},
	'F':{
		mainAxis: 'z',
		order: 2,
		operation: rotateF
	},
	'b':{
		mainAxis: 'z',
		operation: rotateb,
		positions: [18,19,20,21,22,23,24,25,26]
	},
	'B':{
		mainAxis: 'z',
		operation: rotateB
	},
	's':{
		mainAxis: 'z',
		operation: rotates,
		positions: [9,10,11,12,13,14,15,16,17]
	},
	'S':{
		mainAxis: 'z',
		operation: rotateS
	},
	'u':{
		mainAxis: 'y',
		operation: rotateu,
		positions: [0,1,2,9,10,11,18,19,20]
	},
	'U':{
		mainAxis: 'y',
		operation: rotateU
	},
	'd':{
		mainAxis: 'y',
		operation: rotated,
		positions: [6,7,8,15,16,17,24,25,26]
	},
	'D':{
		mainAxis: 'y',
		operation: rotateD
	},
	'e':{
		mainAxis: 'y',
		operation: rotatee,
		positions: [3,4,5,12,13,14,21,22,23]
	},
	'E':{
		mainAxis: 'y',
		operation: rotateE
	},
	'l':{
		mainAxis: 'x',
		operation: rotatel,
		positions: [0,9,18,3,12,21,6,15,24]
	},
	'L':{
		mainAxis: 'x',
		operation: rotateL
	},
	'r':{
		mainAxis: 'x',
		operation: rotater,
		positions: [2,11,20,5,14,23,8,17,26]
	},
	'R':{
		mainAxis: 'x',
		operation: rotateR
	},
	'm': {
		mainAxis: 'x',
		operation: rotatem,
		positions: [1,10,19,4,13,22,7,16,25]
	},
	'M': {
		mainAxis: 'x',
		operation: rotateM
	}
}

export {
	moves
}