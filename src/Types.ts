
export interface JsonContent {
	webs: Web[],
	categories: {
		[key:string]: Category
	},
	categoryOrder: string[]
}

export interface Web {
	id: number,
	url: string,
	name: string,
	// category: string,
	// image: string,
	tags: string[],
	// stats: WebStats,
	// index: number,
}



export interface WebStats {
	timesClicked: number,
}



export interface Category {
	id: string,
	webIds: number[],
}

export interface WebsByCategory {
	columnOrder: String[],
	columns: column[]
}

export interface column {
	[key:string]: Web[]
}

export interface WebFilter {
	type: string,
	value: string,
}

export interface WebFormValues {
	url: string,
	name: string,
	category: string,
	tags: string[]
}

export enum WebFormMode {
	add,
	update
}
