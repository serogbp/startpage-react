import { JsonContent, JsonContentDeprecated, Web } from "../../Types";
import onlyUnique, { download } from "../../utils/utils";
import { defaultWeb } from "./UseBoard";

const WEBS = 'webs'


export interface BoardJson {
	exportFile: () => void
    importFile: (json: File) => Promise<unknown>
}


export function boardJson (state: JsonContent, setState: (val: JsonContent | ((prevState: JsonContent) => JsonContent)) => void) : BoardJson {
	const exportFile = () => {
		const date = new Date();
		// File name format yyyy-mm-dd-startpage.json
		const fileName = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "-startpage.json";
		const data = localStorage.getItem(WEBS);
		download(data, fileName, "text/plain");
	};


	const importFile = (json: File) => {
		return new Promise((resolve, reject) => {
			json.text().then((value) => {
				// Coger localhost actual, si no hay se coge un valor por defecto
				const lsWebs = localStorage.getItem(WEBS);
				let currentWebs: JsonContent = lsWebs ? JSON.parse(lsWebs) : defaultWeb;

				const importedJson = JSON.parse(value);
				// Mirar si el json importado es de la version pre-react de startpage
				// const websToImport = Object.hasOwn(importedJson, "jsonVersion") ? importedJson : convertJsonToNewFormat(importedJson, maxIndex)
				// Es JSON de versión actual
				if (Object.hasOwn(importedJson, "jsonVersion")) {
					const websToImport = importedJson as JsonContent;
					// Merge favoreciendo los datos de las webs que ya había
					const newState = {
						...currentWebs,
						webs: { ...currentWebs.webs, ...websToImport.webs },
						categories: { ...currentWebs.categories, ...websToImport.categories },
						categoryOrder: [...currentWebs.categoryOrder, ...websToImport.categoryOrder],
					};
					localStorage.setItem(WEBS, JSON.stringify(newState));
					setState(newState);
					resolve("");
				}

				// Es JSON versión pre-react
				else {
					// Número de index mayor del array de webs
					const maxIndex = Math.max(...currentWebs.webs.map(web => web.id));

					let websToImport = importedJson as JsonContentDeprecated[];
					// Quitar urls duplicados
					websToImport = websToImport.filter(x => !(x.url in currentWebs.webs.map(y => y.url)));

					// Añadir categorías del json deprecado, después filtrar valores únicos
					const newCategoryOrder = [...currentWebs.categoryOrder, ...websToImport.map(web => web.category)].filter(onlyUnique);

					const newCategories = { ...currentWebs.categories };
					// Añadir categorías del json deprecado que no existan en el actual
					newCategoryOrder.forEach(category => {
						if (!currentWebs.categories.hasOwnProperty(category)) {
							newCategories[category] = {
								id: category,
								webIds: []
							};
						}
					});

					const newWebs = [...currentWebs.webs];

					// Para cada nueva web:
					// Añadir el id al objeto correspondiente dentro de newCategories
					// Añadir la web al array de newWebs
					websToImport.forEach((web, i) => {
						const newWeb: Web = {
							...defaultWeb,
							id: i + 1 + maxIndex,
							url: web.url
						};
						newCategories[web.category].webIds.push(newWeb.id);
						newWebs.push(newWeb);
					});

				}
			});
		});
	};


	return {
		exportFile, importFile
	};
};
