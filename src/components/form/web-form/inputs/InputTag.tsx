import { MultiSelect } from "@mantine/core"
import { UseFormReturnType } from "@mantine/form"
import { useState } from "react"
import { WebFormValues } from "../../../../Types"

interface Props {
	formValues: UseFormReturnType<WebFormValues>
	tags: string[]
}

export default function InputTag(props: Props) {
	const { formValues, tags } = props
	const [tagsData, setTagsData] = useState<string[]>(tags)

	return (
		<MultiSelect
			label="Tags"
			placeholder="Pick one or more"
			data={tagsData}
			{...formValues.getInputProps('tags')}
			searchable
			clearable
			creatable
			getCreateLabel={(query) => `Create ${query}`}
			onCreate={(query) => {
				setTagsData([...tagsData, query])
				return { value: query, label: query }
			}}
		/>
	)
}
