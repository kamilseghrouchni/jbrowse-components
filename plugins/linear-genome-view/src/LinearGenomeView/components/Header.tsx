import React from 'react'
import { observer } from 'mobx-react'
import { Button, IconButton, FormGroup, Typography, alpha, } from '@mui/material'

import { makeStyles } from 'tss-react/mui'
import { getBpDisplayStr } from '@jbrowse/core/util'

// icons
import { TrackSelector as TrackSelectorIcon } from '@jbrowse/core/ui/Icons'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

// locals
import { LinearGenomeViewModel, SPACING } from '..'
import OverviewScalebar from './OverviewScalebar'
import ZoomControls from './ZoomControls'
import SearchBox from './SearchBox'

type LGV = LinearGenomeViewModel
const useStyles = makeStyles()(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',  // This will ensure vertical alignment of all child elements
    justifyContent: 'space-between',  // This will spread the child elements across the container
  },
  headerBar: {
    display: 'flex',
  },
  headerForm: {
    flexWrap: 'nowrap',
    marginRight: 7,
  },
  spacer: {
    marginLeft: 6,
  },
  adjuster: {
    flexGrow: 6,
  },

  panButton: {
    '& .MuiButton-root:hover .MuiButton-notchedOutline': {
      borderColor: '#4668E2',},
    background: alpha(theme.palette.background.paper, 0.6),
    color: '#5A5E61',
    margin: SPACING,
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
    border: 'none',
    padding: "1px",
  },
  bp: {
    marginLeft: 5,
  },
  toggleButton: {
    height: 44,
    border: 'none',
    marginLeft: theme.spacing(4),
  },
  buttonSpacer: {
    height: 32,
    width: 32,
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
    color: '#5A5E61',
    padding: '0px'


  },
}))

const HeaderButtons = observer(({ model }: { model: LGV }) => {
  const { classes } = useStyles()
  return (
    <IconButton
    onClick={model.activateTrackSelector}
      className={classes.toggleButton}
      title="Open track selector"
      value="track_select"
    >
      <TrackSelectorIcon className={classes.buttonSpacer} />
    </IconButton>
  )
})

function PanControls({ model }: { model: LGV }) {
  const { classes } = useStyles()
  return (
    <>
      <Button
        sx={{
          color: '#5A5E61', // Match the color to the IconButton
        }}
        variant="outlined"
        className={classes.panButton}
        onClick={() => model.slide(-0.9)}
        size="small"  // make the button smaller

      >
        <ChevronLeftIcon />
      </Button>
      <Button
        variant="outlined"
        className={classes.panButton}
        onClick={() => model.slide(0.9)}
        size="small"  // make the button smaller

      >
        <ChevronRightIcon />
      </Button>
    </>
  )
}

const RegionWidth = observer(({ model }: { model: LGV }) => {
  const { classes } = useStyles()
  const { coarseTotalBp } = model
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', color:'#5A5E61' }}>
      <Typography variant="body1" color="textPrimary" style={{ marginLeft: '10px' }}>
        Selected region:
      </Typography>
      <Typography variant="body1" color="textPrimary" className={classes.bp}>
        {getBpDisplayStr(coarseTotalBp)}
      </Typography>
    </div>
  );
})

const Controls = ({ model }: { model: LGV }) => {
  const { classes } = useStyles()
  return (
    <div className={classes.headerBar}>

    <div className={classes.container}>
        <SearchBox model={model} />
        <div className={classes.spacer} />
        <RegionWidth model={model} />
      </div>


      <div className={classes.adjuster} />
      <div className={classes.spacer} />

      <FormGroup row className={classes.headerForm}>
        <PanControls model={model} />
      </FormGroup>
      <ZoomControls model={model} />
      <HeaderButtons model={model} />

      <div className={classes.spacer} />
    </div>
  )
}

const LinearGenomeViewHeader = observer(({ model }: { model: LGV }) => {
  return !model.hideHeader ? (
    model.hideHeaderOverview ? (
      <Controls model={model} />
    ) : (
      <OverviewScalebar model={model}>
        <Controls model={model} />
      </OverviewScalebar>
    )
  ) : null
})

export default LinearGenomeViewHeader
