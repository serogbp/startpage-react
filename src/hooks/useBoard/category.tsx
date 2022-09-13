import { JsonContent, Web } from "../../Types";
import { defaultCategory } from "./UseBoard";


export interface BoardCategory {
	add: (categoryName: string) => void
	updateName: (oldName: string, newName: string) => void
	getName: (web: Web) => string

}


export function boardCategory(state: JsonContent, setState: (val: JsonContent | ((prevState: JsonContent) => JsonContent)) => void): BoardCategory {
	const add = (categoryName: string) => {
		setState({
			...state,
			categories: {
				...state.categories,
				[categoryName]: {
					...defaultCategory,
					id: categoryName
				}
			}
		});
	};

	const updateName = (oldName: string, newName: string) => {
		const newCategories = {
			...state.categories,
			[newName]: {
				...state.categories[oldName],
				id: newName
			}
		};

		delete newCategories[oldName];

		setState({
			...state,
			categories: { ...newCategories }
		});
	};


	const getName = (web: Web) => Object.values(state.categories).find(category => web.id in category.webIds)?.id || "";


	return {
		add, updateName, getName
	};
};
