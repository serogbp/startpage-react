import { Modal } from "@mantine/core";
import { ContextModalProps } from "@mantine/modals";
import { useState } from "react";
import { WebFormMode } from "../../Types";
import WebForm from "../form/WebForm";

interface Props {
	mode: WebFormMode,
	category: string
}

export default function WebModal({ context, id, innerProps }: ContextModalProps<{ props:Props }>) {
	const [opened, setOpened] = useState(true)
	const { props } = innerProps
	const title = props.mode == WebFormMode.add? "New web" : "Edit web"

	return (
			<WebForm mode={props.mode} category={props.category} setOpened={setOpened} />
	)
}
