import React from 'react';
import Form from "../../../containers/form/form";
import Field from "../../../containers/form/field";
import Button from "../../../components/ui/button";
import Flex from "../../../components/flex";
import {useNavigate} from "react-router-dom";

const ForgotPasswordContainer = ({...rest}) => {
        const navigate = useNavigate();
    return (
        <div>
            <p className={'login-description'}>Введите Номер телефона или логин для подтверждения</p>
            <Form formRequest={({data:{username}}) => navigate(`/auth/confirm/${username}`)}
                  footer={<Flex className={'mt-25'}><Button className={'mr-20'}  success md  type={'submit'}>Отправить</Button><Button transparent onClick={()=>navigate("/auth")}  md  type={'button'}>Назад</Button></Flex>}>
                <Field
                    name={'username'}
                    type={'input'}
                    label={'Введите Номер телефона или логин для подтверждения'}
                    property={{hideLabel: true, placeholder: 'Введите'}}
                    params={{
                        required: true,
                    }}/>
            </Form>
        </div>
    );
};

export default ForgotPasswordContainer;