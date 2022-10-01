export interface JsonContent {
	webs: Web[],
	categories: {
		[key:string]: Category
	},
	categoryOrder: string[],
	jsonVersion: number
}


export interface JsonContentDeprecated {
	name: string,
	category: string,
	url: string
}


export interface Web {
	id: number,
	url: string,
	name: string,
	// category: string,
	// image: string,
	tags: string[],
	stats: WebStats,
	// index: number,
}


export interface WebStats {
	timesClicked: number,
	lastClickTimestamp: number
}


export interface Category {
	id: string,
	webIds: number[],
}

export interface WebsByCategory {
	columnOrder: string[],
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


export interface MyColor {
	name: string,
	value: string
}
