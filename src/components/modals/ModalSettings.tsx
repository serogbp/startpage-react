import { ContextModalProps } from "@mantine/modals"
import AppSettings from "../settings"


// export default function ModalSettings({ context, id, innerProps }: ContextModalProps<{ props: Props }>) {
export default function ModalSettings({ context, id }: ContextModalProps) {
	return (
		<AppSettings/>
	)
}
