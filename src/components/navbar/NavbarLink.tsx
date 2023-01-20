import { Tooltip, UnstyledButton, createStyles } from '@mantine/core';
import { TablerIcon } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
	link: {
		width: 32,
		height: 32,
		borderRadius: theme.radius.md,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

		'&:hover': {
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
		},
	},

	active: {
		'&, &:hover': {
			backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
			color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
		},
	},
}));


interface NavbarLinkProps {
	icon: TablerIcon;
	label: string;
	active?: boolean;
	onClick?(): void;
}


export function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
	const { classes, cx } = useStyles();
	return (
		<Tooltip label={label} position="right" transitionDuration={0}>
			<UnstyledButton onClick={onClick} className={cx(classes.link, { [classes.active]: active })} title={label}>
				<Icon stroke='1.5' />
			</UnstyledButton>
		</Tooltip>
	);
}
