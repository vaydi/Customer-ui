import { arrayOf, bool, func, number, object, shape, string } from 'prop-types';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React, { PureComponent } from 'react';

import { black, green, lightGrey, red, yellow } from '../constant/color';

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const styles = theme => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
    width: '100%',
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
  header: {
    backgroundColor: lightGrey,
    color: black,
    fontSize: 14,
    textAlign: 'left',
  },
  badge: {
    color: black,
    borderRadius: '10px',
    padding: '3px 7px',
  },
});

class TableDefault extends PureComponent {
  constructor(props) {
    super(props);

    const orderBy = this.defaultOrderBy();
    this.state = {
      order: 'asc',
      orderBy,
      page: 0,
    };
  }

  getColorBadge = statut => {
    switch (statut) {
      case 'Success':
        return green;

      case 'Refused':
      case 'Cancled':
      case 'TechnicalFailure':
        return red;

      default:
        return yellow;
    }
  };

  defaultOrderBy = () => {
    const { headCells } = this.props;
    return headCells.filter(x => x.defaultOrderBy === true).map(i => i.id);
  };

  handleRequestSort = (event, property) => {
    const { orderBy, order } = this.state;

    const isDesc = orderBy === property && order === 'desc';
    this.setState({ order: isDesc ? 'asc' : 'desc' });
    this.setState({ orderBy: property });
  };

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
    this.props.changePage(newPage);
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0 });
    this.props.changeRowsPerPage(parseInt(event.target.value, 10));
  };

  createSortHandler = property => event => {
    this.handleRequestSort(event, property);
  };

  columnWithBadgeColor(row, key) {
    const { classes } = this.props;
    const { headCells } = this.props;
    const idColumn = headCells.filter(x => x.badge === true);

    if (idColumn.length > 0 && idColumn.map(x => x.id).includes(key))
      return (
        <span className={classes.badge} style={{ backgroundColor: this.getColorBadge(row[key]) }}>
          {row[key]}
        </span>
      );

    return row[key];
  }

  renderBodyTable(data, order, orderBy) {
    const { noDataMessage } = this.props;

    if (data.length > 0) {
      return stableSort(data, getSorting(order, orderBy)).map((row, index) =>
        this.renderTableCell(row, index),
      );
    }
    return (
      <TableRow>
        <TableCell>{noDataMessage}</TableCell>
      </TableRow>
    );
  }

  renderTableCell(row, index) {
    const { classes } = this.props;

    return (
      <TableRow key={index}>
        {Object.keys(row).map((key, cellIndex) => {
          const computeKey = `${index}${cellIndex}`;
          return (
            <TableCell className={classes.cell} key={computeKey}>
              {this.columnWithBadgeColor(row, key)}
            </TableCell>
          );
        })}
      </TableRow>
    );
  }
  render() {
    const { classes, data, headCells, pagination } = this.props;
    const { order, orderBy, page } = this.state;
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size="medium"
              aria-label="enhanced table"
            >
              <TableHead className={classes.header}>
                <TableRow>
                  {headCells.map(headCell => (
                    <TableCell
                      key={headCell.id}
                      padding={headCell.disablePadding ? 'none' : 'default'}
                      sortDirection={orderBy === headCell.id ? order : false}
                    >
                      <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={order}
                        onClick={this.createSortHandler(headCell.id)}
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
              <TableBody>{this.renderBodyTable(data, order, orderBy)}</TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 20, 30, 40, 50, 100]}
            component="div"
            count={pagination.nb_result === undefined ? 0 : pagination.nb_result}
            rowsPerPage={pagination.result_by_page === undefined ? 10 : pagination.result_by_page}
            page={page}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    );
  }
}

TableDefault.defaultProps = {
  pending: false,
  noDataMessage: 'Aucune donnée',
  pagination: {},
  rowsPerPage: 10,
};

TableDefault.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: object.isRequired,
  headCells: arrayOf(shape({})).isRequired,
  data: arrayOf(shape({ key: string })).isRequired,
  pagination: object,
  pending: bool,
  rowsPerPage: number,
  noDataMessage: string,
  changePage: func.isRequired,
  changeRowsPerPage: func.isRequired,
};

export default withStyles(styles)(TableDefault);
