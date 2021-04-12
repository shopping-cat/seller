import React, { useCallback, useState } from 'react'
import { Breadcrumb, Button, Layout as AntdLayout, Menu } from 'antd';
import Link from 'next/link'
import Image from 'next/image'
import {
    DesktopOutlined,
    PieChartOutlined,
    ShopOutlined,
    MessageOutlined,
    ShoppingOutlined,
    DollarCircleOutlined,
    HomeOutlined,
    ArrowLeftOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import { useRouter } from 'next/dist/client/router';
import { auth } from '../lib/firebase';
import { LAYOUT_BLACK_LIST } from '../constants/value'
import pathToKorean from '../lib/pathToKorean';


const { SubMenu } = Menu

const MyLayout = styled(AntdLayout)`
    min-height: 100vh;
    min-width: 100vw;
`

const Content = styled(AntdLayout.Content)`
    margin: 0 16px;
`

const Header = styled(AntdLayout.Header)`
    background-color: #fff;
    padding: 0 24px;
    display:flex;
    align-items: center;
   
`

const HeaderLeft = styled.div`
    flex-grow:1;
`

const UnCollapsedTitle = styled.a`
    font-size: 20px;
    color:#333;
`

const MyBreadcrumb = styled(Breadcrumb)`
    margin: 16px 0;
`

const ChildrenContainer = styled(Content)`
    /* background-color: #fff; */
`

const SiderHeader = styled.div`
    height: 64px;
    display: flex;
    flex-direction:row;
    align-items: center;
    justify-content: center;
    &:hover {
        cursor:pointer
    }
`

const CollapsedTitle = styled.a`
    font-size: 20px;
    color: #fff;
    margin-left:8px;
`

const menuItems = [
    { route: 'dashboard', name: '대시보드', icon: <PieChartOutlined /> },
    { route: 'shop', name: '상점관리', icon: <ShopOutlined /> },
    { route: 'order', name: '주문관리', icon: <DesktopOutlined /> },
    // { route: 'inquery', name: '문의관리', icon: <MessageOutlined /> },
    { route: 'item', name: '상품관리', icon: <ShoppingOutlined /> },
    { route: 'profit', name: '수익관리', icon: <DollarCircleOutlined /> },
]

const Layout: React.FC = ({ children }) => {

    const { asPath, push, back } = useRouter()

    const [collapsed, setCollapsed] = useState(false)

    const onSider = useCallback(() => {
        setCollapsed(!collapsed)
    }, [collapsed])

    const onLogout = useCallback(() => {
        auth.signOut()
    }, [])

    if (LAYOUT_BLACK_LIST.includes(asPath.split('/')[1])) return <>{children}</>

    return (
        <MyLayout>
            <AntdLayout.Sider collapsible collapsed={collapsed} onCollapse={onSider}>
                <SiderHeader onClick={back} >
                    <ArrowLeftOutlined style={{ fontSize: '16px', color: '#fff' }} />
                    {!collapsed && <CollapsedTitle>뒤로가기</CollapsedTitle>}
                </SiderHeader>
                <Menu theme="dark" selectedKeys={[asPath.split('/')[1]]} mode="inline">
                    {menuItems.map(({ icon, name, route }) =>
                        <Menu.Item
                            onClick={() => push('/' + route)}
                            key={route}
                            icon={icon}
                        >
                            {name}
                        </Menu.Item>
                    )}
                </Menu>
            </AntdLayout.Sider>
            <AntdLayout >
                <Header>
                    <HeaderLeft>
                        <Link href='/dashboard' ><UnCollapsedTitle >쇼핑냥이 셀러스</UnCollapsedTitle></Link>
                    </HeaderLeft>
                    <Button type='primary' onClick={onLogout} >로그아웃</Button>
                </Header>
                <Content>
                    <MyBreadcrumb >
                        <Breadcrumb.Item >
                            <Link href='/' ><a><HomeOutlined /></a></Link>
                        </Breadcrumb.Item>
                        {pathToKorean(asPath).map(({ name, path }) =>
                            <Breadcrumb.Item key={name}>
                                <Link href={path} ><a>{name}</a></Link>
                            </Breadcrumb.Item>
                        )}
                    </MyBreadcrumb>
                    <ChildrenContainer  >
                        {children}
                    </ChildrenContainer>
                </Content>
            </AntdLayout>
        </MyLayout >
    )
}

export default Layout