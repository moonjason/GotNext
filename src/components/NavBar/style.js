import styled from 'styled-components';
import { NavLink } from 'react-router-dom'

export const NavContainer = styled.div`
    height: 50px;
    width: 100%;
    background-color: #4d4d4d;
    position: relative;
    box-sizing: border-box;
`

export const NavHeader = styled.div`
    display: inline;
`

export const NavTitle = styled.div`
    display: inline-block;
    font-size: 22px;
    color: #fff;
    padding: 10px 10px 10px 10px;
    margin-top: 1.5px;
`

export const NavBtn = styled.div`
    display: none;
`

export const LinksContainer = styled.div`
  display: flex;
  font-size: 18px;
  float: right;
  margin-top: 1.5px;
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