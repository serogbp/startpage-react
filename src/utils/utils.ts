// Elimina duplicados de un array

import { Web } from "../Types"

// Uso: array.filter(onlyUnique)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function onlyUnique(value: any, index: any, self: any) {
	return self.indexOf(value) === index
}

// Temporizador
// Ejemplo: sleep(200).then(() => { tu código })
export const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))


export const urlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)/
export const domainRegex = /^(?:https?:\/\/)?(?:[^@/\n]+@)?(?:www\.)?([^.:/?\n]+)?/
// export const urlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/
// export const domainRegex = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^.:\/?\n]+)?/
// TODO borrar comentario

export const capitalizeFirstLetter = (value: string): string => {
	return value.charAt(0).toUpperCase() + value.slice(1)
}


export const getDomain = (url: string): string => {
	const match = url.match(domainRegex)
	if (match) return capitalizeFirstLetter(match[1])
	return ''
}


// Cambia el index de un elemento dentro de un array
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const arrayMove = (arr: Array<any>, old_index: number, new_index: number) => {
	arr.splice(new_index, 0, arr.splice(old_index, 1)[0])
}


// Comprueba si 2 arrays tienen los mismos items
export const arrayCompare = ((_arr1: Web[], _arr2: Web[]) => {
	if (
		!Array.isArray(_arr1)
		|| !Array.isArray(_arr2)
		|| _arr1.length !== _arr2.length
	) {
		return false
	}

	// .concat() to not mutate arguments
	const arr1 = _arr1.concat()
	const arr2 = _arr2.concat()

	for (let i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) {
			return false
		}
	}
	return true
})


export function download(content: string, fileName: string, contentType: string) {
	const a = document.createElement("a")
	const file = new Blob([content], { type: contentType })
	a.href = URL.createObjectURL(file)
	a.download = fileName
	a.click()
	URL.revokeObjectURL(a.href)
}
