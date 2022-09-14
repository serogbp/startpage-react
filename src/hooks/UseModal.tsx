import { openContextModal } from "@mantine/modals"
import { Web, WebFormMode } from "../Types"


export const useModal = {

	webAdd: () => {
		openContextModal({
			title: "New web",
			modal: "webForm",
			trapFocus: true,
			innerProps: {
				props: {
					mode: WebFormMode.add,
					isModal: true
				}
			}
		})
	},

	webEdit: (web: Web, category: string) => {
		openContextModal({
			title: "Edit web",
			modal: "webForm",
			trapFocus: true,
			innerProps: {
				props: {
					mode: WebFormMode.update,
					category: category,
					web: web,
					isModal: true
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
			trapFocus: true,
			innerProps: {},
			size: "xl"
		})
	}
}
