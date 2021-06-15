import React from 'react'
import styled from 'styled-components'
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
  
`
const ListContainer = styled.ul`
  padding:0;
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
`

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
        //here we need to fix local storage as well
      })
  }
  return (
    <FriendsContainer>
      <FriendsTitle>Friends</FriendsTitle>
      <ListContainer>
        {friendsList.map(item =>
          <Friend key={item.id}>
            <FriendNamePicWrapper>
              <Avatar
                alt={item.username && item.username.toUpperCase()}
                src={item.profileImage ? item.profileImage.imageURL : ` /static/images/avatar/1.jpg`}
                style={{ marginRight: "5px" }}
              />
              {item.username}
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