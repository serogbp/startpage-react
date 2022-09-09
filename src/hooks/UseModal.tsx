import { openContextModal } from "@mantine/modals"
import { Web, WebFormMode } from "../Types"


export const useModal = {

	webAdd: (mode: WebFormMode.add, category: string, web: Web) => {
		openContextModal({
			title: "New web",
			modal: "webForm",
			centered: true,
			trapFocus: true,
			innerProps: {
				props: {
					mode: WebFormMode.add,
					category: category,
					web: web
				}
			}
		})
	},

	webEdit: (mode: WebFormMode.update, category: string, web: Web) => {
		openContextModal({
			title: "Edit web",
			modal: "webForm",
			centered: true,
			trapFocus: true,
			innerProps: {
				props: {
					mode: WebFormMode.update,
					category: category,
					web: web
				}
			}
		})
	},

	category: () => {
		openContextModal({
			title: "New Category",
			modal: "categoryForm",
			trapFocus: true,
			innerProps: {}
		})
	},

	settings: () => {
		openContextModal({
			title: "Settings",
			modal: "settings",
			centered: true,
			trapFocus: true,
			innerProps: {},
			size: "xl"
		})
	}
}
