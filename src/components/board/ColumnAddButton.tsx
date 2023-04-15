import { Button, Card, useMantineTheme, createStyles } from "@mantine/core"
import { backgroundColorColumn } from "../../Constants"
import { useModal } from "../../hooks/UseModal"
import { useSettings } from "../../hooks/UseSettings"
import {IconPlus} from "@tabler/icons"


interface PropsStyle {
	backgroundColor: string,
	width: number,
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

	const backgroundColor = backgroundColorColumn()
	const { classes } = useStyles({backgroundColor, width: settings.columnWidth})

	const handleClick = () => {
		modal.category()
	}

	// Pongo el padding ahi porque en useStyles lo ignora (entiendo que tiene prioridad los estilos de <Card/>)
	return (
		<Card className={classes.AddColumn} style={{ padding: 0}}>
			<Button variant="subtle" className={classes.AddColumn_Button} onClick={handleClick}>
				<IconPlus stroke={1.5}/>
			</Button>
		</Card>

	)
}
