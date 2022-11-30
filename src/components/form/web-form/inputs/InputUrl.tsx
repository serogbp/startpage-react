import { TextInput } from "@mantine/core"
import { UseFormReturnType } from "@mantine/form"
import { WebFormValues } from "../../../../Types"
import { getDomainName, urlRegex } from "../../../../utils/utils"

interface Props {
	formValues: UseFormReturnType<WebFormValues>
}

export default function InputUrl(props: Props) {
	const { formValues } = props


	function autoCompleteInputName() {
		// Auto completar en input Name (con el dominio de la url) si está vacío y el input Url no
		formValues.validateField("url")
		if (formValues.values.url !== "") {
			const { url, name } = formValues.values
			if (urlRegex.test(url) && name === '')
				formValues.setFieldValue('name', getDomainName(url))
		}
	}


	return (
		<TextInput
			label="Url"
			type="url"
			required
			placeholder="https://www.example.com"
			{...formValues.getInputProps('url')}
			data-autofocus
			style={{ width: "100%" }}
			onBlur={() => {autoCompleteInputName()}} />
	)
}
