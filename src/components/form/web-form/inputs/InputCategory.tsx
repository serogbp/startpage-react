import { Select } from "@mantine/core"
import { UseFormReturnType } from "@mantine/form"
import { useState } from "react"
import { WebFormValues } from "../../../../Types"

interface Props {
	formValues: UseFormReturnType<WebFormValues>
	categories: string[]
	hidden: boolean
	disabled: boolean
}

export default function InputCategory(props: Props) {
	const { formValues, categories, hidden, disabled } = props
	const [categoryData, setCategoryData] = useState<string[]>(categories)

	return (
		<div hidden={hidden}>
			<Select
				label="Category"
				disabled={disabled}
				placeholder="Pick one"
				data={categoryData}
				{...formValues.getInputProps('category')}
				required
				searchable
				creatable
				getCreateLabel={(query) => `Create ${query}`}
				onCreate={(query) => {
					setCategoryData([...categoryData, query])
					return { value: query, label: query }
				}}
			/>
		</div>
	)
}
