import React, { Component } from "react";
import styles from "./Auth.module.css";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import is from "is_js";
import axios from "axios";

class Auth extends Component {
    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: "",
                type: "email",
                label: "Email",
                errorMessage: "Введите корректный email",
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true,
                },
            },
            password: {
                value: "",
                type: "password",
                label: "Пароль",
                errorMessage: "Введите корректный пароль",
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6,
                },
            },
        },
    };
    loginHandler = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true,
        };
        try {
            const response = await axios.post(
                "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBrwONizUEZ7N3ga5UUzp2C6BEoLCXWtU4",
                authData
            );

            console.log(response.data);
        } catch (e) {
            console.log(e);
        }
    };

    registerHandler = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true,
        };
        try {
            const response = await axios.post(
                "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBrwONizUEZ7N3ga5UUzp2C6BEoLCXWtU4",
                authData
            );

            console.log(response.data);
        } catch (e) {
            console.log(e);
        }
    };

    submitHandler = (e) => {
        e.preventDefault();
    };

    validateControl(value, validation) {
        if (!validation) {
            return true;
        }

        let isValid = true;

        if (validation.required) {
            isValid = value.trim() !== "" && isValid;
        }

        if (validation.email) {
            isValid = is.email(value) && isValid;
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid;
        }

        return isValid;
    }

    onChangeHandler = (event, controlName) => {
        const formControls = { ...this.state.formControls };
        const control = { ...formControls[controlName] };

        control.value = event.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation);

        formControls[controlName] = control;

        let isFormValid = true;

        Object.keys(formControls).forEach((item) => {
            isFormValid = formControls[item].valid && isFormValid;
        });

        this.setState({
            formControls,
            isFormValid,
        });
    };

    renderInputs() {
        return Object.keys(this.state.formControls).map((item, index) => {
            const control = this.state.formControls[item];
            return (
                <Input
                    key={item + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={(event) => this.onChangeHandler(event, item)}
                />
            );
        });
    }

    render() {
        return (
            <div className={styles.Auth}>
                <div>
                    <h1>Авторизация</h1>
                    <form
                        onSubmit={this.submitHandler}
                        className={styles.AuthForm}
                    >
                        {this.renderInputs()}

                        <Button
                            type="success"
                            onClick={this.loginHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Войти
                        </Button>
                        <Button
                            onClick={this.registerHandler}
                            type="primary"
                            disabled={!this.state.isFormValid}
                        >
                            Зарегестрироваться
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Auth;
