import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline'
import { io } from 'socket.io-client'

const FriendIcon = () =>{
  const accessToken = useSelector(store => store.user.accessToken)
  const friendRequests = useSelector(store => store.user.friendRequests)
  const userId = useSelector(store => store.user.userId)
  const socket = useRef()
  const color = useRef(null)
  console.log(color)
  //const [color, setColor] = useState('')

  useEffect(() => {
    socket.current = io("ws://localhost:8080")
  }, [])

  let reciverId = friendRequests
  .filter(friend => friend._id !== userId)
  .map(item => item.username)

  useEffect(() => {
    if(reciverId.length > 0 && accessToken) {
      socket.current.emit("sendnotification", {
        username : reciverId
      }) 

      socket.current.on('newnotification', () => {
       color.current = "red"
   })

    }
  }, [reciverId, userId, accessToken])


  useEffect(() => {
    socket.current.on('newnotification', () => {
      return color.current = "red"
  })
    console.log(color.current)

  }, [])


  return (
      <PeopleOutlineIcon ref={color} className={color.current} />  
  )
}

export default FriendIcon