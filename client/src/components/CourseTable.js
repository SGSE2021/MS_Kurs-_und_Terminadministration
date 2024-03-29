import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from "axios";
import {ArrowRight} from "@material-ui/icons";
import {Link} from "react-router-dom";

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    { id: 'start', numeric: false, disablePadding: false, label: 'Datum' },
    { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
    { id: 'docents', numeric: false, disablePadding: false, label: 'Dozent' },
    { id: 'place', numeric: false, disablePadding: false, label: 'Raum' },
];

function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected } = props;
    const { handleClick } = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} ausgewählt
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                    Kurse
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Löschen">
                    <IconButton aria-label="delete" onClick={(e) => handleClick(e)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : ( <div></div>
            )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    handleClick: PropTypes.func.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: '75vw',
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));


export default function CourseTable() {

    const [data, setData] = useState([]);

    const fetchData = async () => {
        const {data: coursesFromApi} = await axios.get("https://sgse2021-ilias.westeurope.cloudapp.azure.com/courses-api/courses");
        const {data: result} = await axios.get(`https://sgse2021-ilias.westeurope.cloudapp.azure.com/booking-api/rooms/`);
        for (let i = 0; i < coursesFromApi.length; i++) {
            if(coursesFromApi[i].place !== 0) coursesFromApi[i].place = result.find(item => parseInt(item.id) === coursesFromApi[i].place).name;
            else coursesFromApi[i].place = "Keiner";
            let docents = "";
            const docentIds = coursesFromApi[i].docents.split(',');
            for (let j = 0; j < docentIds.length; j++) {
                if (docentIds[j] !== "") {
                    const {data: result} = await axios.get(`https://sgse2021-ilias.westeurope.cloudapp.azure.com/users-api/lecturers/${docentIds[j]}`);
                    if (j > 0) docents = docents + ", ";
                    if (result != null) {
                        if (result.title === "") {
                            docents = docents + result.firstname + " " + result.lastname
                        } else {
                            docents = docents + result.title + " " + result.firstname + " " + result.lastname
                        }
                    } else {
                        docents = docents + "Dozent nicht gefunden";
                    }
                }
                else docents = "Kein Dozent";
            }
            coursesFromApi[i].docents = docents;
        }
        setData(coursesFromApi);
    };

    useEffect(() => {
        fetchData().then().catch(() => console.log("error getting data from API"));
    }, []);

    const handleDeleteClick = (e) => {
        e.preventDefault();
        const deleteData = async (key) => {
            const {queryResult} = await axios.delete(`https://sgse2021-ilias.westeurope.cloudapp.azure.com/courses-api/courses/${selected[key]}`);
            return queryResult;
        };
        for (const key in selected) {
            deleteData(key)
                .then(() => fetchData().then().catch(() => console.log("error getting data from API")))
                .catch(error => console.log(error));
        }
        setSelected([]);
    };

    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('start');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = data.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar numSelected={selected.length} handleClick={handleDeleteClick}/>
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={data.length}
                        />
                        <TableBody>
                            {stableSort(data, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((data, index) => {
                                    const isItemSelected = isSelected(data.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, data.id)}
                                            tabIndex={-1}
                                            key={data.id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell component="th" align="left" id={labelId} scope="row" padding="default">
                                                {data.start != null ?
                                                    (new Date(data.start)).toLocaleString([],
                                                        {weekday: "long",year: "numeric" ,month: "short", day: "2-digit",
                                                            hour: '2-digit', minute:'2-digit'}) + " Uhr"
                                                    : data.start}
                                            </TableCell>
                                            <TableCell align="left">{data.name}</TableCell>
                                            <TableCell align="left">{data.docents}</TableCell>
                                            <TableCell align="left">{data.place}
                                                { (isItemSelected > 0) && (
                                                    <Tooltip title="Bearbeiten">
                                                        <Link to={`/courses/${data.id}`}>
                                                            <IconButton aria-label="Bearbeiten">
                                                                <ArrowRight />
                                                            </IconButton>
                                                        </Link>
                                                    </Tooltip>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}
