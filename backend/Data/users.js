import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'admin user',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'john',
        email: 'john@example.com',
        password: bcrypt.hashSync('123456', 10),
       
    },
    {
        name: 'tom user',
        email: 'tom@example.com',
        password: bcrypt.hashSync('123456', 10),
    }
]

export default users