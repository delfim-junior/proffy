import React from 'react'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css'
import api from '../../services/api'

export interface Teacher {
    id: number,
    name: string,
    avatar: string,
    bio: string,
    whatsapp: string,
    subject: string,
    cost: number,
}

interface TeacherProps {
    teacher: Teacher;
}

const TeacherItem: React.FC<TeacherProps> = ({ teacher }) => {

    function handleCreateNewConnection() {
        api.post('create_connections', {
            user_id: teacher.id
        })
    }
    return (
        <article className="teacher-item">
            <header>
                <img src={teacher.avatar} />
                <div>
                    <strong>{teacher.name}</strong>
                    <span>{teacher.subject}</span>
                </div>
            </header>
            <p>
                {teacher.bio}
            </p>

            <footer>
                <p>
                    Preco/hora
                            <strong>{teacher.cost}</strong>
                </p>
                <a
                    onClick={handleCreateNewConnection}
                    href={`http://wa.me/${teacher.whatsapp}`}
                    target="blank"
                >
                    <img src={whatsappIcon} alt="whatsApp" />
                        Entrar em contacto
                </a>
            </footer>
        </article>
    )
}

export default TeacherItem