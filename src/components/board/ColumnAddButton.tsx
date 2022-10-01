import { Button, Card, useMantineTheme, createStyles } from "@mantine/core"
import { Plus } from "tabler-icons-react"
import { useModal } from "../../hooks/UseModal"
import { useSettings } from "../../hooks/UseSettings"



interface PropsStyle {
	backgroundColor: string,
	width: number
}

const useStyles = createStyles((theme, { backgroundColor, width }: PropsStyle, getRef) => ({
	AddColumn: {
		backgroundColor: backgroundColor,
		height: "100%",
		width: width,
		padding: 0
	},
	AddColumn_Button: {
		height: "100%",
		width: "100%",
		padding:"2em"
	},
}))


export const ColumnAddButton = () => {
	const settings = useSettings()
	const modal = useModal
	const theme = useMantineTheme()

	const backgroundColor = (() => {
		let color = theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1]
		if (settings.accentColorElements) {
			color = theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors[settings.accentColor.name][1]
		}
		return color
	})()
	const { classes } = useStyles({backgroundColor, width: settings.columnWidth})

	const handleClick = () => {
		modal.category()
	}

	// Pongo el padding ahi porque en useStyles.ts lo ignora (entiendo que tiene prioridad los estilos de <Card/>)
	return (
		<Card className={classes.AddColumn} style={{ padding: 0}}>
			<Button variant="subtle" className={classes.AddColumn_Button} onClick={handleClick}>
				<Plus strokeWidth={1.5}/>
			</Button>
		</Card>

	)
}
