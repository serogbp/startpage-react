import { Select } from "@mantine/core"
import { UseFormReturnType } from "@mantine/form"
import { WebFormValues, WebIconType } from "../../../../Types"

interface Props {
	formValues: UseFormReturnType<WebFormValues>
}

export default function InputIconType(props: Props) {
	const { formValues } = props

	return (
		<Select
			label="Icon type"
			data={Object.values(WebIconType)}
			{...formValues.getInputProps('iconType')}
		/>
	)
}
