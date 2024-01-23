import express    from 'express';
import dotenv     from 'dotenv';
import cors       from 'cors';
import morgan     from 'morgan';
import colors 	  from 'colors';
import connectDB  from './config/db.js';
import auth       from './routes/auth.js';
import user       from './routes/user.js';
import admin      from './routes/admin.js';
import category   from './routes/category.js';
import product    from './routes/product.js';

colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});

dotenv.config({ path: "./.env" });

connectDB();

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/auth', auth);
app.use('/api/v1/user', user);
app.use('/api/v1/admin', admin);
app.use('/api/v1/category', category);
app.use('/api/v1/product', product);

app.get('/', (req, res) => {
	res.send("<h1>Hello, World!</h1>");
})

const port = process.env.PORT || 1026;

app.listen(port,  () => {
	console.log(`Server is Listening on Port ${port}`.bgBlue.black);
});
