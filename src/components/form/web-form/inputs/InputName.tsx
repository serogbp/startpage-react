import { TextInput } from "@mantine/core"
import { UseFormReturnType } from "@mantine/form"
import { WebFormValues } from "../../../../Types"

interface Props {
	formValues: UseFormReturnType<WebFormValues>
}

export default function InputName(props: Props) {
	const { formValues } = props

	return (
		<TextInput
			label="Name"
			required
			placeholder="Example"
			{...formValues.getInputProps('name')}
			style={{ width: "100%" }}
		/>
	)
}
