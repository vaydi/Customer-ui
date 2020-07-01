import { any, func, number, object } from 'prop-types';
import { AppBar, Box, Button, Tab, Tabs } from '@material-ui/core';
import {FilterListSharp, ReplyOutlined} from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';


const useStyles = () => ({
  label: {
    textTransform: 'capitalize',
    fontWeight: 'bold',
    color: 'black',
  },
  AppBar: {
    width: '100%',
    height: '150px',
    //boxShadow: '1px 0px',
  },
  Icon: {
    width: '20px',
    height: '18px',
  },
  btn: {
    height: '35px',
    width: '85px',
    textTransform: 'capitalize',
  },
});

class Index extends React.Component {
  constructor(props) {
    super(props);
    const defaultSelected = this.defaultTabSelected();
    this.state = {
      defaultSelected,
    };
  }

  defaultTabSelected = () => {
    const { TabType } = this.props;
    const idTab = TabType.filter(x => x.defaultSelected === true);
    if (idTab.length > 0) return idTab[0].id;

    return 0;
  };

  handleChange = (_event, defaultSelected) => {
    const { onClickTab } = this.props;
    this.setState({ defaultSelected });
    onClickTab(defaultSelected);
  };

  render() {
    const { classes, TabType } = this.props;
    const { defaultSelected } = this.state;
    return (
      <AppBar position="static" color="inherit" className={classes.AppBar}>
        <Tabs
          value={defaultSelected}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs"
        >
          {TabType.map(labelTab => (
            <Tab key={labelTab.id} label={labelTab.label} className={classes.label} />
          ))}
        </Tabs>
        <div>
          <Box display="flex" p={2}>
            <Box flexGrow={2} p={2}>
              <Button variant="outlined" size="small" className={classes.btn}>
                <FilterListSharp className={classes.Icon} /> Filtres
              </Button>
            </Box>
            <Box p={2}>
              <Button variant="outlined" size="small" className={classes.btn}>
                <ReplyOutlined className={classes.Icon} /> Exporter
              </Button>
            </Box>
          </Box>
        </div>
      </AppBar>
    );
  }
}

Index.defaultProps = {
  TabType: [],
  defaultSelected: 0,
};

Index.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  TabType: any,
  defaultSelected: number,
  onClickTab: func.isRequired
};

export default withStyles(useStyles)(Index);
