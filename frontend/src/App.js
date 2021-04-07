/*
1 Сверстать страницу веб-сайта:
- Содержимое страницы находится в контейнере и имеет отступы от границ экрана.
- Вверху страницы по центру заголовок "Посещаемость занятий"
- Под заголовком текст "Всего студентов присутствует: N", где N – количество отметившихся человек.
- Под текстом форма из одного поля ввода имени и кнопки "Добавить".
2 На сервере реализовать хранение посещения студентов и обработку формы:
- Список добавленных студентов можно хранить как угодно: БД, файл, переменная в
приложении.
- Обработчик формы добавляет студента в список посещаемости только, если его там
ещё не было (не хранить дубликаты!), и возвращает количество студентов.
3 Реализовать работу формы по AJAX: при заполнении (сабмите) формы на сервере
сохраняется запись о новом студенте, поле ввода имени отчищается, а счётчик обновляется в
соответствии с актуальным значением.
*/

import { useState, useEffect } from 'react';

import './App.css';

function App() {
    const url = "http://localhost:5000/attendee";

    const [amount, setAmount] = useState(0);

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setAmount(data.amount));
    }, []);

    function submitForm(e) {
        e.preventDefault();
        const form = document.getElementById('add-attendee');
        const input = document.getElementById('attendee-name');
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                name: input.value
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(data => {
                form.reset();
                setAmount(data.amount);
            });
    }

    return (
        <div className="wrapper">
            <h1 className="title">Посещаемость занятий</h1>
            <p className="amount">
                Всего студентов присутствует: {amount}
            </p>
            <form id="add-attendee" method="POST" action={url} onSubmit={submitForm}>
                <input id="attendee-name" required className="control" name="name" placeholder="Имя студента" />
                <button className="control" type="submit">Добавить</button>
            </form>
        </div>
    );
}

export default App;
