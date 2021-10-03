export interface SimState {
	x: number;
	y: number;
	dir: {
		up: boolean;
		down: boolean;
		left: boolean;
		right: boolean;
	}
}

export interface SimInput {
	up?: boolean;
	down?: boolean;
	left?: boolean;
	right?: boolean;
}
