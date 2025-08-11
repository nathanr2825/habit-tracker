import { Hono } from 'hono'

const app = new Hono()

const habits: { name: string, done : boolean }[] = []

// Show homepage
app.get('/', (c) => {
    const habitList = habits.map(habit =>
        `<li>${habit.name} - ${habit.done ? '✅ Done' : '❌ Not yet'} </li>`
    ).join('')
  return c.html(`
    <html>
      <head><title>Habit Tracker</title></head>
      <body>
        <h1>Habit Tracker</h1>
        <ul>
          ${habitList}
        </ul>
        <form method="POST" action="/add">
          <input name="habit" placeholder="New habit" />
          <button type="submit">Add Habit</button>
        </form>
      </body>
    </html>
  `)
})

app.post('/add', async (c) => {
    const body = await c.req.parseBody()
    const habitName = body.habit?.toString().trim()
    if (habitName) {
        habits.push({ name: habitName, done: false })
    }
    return c.redirect('/')
    })

export default app
