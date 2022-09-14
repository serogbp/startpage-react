import { ContextModalProps } from "@mantine/modals"
import { Web, WebFormMode } from "../../Types"
import WebForm from "../form/WebForm"

interface Props {
	mode: WebFormMode,
	category: string,
	web?: Web,
	isModal: boolean
}

export default function WebModal({ context, id, innerProps }: ContextModalProps<{ props:Props }>) {
	const { props } = innerProps
	return (
			<WebForm handleClose={() => context.closeModal(id)} web={props.web} mode={props.mode} category={props.category} isModal={props.isModal}/>
	)
}
