export interface Web {
	url: string,
	name: string,
	category: string,
	image: string,
	tags: string[],
	stats: WebStats,
	index: number,
}



export interface WebStats {
	timesClicked: number,
}



export interface Category {
	name: string,
	index: number,
}

export interface WebsByCategory {
	[key:string]: Web[]
}

export interface WebFilter {
	type: string,
	value: string,
}


export enum WebFormMode {
	add,
	update
}
