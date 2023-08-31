import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { Slider, IconButton } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import ZoomIn from '@mui/icons-material/ZoomIn'
import ZoomOut from '@mui/icons-material/ZoomOut'
import { LinearGenomeViewModel } from '..'

const useStyles = makeStyles()(theme => ({

  zoomL:{
    color: '#5A5E61',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
    padding: '6px',
    marginRight: '10px'
  },
  zoomR:{
    color: '#5A5E61',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
    padding: '6px',
    marginLeft: '10px'
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    color: '#5A5E61',
  },
  sliderContainer: {
    display: 'flex', // This enables flexbox
    alignItems: 'center', // This vertically centers the child items
    justifyContent: 'center', // This horizontally centers the child items
    padding: '2px 10px', // Top/bottom padding is 10px, left/right padding is 20px
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
},
  slider:{
    width: 60,
    color: '#4668E2',

  }
}))

function ZoomControls({ model }: { model: LinearGenomeViewModel }) {
  const { classes } = useStyles()
  const { maxBpPerPx, minBpPerPx, bpPerPx, scaleFactor } = model
  const [value, setValue] = useState(-Math.log2(bpPerPx) * 100)
  useEffect(() => {
    setValue(-Math.log2(bpPerPx) * 100)
  }, [setValue, bpPerPx])

  return (
    <div className={classes.container}>
      <IconButton
        data-testid="zoom_out"
        onClick={() => model.zoom(bpPerPx * 2)}
        disabled={bpPerPx >= maxBpPerPx - 0.0001 || scaleFactor !== 1}
        size="large"
        className={classes.zoomL}
      >
        <ZoomOut />
      </IconButton>

      <div className={classes.sliderContainer}>
      <Slider
          size="small"
          className={classes.slider}
          value={value}
          min={-Math.log2(maxBpPerPx) * 100}
          max={-Math.log2(minBpPerPx) * 100}
          onChange={(_, val) => setValue(val as number)}
          onChangeCommitted={() => model.zoomTo(2 ** (-value / 100))}
          disabled={scaleFactor !== 1}
        />
    </div>
            
      <IconButton
        
        data-testid="zoom_in"
        onClick={() => model.zoom(model.bpPerPx / 2)}
        disabled={bpPerPx <= minBpPerPx + 0.0001 || scaleFactor !== 1}
        size="large"
        className={classes.zoomR}
      >
        <ZoomIn />
      </IconButton>
    </div>
  )
}

export default observer(ZoomControls)
