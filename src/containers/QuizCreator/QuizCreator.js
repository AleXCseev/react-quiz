import React, { Component } from "react";
import styles from "./QuizCreator.module.css";
import Button from "../../components/UI/Button/Button";
import Select from "../../components/UI/Select/Select";
import { createControl } from "../../form/formFramework";
import Input from "../../components/UI/Input/Input";

function createOptionControl(number) {
    return createControl(
        {
            label: `Вариант ${number}`,
            errorMessage: "Значение не может быть пустым",
            id: number,
        },
        { required: true }
    );
}

function createFormControls() {
    return {
        questiomn: createControl(
            {
                label: "Введите вопрос",
                errorMessage: "Вопрос не может быть пустым",
            },
            { required: true }
        ),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
    };
}

class QuizCreator extends Component {
    state = {
        quiz: [],
        formControls: createFormControls(),
        reghtAnswer: 1,
    };

    submitHandler = (e) => {
        e.preventDefault();
    };

    addQuestionHandler = () => {};

    createQuizHandler = () => {};

    changeHandler = (value, controlName) => {};

    renderControls() {
        return Object.keys(this.state.formControls).map((item, index) => {
            const control = this.state.formControls[item];
            return (
                <React.Fragment key={item + index}>
                    <Input
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={(e) =>
                            this.changeHandler(e.target.value, item)
                        }
                    />
                    {index === 0 ? <hr /> : null}
                </React.Fragment>
            );
        });
    }

    selectChangeHandler = (e) => {
        console.log(e.target.value);
    };

    render() {
        const select = (
            <Select
                label="Выберите правельный ответ"
                value={this.state.rightAnswer}
                onChange={this.selectChangeHandler}
                options={[
                    { text: 1, value: 1 },
                    { text: 2, value: 2 },
                    { text: 3, value: 3 },
                    { text: 4, value: 4 },
                ]}
            />
        );
        return (
            <div className={styles.QuizCreator}>
                <div>
                    <h1>Создание теста</h1>
                    <form onSubmit={this.submitHandler}>
                        {this.renderControls()}
                        {select}
                        <Button
                            type="primary"
                            onClick={this.addQuestionHandler}
                        >
                            Добавить вопрос
                        </Button>
                        <Button type="success" onClick={this.createQuizHandler}>
                            Создать тест
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}

export default QuizCreator;
