import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { format } from 'date-fns'
import styled from 'styled-components'

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

const ModalHeader = styled.h2`
  color: #4C5F6B;
  text-align: center;
`
const ModalText = styled.p`
  color: #404167;
  font-weight: bold;
`

const ModalDescription = styled.p`
  font-size: 12px;
`

const ModalComponent = ({ filteredItem, visible, setVisible }) => {
  const classes = useStyles()

  const handleClose = () => {
    setVisible(false)
  }

  const generateLabel = (number) => {
    switch (number) {
      case 0:
        return ('😞')
      case 0.2:
        return ('🙁')
      case 0.4:
        return ('🤯')
      case 0.6:
        return ('😐')
      case 0.8:
        return ('🙂')
      default:
        return ('😃')
    }
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
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
            <ModalHeader id="transition-modal-title">{filteredItem.length > 0 && format(new Date(filteredItem[0].createdAt), 'EEEE do')}</ModalHeader>
            {filteredItem.map((item) => <div key={item.createdAt} id="transition-modal-description">
              <ModalText>{format(new Date(item.createdAt), 'HH:mm')}: {generateLabel(item.value)} </ModalText>
              <ModalDescription>{item.description}</ModalDescription>
            </div>)}
          </div>
        </Fade>
      </Modal>
    </div>
  )
}

export default ModalComponent