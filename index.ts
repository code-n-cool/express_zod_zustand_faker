// index.ts
import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { z } from 'zod';
import { generateUsers, userStore, User } from './mockData';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

userStore.setState({ users: generateUsers(50) });

const QuerySchema = z.object({
    q: z.string().optional(),
    page: z.coerce.number().int().min(1).optional().default(1),
    limit: z.coerce.number().int().min(1).optional().default(10),
});

const ParamsSchema = z.object({
    id: z.coerce.number().int(),
});

const LogSchema = z.object({
    message: z.string().min(1),
    timestamp: z.string().optional(),
});

app.get('/api/users', (req: Request, res: Response) => {
    const result = QuerySchema.safeParse(req.query);

    if (!result.success) {
        return res.status(400).json({ error: result.error.flatten() });
    }

    const { q = '', page, limit } = result.data;
    const allUsers = userStore.getState().users;

    const filtered = allUsers.filter((user) =>
        [user.name, user.email, user.bio].some((field) =>
            field.toLowerCase().includes(q.toLowerCase())
        )
    );

    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);

    res.json({ users: paginated, total: filtered.length });
});

app.get('/api/users/:id', (req: Request, res: Response) => {
    const result = ParamsSchema.safeParse(req.params);

    if (!result.success) {
        return res.status(400).json({ error: result.error.flatten() });
    }

    const user = userStore.getState().users.find((u: User) => u.id === result.data.id);

    if (!user) {
        return res.status(404).send('User not found');
    }

    res.json(user);
});

app.post('/api/logs', (req: Request, res: Response) => {
    const result = LogSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({ error: result.error.flatten() });
    }

    console.log('Logged interaction:', result.data);
    res.status(200).send('Logged');
});

app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
});
