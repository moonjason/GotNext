import styled from 'styled-components';
import { NavLink } from 'react-router-dom'

export const NavContainer = styled.div`
    height: 50px;
    width: 100vw;
    background-color: #4d4d4d;
    opacity: 1;
    position: relative;
    box-sizing: border-box;
    box-shadow:0px 4px 4px black;
`

export const NavHeader = styled.div`
    display: inline;
`

export const NavTitle = styled.div`
    font-family: 'Do Hyeon', sans-serif;
    display: inline-block;
    font-size: 36px;
    color: #fff;
    padding: 10px 10px 10px 10px;
    margin-top: -5px;
`

export const NavBtn = styled.div`
    display: none;
`

export const LinksContainer = styled.div`
  display: flex;
  font-size: 15px;
  float: right;
  margin-top: 3px;
  margin-right: 10px;
`

export const Link = styled(NavLink)`
    display: inline-block;
    padding: 13px 10px 13px 10px;
    text-decoration: none;
    color: #efefef;
    border-radius: 50px;
    &:hover{
        color: #0D98BA;
        background-color: rgba(255, 255, 255, 0.5); 
    }
    &.active{
        color: #0D98BA;
        background-color: rgba(255, 255, 255, 0.8); 
    }
`

export const CurrentUser = styled.div`
    display: inline-block;
    padding: 13px 10px 13px 10px;
    font-weight: 700;
    color: #efefef;
    border-radius: 50px;
`