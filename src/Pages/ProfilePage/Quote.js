import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'

import { SectionSubtitle } from 'styled-components/Titels'

const Quote = ({ visible, setVisible }) => {
  const [imageLink, setImageLink] = useState()
  const classes = useStyles()
  
  const handleClose = () => {
    setVisible(false)
  }

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
        "x-rapidapi-host": "healthruwords.p.rapidapi.com"
      }
    }
    fetch("https://healthruwords.p.rapidapi.com/v1/quotes/?size=medium&maxR=1&t=Love", options)
      .then(res => res.json())
      .then(quote => {
        setImageLink(quote[0].media)
      })
  }, [setImageLink])

  return (
    <div>
      <Modal
        aria-labelledby="feeling comfirmation"
        aria-describedby="your feeling has been registered"
        className={classes.modal}
        open={visible}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={visible}>
          <div className={classes.paper}>
            <SectionSubtitle> Your feeling has been registered!</SectionSubtitle>
            {imageLink && <QuoteImage alt="Quote of the day" src={imageLink} />}
          </div>
        </Fade>
      </Modal>

    </div>
  )
}
export default Quote

const QuoteImage = styled.img`
  width: 100%;
  filter: grayscale(100%) sepia(20%) contrast(1.2);
  border-radius: 6px;
  border-bottom: 80px;
`

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '5px solid #4C5F6B',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "50%"
  },
}))