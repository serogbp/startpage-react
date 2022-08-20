import { Tabs } from "@mantine/core"
import { ContextModalProps } from "@mantine/modals"
import { MessageCircle, Photo, Settings } from "tabler-icons-react"
import AppSettings from "../settings"


// export default function ModalSettings({ context, id, innerProps }: ContextModalProps<{ props: Props }>) {
export default function ModalSettings({ context, id }: ContextModalProps) {
	return (
		<AppSettings/>
	)
}
