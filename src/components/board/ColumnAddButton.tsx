import { Button, Card, Text } from "@mantine/core"
import { openContextModal } from "@mantine/modals"
import { Plus } from "tabler-icons-react"
import { useSettings } from "../../hooks/UseSettings"
import { useStyles } from "../../hooks/UseStyles"


export const ColumnAddButton = () => {
	const { classes } = useStyles()
	const settings = useSettings()

	const handleClick = () => {
		openContextModal({
			title: "New Category",
			modal: "categoryForm",
			trapFocus: true,
			innerProps: {}
		})
	}

	// Pongo el padding ahi porque en useStyles.ts lo ignora (entiendo que tiene prioridad los estilos de <Card/>)
	return (
		<Card className={classes.AddColumn} style={{ padding: 0, width:settings.columnWidth }}>
			<Button variant="subtle" className={classes.AddColumn_Button} onClick={handleClick}>
				<Plus strokeWidth={1.5}/>
			</Button>
		</Card>

	)
}
