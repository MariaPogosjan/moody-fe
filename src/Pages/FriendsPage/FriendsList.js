import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import { useSelector, useDispatch } from 'react-redux'
import { API_URL } from 'reusables/urls'

import user from 'reducers/user'
import image from 'assets/friends.jpg'

const FriendsList = () => {
  const friendsList = useSelector(store => store.user.friends)
  const accessToken = useSelector(store => store.user.accessToken)
  const dispatch = useDispatch()

  const onUnfollowFriend = (item) => {
    const confirmation = window.confirm(`Are you shure you want to unfollow ${item.username}?`)
    if (confirmation) {
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
  }
  return (
    <FriendsContainer>
      <ListContainer>
        <FriendsTitle>Friends</FriendsTitle>
        {friendsList.length === 0 &&
          <>
            <Text>No friends yet! Perhaps you want to look for them?</Text>
            <Image src={image} alt="Friends online" />
          </>
        }
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
  background-color: #4C5F6B;
  color: #fff;
  width: 75px;
  cursor: pointer;

  &:hover {
    opacity: 80%;
  }
  
  @media(min-width: 650px) {
    width: 100px;
  }
`
const style = {
  textDecoration: "none",
  color: "#2a363c"
}

const Text = styled.p`
  margin: 0;
  padding: 0;
  font-size: 12px;
  color: #2a363c;
`

const Image = styled.img`
  width: 100%;
`