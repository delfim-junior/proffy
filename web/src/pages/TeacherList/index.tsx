import React, { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'

import PageHeader from '../../components/pageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import Input from '../../components/Input'
import Select from '../../components/Select'

import api from '../../services/api'
import './styles.css'

const TeacherList: React.FC = () => {

    const [teachers, setTeachers] = useState([])
    const [subject, setSubject] = useState('')
    const [week_day, setWeekDay] = useState('')
    const [time, setTime] = useState('')

    async function handleSearchTeachers(event: FormEvent) {
        event.preventDefault()

        const response = await api.get('index_classes', {
            params: {
                subject,
                week_day,
                time
            }
        })

        setTeachers(response.data)
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os Stors disponíveis">
                <form onSubmit={handleSearchTeachers} id="search-teachers">
                    <Select
                        name="subject"
                        label="Matéria"
                        value={subject}
                        options={[
                            { value: 'Artes', label: 'Artes' },
                            { value: 'Desenho', label: 'DGD' },
                            { value: 'Quimica', label: 'Quimica' },
                        ]}
                        onChange={e => setSubject(e.target.value)}
                    />
                    <Select
                        name="week_day"
                        label="Dia da semana"
                        value={week_day}
                        options={[
                            { value: '0', label: 'Domingo' },
                            { value: '1', label: 'Segunda-feira' },
                            { value: '2', label: 'Terca-feira' },
                            { value: '3', label: 'Quarta-feira' },
                            { value: '4', label: 'Quinta-feira' },
                            { value: '5', label: 'Sexta-feira' },
                            { value: '6', label: 'Sabado' },
                        ]}
                        onChange={e => setWeekDay(e.target.value)}
                    />
                    <Input
                        type="time"
                        name="time"
                        label="Hora"
                        value={time}
                        onChange={e => setTime(e.target.value)}
                    />
                    <button type="submit">
                        Buscar
                    </button>
                </form>
            </PageHeader>

            <main>
                {
                    teachers.map((teacher: Teacher) => (
                        <TeacherItem key={teacher.id} teacher={teacher}/>
                    ))
                }
            </main>
        </div>
    )
}

export default TeacherList;