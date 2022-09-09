import { ContextModalProps } from "@mantine/modals"
import CategoryForm from "../form/CategoryForm"


export default function CategoryModal({ context, id, innerProps }: ContextModalProps) {
	return (
		<CategoryForm handleClose={() => context.closeModal(id)}/>
	)
}
