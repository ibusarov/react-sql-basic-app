import express, { json } from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app = express()

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'test_99',
  database: 'test',
})

app.use(express.json())
app.use(cors())

//if there is authentication issue use:
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Svetlio_99';
//FLUSH PRIVILEGES;

app.get('/', (req, res) => {
  res.json('Hello from the backend...')
})

app.get('/books/:id', (req, res) => {
    const bookId = req.params.id
    const q = 'SELECT * FROM books where id=?'

  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err)
    return res.json(data)
  })
})

app.get('/books', (req, res) => {
  const q = 'SELECT * FROM books'
  db.query(q, (err, data) => {
    if (err) return res.json(err)
    return res.json(data)
  })
})



app.post('/books', (req, res) => {
  const q = 'INSERT INTO BOOKS (`title`,`price`, `desc`, `cover`) VALUES(?)'
  const values = [req.body.title, req.body.price, req.body.desc, req.body.cover]
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err)
    return res.json('Book has been created successfuly')
  })
})

app.delete('/books/:id', (req, res) => {
  const bookId = req.params.id
  const q = 'DELETE from books where id = ?'
  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err)
    return res.json('Book has been deleted succefully.')
  })
})

app.put('/books/:id', (req, res) => {
  const bookId = req.params.id
  const q = 'UPDATE books SET `title` = ?, `price`  = ?, `desc` = ?, `cover` = ? where id = ?'
  const values = [req.body.title, req.body.price, req.body.desc, req.body.cover]
  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.json(err)
    return res.json('Book has been updated succefully.')
  })
})

app.listen(8080, () => {
  console.log('Server is running on port 8080...')
})
