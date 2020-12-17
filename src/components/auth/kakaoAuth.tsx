import * as dotenv from 'dotenv';
import KakaoLogin from 'react-kakao-login'
import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import CSS from 'csstype';

const key:any = process.env.KAKAO_KEY
export default {
    title: "KakaoLogin",
    component: KakaoLogin,
};
const _method = {
    async _signIn(result: any) {
        return await axios.post(`https://jven72vca8.execute-api.ap-northeast-2.amazonaws.com/dev/kakaoSignIn/${result.profile.id}`)
    },
    async _signUp(result: any) {
        return await axios.post("https://jven72vca8.execute-api.ap-northeast-2.amazonaws.com/dev/kakaoSignUp", {
            userId: String(result.profile.id),
            email: result.profile.kakao_account.email,
            nickName: result.profile.kakao_account.profile.nickname,
            profileImage: result.profile.kakao_account.profile.thumbnail_image_url
        })
    }
}


export const Kakao = () => {
    const history = useHistory();
    const kakaoLogin = {
        async _success(result: any) {
            if (result) {
                await _method._signIn(result).then(res => {
                    localStorage.setItem("token", res.data.token)
                    localStorage.setItem("kakao_token", result.response.access_token)
                    history.push("/");
                }).catch(err =>
                    _method._signUp(result).then(res => this._success(result)))
            }
        }
    }
    return (<StyledKakaoLogin
      token={key}
      onSuccess={result => kakaoLogin._success(result)}
      onFail={console.error}
      onLogout={console.info}
      style={style}
    >
      <div style={{ color: "#1c2237", textAlign: 'center'}}> 카카오톡 로그인</div>
    </StyledKakaoLogin>
    )
};


const StyledKakaoLogin = styled(KakaoLogin)`
        display: contents;
        padding: 0;
        
        height: 49px;
        line-height: 49px;
        color: #3C1E1E;
        background-color: #FFEB00;
        border: 1px solid transparent;
        border-radius: 3px;
        font-size: 16px;
        text-align: center;
`;

const style: CSS.Properties = {
  width: '100%',
  display: 'inline-block',
  padding: '0px',
  height: '49px',
  lineHeight: '49px',
  borderRadius: '3px',
  backgroundColor: 'rgba(255,238,51,0.99)',
  color: '#1c2237',
  textAlign: 'center',
  fontSize: '1.2rem',
  border: 'none',
  fontWeight: 600,
  cursor: 'pointer'
};