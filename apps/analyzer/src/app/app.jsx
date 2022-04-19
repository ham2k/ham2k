// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { AppBar, Container, CssBaseline, responsiveFontSizes, Toolbar, Typography } from "@mui/material"

import { makeStyles } from "@mui/styles"
import { createTheme, ThemeProvider } from "@mui/material/styles"

import commonStyles from "./styles/common"

import { LogLoader } from "./components/LogLoader"
import { LogAnalysis } from "./components/LogAnalysis"
// import { LogAnalysis } from "./components/LogAnalysis"

/* https://material.io/resources/color/ */
let baseTheme = createTheme({
  palette: {
    primary: {
      main: "#546e7a",
    },
  },
})
// baseTheme = responsiveFontSizes(baseTheme)

const useStyles = makeStyles((theme) => ({
  ...commonStyles(theme),

  root: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  toolbar: {
    justifyContent: "space-around",
    [theme.breakpoints.up("xs")]: {
      paddingLeft: theme.spacing(0.5),
      paddingRight: theme.spacing(0.5),
    },
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    [theme.breakpoints.up("lg")]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
  },

  untitledLeft: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "baseline",
  },

  footer: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),

    [theme.breakpoints.down("xs")]: {
      paddingTop: theme.spacing(0.5),
      paddingBottom: theme.spacing(0.5),
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },

    textAlign: "center",
  },
  contentWrapper: {
    flex: 1,
    overflow: "auto",
  },
  content: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}))

export function App() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static" role="banner">
        <Toolbar className={classes.toolbar}>
          <div className={classes.untitledLeft}>
            <Typography component="h1" variant="h4" color="inherit" noWrap className={classes.titleMain}>
              Ham2K Contest Analyzer
            </Typography>
            <Typography component="div" color="inherit" noWrap className={classes.version}>
              v0.1
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.contentWrapper}>
        <Container className={classes.content}>
          <LogAnalysis />
          <LogLoader />
        </Container>
      </div>
      <footer className={classes.footer}>
        <b>Ham2K Contest Analyzer</b> developed by <a href="https://www.qrz.com/db/KI2D">KI2D</a> Sebastian Delmont{" "}
        <a href="https://twitter.com/sd">@sd</a> - v0.1
      </footer>
    </div>
  )
}

export function ThemedApp() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={baseTheme}>
        <App />
      </ThemeProvider>
    </>
  )
}

export default ThemedApp
