import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
	board: {
		flexWrap: "nowrap",
		height: "100%",
		minWidth: "100vw",
	},
	boardPadding: {
		padding: theme.spacing.xs,
	},

	column: {
		position: "relative",
		display: "flex",
		flexDirection: "column",
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
		height: "100%",
		borderRadius: theme.radius.sm,
	},
	columnTitle: {
		textAlign: "center",
		margin: 0,
		padding: "1em"
	},
	columnTitle_Container: {
		'&hover': {
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2],
		}
	},
	columnTitle_Settings: {
		position: "absolute",
		top: 0,
		right: 0,
		padding: "1em",
	},
	columnFooter_Button: {
		paddingTop: theme.spacing.lg,
		paddingBottom: theme.spacing.lg,
		height: "auto",
		border: 0,
	},


	AddColumn: {
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
		height: "100%",
	},
	AddColumn_Button: {
		height: "100%",
		width: "100%",
		padding:"2em"
	},


	columnItemList: {
		marginLeft: ".5em",
		marginRight: ".5em",
	},


	columnItem_Card: {
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
		padding: theme.spacing.md,
		width: "auto",
		minHeight: 10,
		marginBottom: 8,
		'&:hover': {
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2],
		},
	},
	columnItem_Name: {
		overflow: "hidden",
		whiteSpace: "normal",

	},
	columnItem_Url: {
		overflow: "hidden",
		whiteSpace: "nowrap",
		textOverflow: "ellipsis"
	},
	columnItem_Settings: {
		position: "absolute",
		top: 0,
		right: 0,
		padding: 8
	},
}))
