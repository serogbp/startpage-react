import { ContextModalProps } from "@mantine/modals"
import CategoryFormAdd from "../form/CategoryFormAdd"


export default function CategoryModal({ context, id, innerProps }: ContextModalProps) {
	return (
		<CategoryFormAdd handleClose={() => context.closeModal(id)}/>
	)
}
