import React from 'react';
import {Table, Switch, Popconfirm} from 'antd';
import './Index.less'
import api from '../../service'

const PAGE_SIZE = 8;
export default class Index extends React.Component {
    state = {
        data: [],
        total: 0,
        loading: false
    };

    constructor(props) {
        super(props);
        // {"uid":"1","cshId":"A615","userName":"王一一","createTime":"2022-05-25 17:10:03","forbid":"0"}
        this.columns = [
            {
                title: 'uid',
                dataIndex: 'uid'
            },
            {
                title: "房间号",
                dataIndex: 'cshId'
            },
            {
                title: '用户名',
                dataIndex: "userName"
            },
            {
                title: "入户时间",
                dataIndex: 'createTime'
            },
            {
                title: "是否冻结",
                dataIndex: 'forbid',
                render: (text, record) => {
                    return <Popconfirm  // 气泡确认
                        title={`确定要${record.forbid === '1' ? '解禁' : '冻结'}?`}
                        onConfirm={() => this.toggleForbid(record)} // 用户点击调用方法
                    >
                        <Switch
                            checkedChildren="正常"    //选中状态显示
                            unCheckedChildren="冻结"
                            checked={text !== "1"}  // 判断是否被选中
                        />
                    </Popconfirm>
                },
                width: '20%'
            }
        ];
    }

    render() {
        const {data, total, loading} = this.state;
        return (
            <Table
                loading={loading}
                rowKey={item => item.uid}   //每一行的唯一值
                dataSource={data}
                pagination={    // 分页的数据
                    {
                        total,
                        pageSize: PAGE_SIZE,
                        onChange: (page, pageSize) => { //页码变化时
                            console.log(page, pageSize);
                            this.loadData(page);
                        }
                    }
                }
                columns={this.columns}
            />
        )

    }

    componentDidMount() {
        this.setState({
            loading: true
        });
        this.loadData(1);
    }

    loadData = (pageIndex) => {
        this.pageIndex = pageIndex;
        api.userList({pageIndex, pageSize: PAGE_SIZE})
            .then(res => res.json())
            .then(result => {
                // {"code":0,"message":"SUCCESS.","data":{"total":3,"list":[{"u
                const {code, message, data: {list, total} = {}} = result;
                this.setState({
                    loading: false,
                    data: list,
                    total: total
                });
            })
            .catch(e => {
                this.setState({
                    loading: false
                });
                console.log(e);
            })
    };
    toggleForbid = (record) => {
        const forbid = record.forbid === '1' ? 0 : 1;
        api.updateUser({forbid})(record.uid)
            .then(res => res.json())
            .then(result => {
                this.loadData(this.pageIndex);
            }).catch(e => {
            console.log(e);
        });
    }
}
