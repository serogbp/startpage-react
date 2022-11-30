import { Select, TextInput, useMantineTheme } from "@mantine/core"
import { UseFormReturnType } from "@mantine/form"
import { WebFormValues } from "../../../../Types"
import SelectItemComponent_Color from "../../../common/form/SelectItemComponent_Color"

interface Props {
	formValues: UseFormReturnType<WebFormValues>
}

export default function InputStringIcon(props: Props) {
	const { formValues } = props
	const theme = useMantineTheme()

	// Usa los valores hex para el texto (usando sx)
	const textColors = [
		{ label: "Black", value: theme.colors.dark[5], colorSwatch: theme.colors.dark[5] },
		{ label: "White", value: theme.colors.gray[0], colorSwatch: theme.colors.gray[0] },
		{ label: "Gray", value: theme.colors.gray[5], colorSwatch: theme.colors.gray[5] },
		{ label: "Red", value: theme.colors.red[5], colorSwatch: theme.colors.red[5] },
		{ label: "Pink", value: theme.colors.pink[5], colorSwatch: theme.colors.pink[5] },
		{ label: "Grape", value: theme.colors.grape[5], colorSwatch: theme.colors.grape[5] },
		{ label: "Violet", value: theme.colors.violet[5], colorSwatch: theme.colors.violet[5] },
		{ label: "Indigo", value: theme.colors.indigo[5], colorSwatch: theme.colors.indigo[5] },
		{ label: "Blue", value: theme.colors.blue[5], colorSwatch: theme.colors.blue[5] },
		{ label: "Cyan", value: theme.colors.cyan[5], colorSwatch: theme.colors.cyan[5] },
		{ label: "Teal", value: theme.colors.teal[5], colorSwatch: theme.colors.teal[5] },
		{ label: "Green", value: theme.colors.green[5], colorSwatch: theme.colors.green[5] },
		{ label: "Lime", value: theme.colors.lime[5], colorSwatch: theme.colors.lime[5] },
		{ label: "Yellow", value: theme.colors.yellow[5], colorSwatch: theme.colors.yellow[5] },
		{ label: "Orange", value: theme.colors.orange[5], colorSwatch: theme.colors.orange[5] },
	]

	// Usa MantineDefaultColor para el color del componente Avatar
	const backgroundColors = [
		{ label: "Black", value: "dark", colorSwatch: theme.colors.dark[5] },
		{ label: "Gray", value: "gray", colorSwatch: theme.colors.gray[5] },
		{ label: "Red", value: "red", colorSwatch: theme.colors.red[5] },
		{ label: "Pink", value: "pink", colorSwatch: theme.colors.pink[5] },
		{ label: "Grape", value: "grape", colorSwatch: theme.colors.grape[5] },
		{ label: "Violet", value: "violet", colorSwatch: theme.colors.violet[5] },
		{ label: "Indigo", value: "indigo", colorSwatch: theme.colors.indigo[5] },
		{ label: "Blue", value: "blue", colorSwatch: theme.colors.blue[5] },
		{ label: "Cyan", value: "cyan", colorSwatch: theme.colors.cyan[5] },
		{ label: "Teal", value: "teal", colorSwatch: theme.colors.teal[5] },
		{ label: "Green", value: "green", colorSwatch: theme.colors.green[5] },
		{ label: "Lime", value: "lime", colorSwatch: theme.colors.lime[5] },
		{ label: "Yellow", value: "yellow", colorSwatch: theme.colors.yellow[5] },
		{ label: "Orange", value: "orange", colorSwatch: theme.colors.orange[5] },
	]

	return (
		<>
			<TextInput
				label="Icon text"
				type="text"
				placeholder="Max 3 characters"
				{...formValues.getInputProps('stringIconText')}
				sx={{ width: "100%" }}
			/>

			<Select
				label="Text color"
				data={textColors}
				itemComponent={SelectItemComponent_Color}
				{...formValues.getInputProps('stringIconTextColor')}
			/>

			<Select
				label="Background color"
				data={backgroundColors}
				itemComponent={SelectItemComponent_Color}
				{...formValues.getInputProps('stringIconBackground')}
			/>
		</>
	)
}
