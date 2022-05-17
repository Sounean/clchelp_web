import React from 'react';
import './Index.less'
import api from '../service'
import {Button} from 'antd'
import { Layout, Menu } from 'antd';
import imgUrl from "./img/web_home_content01.jpg"

/*
* 作为首页
* */
export default class Index extends React.Component {
    state = {
        result: {}
    };
    fire = () => {
        api.userList({pageIndex: 1, pageSize: 10})
            .then(res => res.json())
            .then(result => {
                this.setState({
                    result
                });
            }).catch(e => {
            console.log(e);
        })
    };

    render() {
        const {result} = this.state;    // 去除result
        const { Header, Content, Footer, Sider } = Layout;
        return <div className='home'>
            {/*Home
            <Button onClick={this.fire}>test API</Button>
            <div>
                Result:{JSON.stringify(result)}
            </div>*/}
            <Content style={{ margin: '10px 0px 0' }}>
                <div className="site-layout-background" style={{  minHeight: 360 }}>
                    <img src={ imgUrl }/>
                </div>
            </Content>
        </div>
    }

}
