import React, {useState} from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import School from "@material-ui/icons/School";
import { Link } from "react-router-dom";

const drawerWidth = 180;

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	drawer: {
		[theme.breakpoints.up("sm")]: {
			width: drawerWidth,
			flexShrink: 0,
		},
	},
	appBar: {
		[theme.breakpoints.up("sm")]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth,

		},
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up("sm")]: {
			display: "none",
		},
	},
	// necessary for content to be below app bar
	drawerPaper: {
		width: drawerWidth,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
	buttonGroup: {
		flex: 1,
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "flex-end",
		'align-items': 'center',
	},
	button: {
		margin: theme.spacing(1.5),
	},
}));

function ResponsiveDrawer(props) {
	const [title, setTitle] = useState("ILIAS 2.0");
	const { window } = props;
	const classes = useStyles();
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const currentUserString = localStorage.getItem( "current-user" );
	const currentUserObject = JSON.parse(currentUserString );
	const name = currentUserObject.firstname + " " + currentUserObject.lastname;

	const drawer = (
		<div>
			<div className={classes.toolbar} />
			<School />
			<Typography variant="h6" noWrap>
				ILIAS 2.0
			</Typography>
			<Divider />
			<List>
				<a href="https://sgse2021-ilias.westeurope.cloudapp.azure.com/users/">
					<ListItem button key="Startseite">
						<ListItemText primary="Startseite" />
					</ListItem>
				</a>
				<a href="https://sgse2021-ilias.westeurope.cloudapp.azure.com/messages/">
					<ListItem button key="Nachrichten">
						<ListItemText primary="Nachrichten" />
					</ListItem>
				</a>
				<Link to="/courses/" onClick={() => setTitle("Kurse")}>
					<ListItem button key="Kurse">
						<ListItemText primary="Kurse" />
					</ListItem>
				</Link>
				<Link to="/appointments/" onClick={() => setTitle("Termine")}>
					<ListItem button key="Termine">
						<ListItemText primary="Termine" />
					</ListItem>
				</Link>
				<a href="https://sgse2021-ilias.westeurope.cloudapp.azure.com/exams/">
					<ListItem button key="Prüfungen">
						<ListItemText primary="Prüfungen" />
					</ListItem>
				</a>
				<a href="https://sgse2021-ilias.westeurope.cloudapp.azure.com/users/students">
					<ListItem button key="Studierende">
						<ListItemText primary="Studierende" />
					</ListItem>
				</a>
				<a href="https://sgse2021-ilias.westeurope.cloudapp.azure.com/users/lecturers">
					<ListItem button key="Lehrende">
						<ListItemText primary="Lehrende" />
					</ListItem>
				</a>
				<a href="https://sgse2021-ilias.westeurope.cloudapp.azure.com/booking/">
					<ListItem button key="Raumbuchung">
						<ListItemText primary="Raumbuchung" />
					</ListItem>
				</a>
				<a href="https://sgse2021-ilias.westeurope.cloudapp.azure.com/users/logout">
					<ListItem button key="Ausloggen">
						<ListItemText primary="Ausloggen" />
					</ListItem>
				</a>
			</List>
		</div>
	);

	const container =
		window !== undefined ? () => window().document.body : undefined;

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						className={classes.menuButton}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap>
						{title}
					</Typography>
						<div className={classes.buttonGroup}>
							<Typography variant="h6" noWrap>
								{name}
							</Typography>
							<IconButton
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								color="inherit"
							>
							<AccountCircle />
						</IconButton>
					</div>

				</Toolbar>
			</AppBar>
			<nav className={classes.drawer} aria-label="mailbox folders">
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Hidden smUp implementation="css">
					<Drawer
						container={container}
						variant="temporary"
						anchor={theme.direction === "rtl" ? "right" : "left"}
						open={mobileOpen}
						onClose={handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper,
						}}
						ModalProps={{
							keepMounted: true, // Better open performance on mobile.
						}}
					>
						{drawer}
					</Drawer>
				</Hidden>
				<Hidden xsDown implementation="css">
					<Drawer
						classes={{
							paper: classes.drawerPaper,
						}}
						variant="permanent"
						open
					>
						{drawer}
					</Drawer>
				</Hidden>
			</nav>
		</div>
	);
}

export default ResponsiveDrawer;
