import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
//
const buttonStyle = css`
border: none;
cursor: pointer;
outline: none;
margin: 1.25rem 0 0;
padding-top: 0.75rem;
padding-bottom: 0.75rem;
width: 100%;
height: 3rem;
border-radius: 4px;
font-size: 1.2rem;
font-weight: 600;
font-family: '맑은 고딕';
line-height: 1.5;
color: black;
background: rgba(231,226,221,0.5);
transition: all 0.2s ease-in-out;
&:hover {
  transition: all 0.2s ease-in-out;
  background: #1c2237;
  color: #fff;
}
`;

const StyleButton = styled.button`${buttonStyle}`;
const StyleLink = styled(Link)`${buttonStyle}`;

const CommonButton = (props: any) => {
  return props.to ? (<StyleLink {...props} />)
    : (<StyleButton {...props} />)// 버튼이 받아오는 props를 스타일 버튼에게 던진다.
}
export default CommonButton;

