import { Button, FocusTrap, Group, MultiSelect, Select, Stack, Text, TextInput, UnstyledButton, useMantineTheme } from "@mantine/core"
import { useForm } from "@mantine/form"
import { memo, useEffect, useState } from "react"
import { UseWebs } from "../../hooks/UseWebs"
import { Web, WebFormMode } from "../../Types"
import { getDomain, urlRegex } from "../../utils/utils"
import { DeleteButtonTooltip } from "./DeleteButtonToolTip"
import signalJs from 'signal-js'
import Signals from "../../Signals"

interface Props {
	web?: Web,
	category?: string,
	mode: WebFormMode,
	closeModal: Function
}

interface FormValues {
	url: string,
	name: string,
	category: string,
	tags: string[]
}


const WebForm = memo((props: Props) => {
	const webHook = UseWebs()
	const [categoryData, setCategoryData] = useState<string[]>(webHook.getWebs().categoryOrder)
	const [tagsData, setTagsData] = useState<string[]>(webHook.getUniqueTags())
	const [mode, setMode] = useState(props.mode)
	const theme = useMantineTheme()


	// Al pulsar en el boton, pasas a modificar en el formulario la web duplicada
	const duplicateMessage = (duplicateWeb: Web, category: string) => {
		return (
			<>
				<Text>
					Already exists in the category {category}.
				</Text>
				<UnstyledButton
					onClick={(event: any) => {
						event.preventDefault()
						setMode(WebFormMode.update)
						// setWeb(duplicateWeb)
					}}
					style={{
						color: theme.colors.blue[5],
						textDecoration: 'underline'
					}}>
					Do you want to modify it instead?
				</UnstyledButton>
			</>
		)
	}

	const closeForm = () => {
		// if (Object.entries(formValues.errors).length === 0) props.setOpened(false)
	}

	const formValues = useForm<FormValues>({
		initialValues: {
			url: props.web ? props.web.url : "" ,
			name: props.web ? props.web.name : "" ,
			category: props.category ? props.category : "",
			tags: props.web ? props.web.tags : [] ,
		},

	})

	const onBlurInputUrl = () => {
		if (formValues.values.url !== "")
			autoCompleteInputName()
	}
	const autoCompleteInputName = () => {
		const { url, name } = formValues.values
		if (urlRegex.test(url) && name === '') {
			formValues.setFieldValue('name', getDomain(url))
		}
	}


	const handleAdd = () => {
		formValues.validate()
		if (Object.keys(formValues.errors).length !== 0) return


		// TODO check duplicate
		// TODO si hay duplicate, mostrar error
		const web: Web = {
			id: 0,
			url: formValues.values.url,
			name: formValues.values.name,
			tags: formValues.values.tags,
		}

		signalJs.emit(Signals.addWeb, web, formValues.values.category)
		props.closeModal()
	}


	const handleUpdate = () => {
		const oldWeb = props.web
		const newWeb: Web = {
			id: oldWeb?.id || 0,
			url: formValues.values.url,
			name: formValues.values.name,
			tags: formValues.values.tags,
		}
		const oldCategory = props.category
		const newCategory = formValues.values.category
		signalJs.emit(Signals.updateWeb, newWeb, oldWeb, newCategory, oldCategory)
		props.closeModal()
	}


	const handleDelete = () => {
		signalJs.emit(Signals.deleteWeb, props.web, props.category)
		props.closeModal()
	}


	const handleSubmit = (event: any) => {
		event.preventDefault()
		switch (mode) {
			case WebFormMode.add:
				handleAdd()
				break;
			case WebFormMode.update:
				handleUpdate()
				break;
			default:
				break;
		}
	}

	return (
		<form onSubmit={formValues.onSubmit((values, event) => handleSubmit(event))}>
			<Stack spacing='xs'>
				<FocusTrap active={true}>
					<TextInput
						label="Url"
						type="url"
						required
						placeholder="https://www.example.com"
						{...formValues.getInputProps('url')}
						onBlur={() => onBlurInputUrl()}
						data-autofocus
					/>

					<TextInput
						label="Name"
						required
						placeholder="Example"
						{...formValues.getInputProps('name')}
					/>
					<Select
						label="Category"
						disabled={props.category && mode === WebFormMode.add ? true : false}
						placeholder="Pick one"
						data={categoryData}
						{...formValues.getInputProps('category')}
						required
						searchable
						getCreateLabel={(query) => `Create ${query}`}
						onCreate={(query) => setCategoryData([...categoryData, query])}
					/>
					<MultiSelect
						label="Tags"
						placeholder="Pick all tags you like"
						data={tagsData}
						{...formValues.getInputProps('tags')}
						searchable
						clearable
						getCreateLabel={(query) => `Create ${query}`}
						onCreate={(query) => setTagsData([...tagsData, query])}
					/>

					<Group position="apart" mt='md' hidden={mode !== WebFormMode.update}>
						<DeleteButtonTooltip clicksRemaining={2} handleDelete={() => handleDelete()} />
						<Button onClick={() => handleUpdate()}>Update web</Button>
					</Group>

					<Group position="apart" mt='md' hidden={mode !== WebFormMode.add}>
						{/* <Button onClick={() => handleAdd()}>Add new web</Button> */}
						<Button type="submit">Add new web</Button>
					</Group>
				</FocusTrap>
			</Stack>
		</form>
	)
})


export default WebForm
