import {Button} from "antd";
import {ProfileActions, ProfileSelectors} from "../../store/auth";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {useEffect} from "react";

const Users = () => {
    const dispatch = useAppDispatch();
    const isLogin = useAppSelector(ProfileSelectors.isLogin);

    useEffect(() => {
        dispatch(ProfileActions.getProfile())
    }, []) // eslint-disable-line

    const onRegister = () => {
        // $api.post('/api/auth/register', {username: 'roman', password: 'password'})
    }

    const onLogin = async () => {
        // const data = await $api.post('/api/auth/login', {username: 'roman', password: 'password'})
        // localStorage.setItem('access_token', data.data.access_token)
        dispatch(ProfileActions.login({username: 'roman', password: 'password'}))
    }

    const onGetCurrentUser = async () => {
        // const data = await $api.get('/api/auth/profile');
    }


    return <>
        <Button onClick={onRegister}>Register</Button>
        <Button onClick={onLogin}>Login</Button>
        <Button onClick={onGetCurrentUser}>Get current user</Button>
        {/*<Button onClick={onLogout}>Logout</Button>*/}
        <div>Users page</div>
        {
            isLogin ? <div>isLogin</div> : <div>is not login</div>
        }
        </>
}

export default Users;