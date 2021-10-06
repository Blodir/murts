export interface SimState {
	pcs: {
		[id: string]: {
			x: number;
			y: number;
			dir: {
				up: boolean;
				down: boolean;
				left: boolean;
				right: boolean;
			}
		}
	};
}

export interface SimInputWrapper {
	type: 'join' | 'leave' | 'move';
	data?: MoveInput;
}

export interface MoveInput {
	up?: boolean;
	down?: boolean;
	left?: boolean;
	right?: boolean;
}
