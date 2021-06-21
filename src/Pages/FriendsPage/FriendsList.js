import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import { useSelector, useDispatch } from 'react-redux'
import { API_URL } from 'reusables/urls'

import user from 'reducers/user'

const FriendsContainer = styled.section`
  padding: 5px;
`
const FriendsTitle = styled.h2`
  color: #4C5F6B;
  font-size: 18px;
  margin-bottom: 25px;
`
const ListContainer = styled.ul`
  padding: 0;
  max-width: 450px;
  margin: auto;
`
const Friend = styled.li`
  display: flex;
  align-items: center;
  padding-bottom: 5px;
  justify-content: space-between;
`
const FriendNamePicWrapper = styled.div`
  display: flex;
  align-items: center;
`
const UnfollowButton = styled.button`
  border-radius: 6px;
  border: none;
  padding: 4px 6px;
  background-color: #bca0bc;
  color: #fff;
  width: 100px;
  cursor: pointer;
`
const style = {
  textDecoration: "none", 
  color: "#404167"
}

const FriendsList = () => {
  const friendsList = useSelector(store => store.user.friends)
  const accessToken = useSelector(store => store.user.accessToken)
  const dispatch = useDispatch()

  const onUnfollowFriend = (item) => {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken
      },
      body: JSON.stringify({ id: item._id })
    }
    fetch(API_URL('unfollow'), options)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        dispatch(user.actions.removeFriends(data.friend._id))
        const updatedFriends = friendsList.filter(item => item._id !== data.friend._id)
        localStorage.setItem('friends', JSON.stringify({ friends: updatedFriends }))
      })
  }
  return (
    <FriendsContainer>
      <ListContainer>
        <FriendsTitle>Friends</FriendsTitle>
        {friendsList.map(item =>
          <Friend key={item._id}>
            <FriendNamePicWrapper>
              <Avatar
                alt={item.username && item.username.toUpperCase()}
                src={item.profileImage ? item.profileImage.imageURL : ` /static/images/avatar/1.jpg`}
                style={{ marginRight: "5px" }}
              />
              <Link style={style} to={`/${item._id}`}>{item.username}</Link>
            </FriendNamePicWrapper>
            <UnfollowButton onClick={() => onUnfollowFriend(item)}>
              Unfollow
            </UnfollowButton>
          </Friend>
        )}
      </ListContainer>
    </FriendsContainer>
  )
}

export default FriendsList