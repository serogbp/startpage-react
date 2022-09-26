import { createStyles, MantineNumberSize } from '@mantine/core';
import { DefaultActionStylesParams } from '@mantine/spotlight/lib/DefaultAction/DefaultAction.styles';

export interface CustomActionStylesParams {
	radius: MantineNumberSize;
}

export default createStyles((theme, { radius }: DefaultActionStylesParams) => ({
	action: {
		position: 'relative',
		display: 'block',
		width: '100%',
		padding: '10px 12px',
		borderRadius: theme.fn.radius(radius),
	},
	actionHovered: {
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[1],
	},
	actionIcon: {
		color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
	},
	actionBody: {
		flex: 1,
	},
	wordBreak: {
		wordBreak: "break-all"
	}
}));
