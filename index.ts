import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { generateUsers, userStore, User } from './mockData';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

userStore.setState({ users: generateUsers(50) });

// GET /api/users?q=search&page=1&limit=10
app.get('/api/users', (req: Request, res: Response) => {
    const q = (req.query.q as string)?.toLowerCase() || '';
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const allUsers = userStore.getState().users;

    const filtered = allUsers.filter(user =>
        [user.name, user.email, user.bio].some(field =>
            field.toLowerCase().includes(q)
        )
    );

    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);

    res.json({ users: paginated, total: filtered.length });
});

app.get('/api/users/:id', (req: Request<{ id: number }>, res: Response) => {
    const { id } = req.params;
    const user = userStore.getState().users.find((user: User) => user.id === Number(id));

    if (!user) {
        res.status(404).send('User not found');
        return;
    }

    res.json(user);
});

app.post('/api/logs', (req: Request, res: Response) => {
    console.log('Logged interaction:', req.body);
    res.status(200).send('Logged');
});

app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
});
