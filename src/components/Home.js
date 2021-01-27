import {
  Card,
  Divider,
  FormControl,
  Grid,
  Icon,
  InputBase,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";

const useStyles = makeStyles((theme) => ({
  containerStyle: {
    marginTop: "4%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  searchRoot: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    boxShadow: "none",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  dividerSearch: {
    height: 28,
    margin: 4,
    marginRight: 10,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  table: {
    minWidth: 650,
  },
}));

function Home() {
  const [query, setQuery] = React.useState("");
  const [city, setCity] = React.useState("Mumbai");
  const [results, setResults] = React.useState([]);
  const [banks, setBanks] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  React.useEffect(() => {
    fetch(
      `https://bank-fyle-api.herokuapp.com/api/branches/?q=Mumbai&limit=30000&offset=0`
    )
      .then((res) => res.json())
      .then((res) => {
        setResults(res.branches);
        setBanks(res.branches);
      });
  }, []);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
    let key;
    let res = [];
    banks.forEach((bank) => {
      for (key in bank) {
        if (bank[key].toString().toLowerCase().includes(event.target.value)) {
          res.push(bank);
          break;
        }
      }
    });
    setResults([...res]);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
    fetch(
      `https://bank-fyle-api.herokuapp.com/api/branches/?q=${event.target.value}&limit=30000&offset=0`
    )
      .then((res) => res.json())
      .then((res) => {
        setResults(res.branches);
        setBanks(res.branches);
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const classes = useStyles();
  return (
    <div className={classes.containerStyle}>
      <Typography
        variant="h4"
        style={{
          marginBottom: 20,
          marginTop: 15,
          fontWeight: 300,
        }}
      >
        Get Details of Banks and their Branches
      </Typography>
      <Grid style={{ marginBottom: 10 }}>
        <Card>
          <Paper component="form" className={classes.searchRoot}>
            <InputBase
              className={classes.input}
              placeholder="Search Banks"
              inputProps={{ "aria-label": "search banks" }}
              value={query}
              onChange={handleQueryChange}
            />
            <Icon className={classes.iconButton} aria-label="search">
              <SearchIcon />
            </Icon>
            <Divider className={classes.dividerSearch} orientation="vertical" />

            <FormControl className={classes.formControl}>
              <Select value={city} displayEmpty onChange={handleCityChange}>
                <MenuItem value={"Mumbai"}>Mumbai</MenuItem>
                <MenuItem value={"Bangalore"}>Bangalore</MenuItem>
                <MenuItem value={"Kolkata"}>Kolkata</MenuItem>
                <MenuItem value={"Delhi"}>Delhi</MenuItem>
                <MenuItem value={"Udaipur"}>Udaipur</MenuItem>
              </Select>
            </FormControl>
          </Paper>
        </Card>
      </Grid>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">IFSC</TableCell>
              <TableCell align="left">Bank Name</TableCell>
              <TableCell align="left">Address</TableCell>
              <TableCell align="left">City</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

              .map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="left">{row.ifsc}</TableCell>
                  <TableCell align="left">{row.bank_name}</TableCell>
                  <TableCell align="left">{row.address}</TableCell>
                  <TableCell align="left">{row.city}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={results.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default Home;
