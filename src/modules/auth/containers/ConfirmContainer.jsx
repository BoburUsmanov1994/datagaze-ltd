import React from 'react';
import Form from "../../../containers/form/form";
import Field from "../../../containers/form/field";
import Button from "../../../components/ui/button";
import Flex from "../../../components/flex";
import {useNavigate} from "react-router-dom";

const ConfirmContainer = ({...rest}) => {
    const navigate = useNavigate();
    return (
        <div>
            <p className={'login-description'}>Код подтверждения был отправлен на ваш адрес электронной почты
                azizturapov@mail.ru. Пожалуйста, введите код подтверждения! <br/><br/>

                Если код подтверждения не получен, вы можете повторно отправить запрос через </p>
            <p className={'timer'}>115 сек</p>
            <Form formRequest={(val) => console.log(val)}
                  footer={<Flex className={'mt-25'}><Button className={'mr-20'} success md
                                                            type={'submit'}>Подтвердить</Button><Button transparent
                                                                                                      onClick={() => navigate("/auth")}
                                                                                                      md
                                                                                                      type={'button'}>Назад</Button></Flex>}>
                <Field
                    name={'code'}
                    type={'input-otp'}
                    label={''}
                    property={{hideLabel: true, placeholder: 'Введите'}}
                    params={{
                        required: true,
                    }}/>
                    <div className={'resend'}>Отправить повторно</div>
            </Form>
        </div>
    );
};

export default ConfirmContainer;