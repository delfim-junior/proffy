import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'
import PageHeader from '../../components/pageHeader';

import './styles.css'
import Input from '../../components/Input';

import warningIcon from '../../assets/images/icons/warning.svg'
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';
import api from '../../services/api';


const TeacherForm: React.FC = () => {
    
    const history = useHistory()

    const [scheduleItems, setScheduleItems] = useState([
        { week_day: 0, from: '', to: '' },
    ])
    const [inputData, setInputData] = useState({
        name: '',
        avatar: '',
        whatsapp: '',
        cost: ''

    })
    const [bio, setBio] = useState('')
    const [subject, setSubject] = useState('')

    function handleInputData(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target
        setInputData({ ...inputData, [name]: value })
    }

    function handleNewSchedule() {
        setScheduleItems([
            ...scheduleItems,
            {
                week_day: 0,
                from: '',
                to: ''
            }
        ])
    }

    function setScheduleItemValue(index: number, field: string, value: string) {
        const updatedScheduleItems = scheduleItems.map((scheduleItem, i) => {
            if (i === index) {
                return { ...scheduleItem, [field]: value }
            }
            return scheduleItem
        })

        setScheduleItems(updatedScheduleItems)
    }

    function handleCreateClass(event: FormEvent) {
        event.preventDefault()
        const { name, avatar, whatsapp, cost } = inputData
        
        api.post('create_classes',{
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(() => {
            alert('registration done!!!') 
            history.push('/')
        })
        .catch(() => alert("oh oh"))
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Que Incrível que você quer dar aulas"
                description="O primeiro passo é preencher este formulário de inscrição"
            />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <Input
                            name="name"
                            label="Nome completo"
                            onChange={handleInputData}
                        />
                        <Input
                            name="avatar"
                            label="Avatar"
                            onChange={handleInputData}
                        />
                        <Input
                            name="whatsapp"
                            label="WhatsApp"
                            onChange={handleInputData}
                        />
                        <TextArea
                            name="bio"
                            label="Biografia"
                            onChange={(e) => setBio(e.target.value)}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>
                        <Select
                            name="subject"
                            label="Matéria"
                            value={subject}
                            options={[
                                { value: 'Artes', label: 'Artes' },
                                { value: 'Desenho', label: 'DGD' },
                                { value: 'Quimica', label: 'Quimica' },
                            ]}
                            onChange={(e) => setSubject(e.target.value)}
                        />
                        <Input
                            name="cost"
                            label="Custo da sua hora por aula"
                            onChange={handleInputData}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponiveis
                        <button type="button" onClick={handleNewSchedule}>
                                + Novo horário
                        </button>
                        </legend>

                        {
                            scheduleItems.map((scheduleItem, index) => (
                                <div key={scheduleItem.week_day} className="schedule-item">
                                    <Select
                                        name="week_day"
                                        label="Dia da semana"
                                        value={scheduleItem.week_day}
                                        options={[
                                            { value: '0', label: 'Domingo' },
                                            { value: '1', label: 'Segunda-feira' },
                                            { value: '2', label: 'Terca-feira' },
                                            { value: '3', label: 'Quarta-feira' },
                                            { value: '4', label: 'Quinta-feira' },
                                            { value: '5', label: 'Sexta-feira' },
                                            { value: '6', label: 'Sabado' },
                                        ]}
                                        onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                                    />
                                    <Input
                                        type="time"
                                        name="from"
                                        label="Das"
                                        value={scheduleItem.from}
                                        onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                                    />
                                    <Input
                                        type="time"
                                        name="to"
                                        label="Ate"
                                        value={scheduleItem.to}
                                        onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                                    />
                                </div>
                            ))
                        }



                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="aviso importante" />
                        Importante! <br />
                        Preencha todos os dados
                    </p>
                        <button type="submit">
                            Guardar registo
                        </button>

                    </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm;