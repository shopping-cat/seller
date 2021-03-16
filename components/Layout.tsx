import React, { useCallback, useState } from 'react'
import { Breadcrumb, Button, Layout as AntdLayout, Menu } from 'antd';
import Link from 'next/link'
import Image from 'next/image'
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
    ShopOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import { useRouter } from 'next/dist/client/router';
import routeToKorean from '../lib/routeToKorean';
import { auth } from '../lib/firebase';
import { LAYOUT_BLACK_LIST } from '../constants/value'


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
    background-color: #fff;
`

const SiderHeader = styled.div`
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
        cursor:pointer
    }
`

const CollapsedTitle = styled.a`
    font-size: 20px;
    color: #fff;
`

const menuItems = [
    { route: 'dashboard', name: '대시보드', icon: <PieChartOutlined /> },
    { route: 'order', name: '주문관리', icon: <DesktopOutlined /> },
    { route: 'shop', name: '상점관리', icon: <ShopOutlined /> },
]

const Layout: React.FC = ({ children }) => {

    const { route, push } = useRouter()

    const [collapsed, setCollapsed] = useState(false)

    const onSider = useCallback(() => {
        setCollapsed(!collapsed)
    }, [collapsed])

    const onLogout = useCallback(() => {
        auth.signOut()
    }, [])

    if (LAYOUT_BLACK_LIST.includes(route.split('/')[1])) return <>{children}</>

    return (
        <MyLayout >
            <AntdLayout.Sider collapsible collapsed={collapsed} onCollapse={onSider}>
                <SiderHeader onClick={() => push('dashboard')} >
                    {collapsed && <Image src='/logo.png' width={32} height={32} />}
                    {!collapsed && <CollapsedTitle>쇼핑냥이 셀러스</CollapsedTitle>}
                </SiderHeader>
                <Menu theme="dark" selectedKeys={[route.split('/')[1]]} mode="inline">
                    {menuItems.map(({ icon, name, route }) =>
                        <Menu.Item
                            onClick={() => push(route)}
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
                        {collapsed && <Link href='/dashboard' ><UnCollapsedTitle >쇼핑냥이 셀러스</UnCollapsedTitle></Link>}
                    </HeaderLeft>
                    <Button type='primary' onClick={onLogout} >로그아웃</Button>
                </Header>
                <Content>
                    <MyBreadcrumb >
                        {route.split('/').map(r => <Breadcrumb.Item key={r} >{routeToKorean(r)}</Breadcrumb.Item>)}
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