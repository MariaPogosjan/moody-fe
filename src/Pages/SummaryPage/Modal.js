import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { format } from 'date-fns'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))

const ModalComponent = ({ filteredItem, visible, setVisible }) => {
  const classes = useStyles()

  const handleClose = () => {
    setVisible(false)
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
            <h2 id="transition-modal-title">{filteredItem.length>0 && format(new Date(filteredItem[0].createdAt), 'EEEE do')}</h2>
            {filteredItem.map((item) => <p key={item.createdAt} id="transition-modal-description">{item.value}:{item.description}</p>)}
          </div>
        </Fade>
      </Modal>
    </div>
  )
}

export default ModalComponent 