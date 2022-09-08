import { Button, Card, Text } from "@mantine/core"
import { Plus } from "tabler-icons-react"
import { useSettings } from "../../hooks/UseSettings"
import { useStyles } from "../../hooks/UseStyles"


export const ColumnAddButton = () => {
	const { classes } = useStyles()
	const settings = useSettings()
	// Pongo el padding ahi porque en useStyles.ts lo ignora (entiendo que tiene prioridad los estilos de <Card/>)
	return (
		<Card className={classes.AddColumn} style={{ padding: 0, width:settings.columnWidth }}>
			<Button variant="subtle" className={classes.AddColumn_Button} >
				<Plus strokeWidth={1.5}/>
			</Button>
		</Card>

	)
}
